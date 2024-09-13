import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useImages from "../../Hooks/useImages";
import PublicAxios from "../../Hooks/localAxios";
import { Link } from "react-router-dom";
import "./gallery.css";
import toast from "react-hot-toast";

const Gallery = () => {
  const [isImages, refetch] = useImages();
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesOrder, setImagesOrder] = useState(isImages?.data || []);

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    if (selectedImages.length === isImages.data.length) {
      setSelectedImages([]); // Deselect all if already selected
    } else {
      setSelectedImages(isImages.data.map((img) => img._id)); // Select all images
    }
  };

  // Handle individual image selection
  const handleSelectImage = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  // Handle deletion of selected images
  const handleDelete = async () => {
    try {
      const res = await Promise.all(
        selectedImages.map((id) => PublicAxios.delete(`/api/images/${id}`))
      );
      console.log(" results__", res);
      setSelectedImages([]);
      refetch();
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  // Update `imagesOrder` when `isImages` data is available
  useEffect(() => {
    if (isImages?.data) {
      setImagesOrder(isImages.data);
    }
  }, [isImages]);

  // Handle drag end event
  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return; // If dropped outside the list, exit

    const reorderedImages = Array.from(imagesOrder);
    const [removed] = reorderedImages.splice(source.index, 1);
    reorderedImages.splice(destination.index, 0, removed);

    // Add 'order' field to each image based on its index in the reordered array
    const updatedImages = reorderedImages.map((img, index) => ({
      ...img,
      order: index, // Update order based on new index
      isFeatured: index === 0 ? true : false, // Mark first image as featured
    }));

    setImagesOrder(updatedImages);

    try {
      // Send updated order to the server
      const res = await PublicAxios.patch("/api/images/update-order", {
        orderedImages: updatedImages, // Send the updated images with order and isFeatured
      });
      console.log("Image order and featured status updated successfully.", res);
      toast.success("Image order and featured status updated successfully.");
    } catch (error) {
      console.error("Failed to update image order:", error);
      toast.error("Failed to update image order.");
    }
  };

  const featuredImage = imagesOrder?.filter((itm) => itm.isFeatured == true);
  console.log("featuredImage__", featuredImage[0]);

  return (
    <>
      {/* Featured image set */}
      <section className=" mt-[77px]">
        {/* Display the last featured image */}
        <div className="w-full h-[80vh] relative">
          <img
            src={featuredImage[0]?.url}
            alt={featuredImage[0]?.description}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>
      <div className="p-4">
        <div className="md:flex items-center justify-between gap-4 my-6">
          <div className=" flex items-center gap-4">
            <button
              onClick={handleSelectAll}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {selectedImages.length === isImages?.data?.length
                ? "Deselect All"
                : "Select All"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={selectedImages.length === 0}
            >
              Delete Selected
            </button>
          </div>
          <div>
            <Link to="/imageForm">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Add New Image
              </button>
            </Link>
          </div>
        </div>

        <div className="py-6 max-w-7xl mx-auto gallery">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="gallery" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-wrap gap-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {imagesOrder.map((img, index) => (
                    <Draggable
                      key={img._id}
                      draggableId={img._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative pics ${
                            selectedImages.includes(img._id)
                              ? "border-4 border-blue-500"
                              : ""
                          } ${
                            snapshot.isDragging
                              ? "bg-gray-100 shadow-lg"
                              : "bg-white"
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.description}
                            className="w-full h-auto"
                            onClick={() => handleSelectImage(img._id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div>
          {/* {selectedImages.includes(img._id) && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
              ✔
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Gallery;
