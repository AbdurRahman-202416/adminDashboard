import React, { useState } from "react";
import apiRequest from "../Axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    sizes: [],
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]); // To store image previews
  const [isLoading, setIsLoading] = useState(false);

  const availableSizes = ["S", "M", "L", "XL","XXL"];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: files });

    // Generate image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    // Remove the selected image from both the `images` and `imagePreviews` state
    const updatedImages = product.images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setProduct({ ...product, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  // Handle size selection
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    const updatedSizes = checked
      ? [...product.sizes, value]
      : product.sizes.filter((size) => size !== value);
    setProduct({ ...product, sizes: updatedSizes });
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.title || !product.price || product.sizes.length === 0) {
      return alert("Please fill out all required fields.");
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("sizes", JSON.stringify(product.sizes));

    product.images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      setIsLoading(true);
      await apiRequest.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-6 p-4">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            className="w-full border border-gray-400 p-2 rounded-md"
            placeholder="Enter product title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full border border-gray-400 p-2 rounded-md"
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Sizes</label>
          <div className="grid grid-cols-2 gap-4">
            {availableSizes.map((size) => (
              <label key={size} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={size}
                  onChange={handleSizeChange}
                  className="mr-2"
                  checked={product.sizes.includes(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          {/* Display image previews */}
          {imagePreviews.length > 0 && (
            <div className="flex gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-indigo-800 text-white text-xs rounded-full px-2 py-1"
                  >
                    X
                  </button>
                </div>
              ))}
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
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
