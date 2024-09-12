import { useState } from "react";
import useImages from "../../Hooks/useImages";
import PublicAxios from "../../Hooks/localAxios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [isImages, refetch] = useImages();
  const [selectedImages, setSelectedImages] = useState([]);

  // handle featured image
  const handleFImage = isImages?.data?.filter(
    (image) => image?.isFeatured == true
  );

  const lastFeaturedImage = handleFImage?.[handleFImage.length - 1];

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

  console.log("selectedImages", selectedImages);

  return (
    <>
      <section className=" mt-[77px]">
        {/* Display the last featured image */}
        {lastFeaturedImage && (
          <div className="w-full h-[80vh] relative">
            <img
              src={lastFeaturedImage.url}
              alt={lastFeaturedImage.description}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 py-6 max-w-7xl mx-auto">
          {isImages?.data?.map((img) => (
            <div
              key={img._id}
              className={`relative cursor-pointer overflow-hidden ${
                selectedImages.includes(img._id)
                  ? "border-4 border-blue-500"
                  : ""
              }`}
              onClick={() => handleSelectImage(img._id)}
            >
              <img
                src={img.url}
                alt={img.description}
                className="w-full h-full object-cover"
              />
              {selectedImages.includes(img._id) && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                  ✔
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
