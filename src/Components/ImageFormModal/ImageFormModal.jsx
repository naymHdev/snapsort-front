import { useState } from "react";
import { useForm } from "react-hook-form";
import PublicAxios from "../../Hooks/localAxios";
import { uploadImage } from "../../api/utils/uploadImage.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useImages from "../../Hooks/useImages.jsx";

const ImageFormModal = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // instant reload posting image
  const [, refetch] = useImages();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Image preview handler
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile);

      const payload = {
        url: imageUrl.data.display_url,
        title: data.title,
        description: data.description,
      };

      // Post data to the database
      const res = await PublicAxios.post("/api/images", payload);
      //   console.log("result__", res);
      if (res.status === 201) {
        toast.success("Image added successfully!");
        refetch();
        navigate("/");
        setImagePreview(null);
      } else toast.error("An error occurred while submitting the form.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-28">
      <h2 className="text-xl font-semibold text-center mb-6">Add New Image</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Upload */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            {...register("url", { required: "Image is required" })}
            onChange={handleImagePreview}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            accept="image/*"
          />
          {errors.url && (
            <span className="text-red-500">{errors.url.message}</span>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 flex justify-center">
            <img src={imagePreview} alt="Preview" className="w-44 h-auto" />
          </div>
        )}

        {/* Title Input */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded p-2 focus:outline-none"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded p-2 focus:outline-none"
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => {
              reset();
              setImagePreview(null); // Clear the preview when reset
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageFormModal;
