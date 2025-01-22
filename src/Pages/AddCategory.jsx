import React, { useState } from "react";
import apiRequest from "../Axios"; // Your Axios instance
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageFile: null,
    imagePreview: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({
        ...category,
        imageFile: file,
        imagePreview: URL.createObjectURL(file), // Generate a preview URL for the selected image
      });
    }
  };

  // Submit category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.name.trim()) {
      return alert("Category name is required!");
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("description", category.description);
      if (category.imageFile) {
        formData.append("image", category.imageFile);
      }

      await apiRequest.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category added successfully!");
      navigate("/categories"); // Redirect to category list page
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-6 p-4">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Add New Category</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleInputChange}
            className="w-full border border-gray-400 p-2 rounded-md"
            placeholder="Enter category name"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleInputChange}
            className="w-full border border-gray-400 p-2 rounded-md"
            placeholder="Enter category description"
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          {category.imagePreview && (
            <div className="mt-4">
              <img
                src={category.imagePreview}
                alt="Selected preview"
                className="w-32 h-32 object-cover rounded-md shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
