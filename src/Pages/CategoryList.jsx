import React, { useState, useEffect } from "react";
import apiRequest from "../Axios"; // Your Axios instance

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await apiRequest.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open edit modal
  const openEditModal = (category) => {
    setEditingCategory({ ...category });
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingCategory(null);
    setIsEditModalOpen(false);
  };

  // Save updated category
  const saveCategory = async () => {
    if (!editingCategory.name.trim()) {
      return alert("Category name is required!");
    }
    try {
      setIsLoading(true);

      // Image upload logic
      const formData = new FormData();
      formData.append("name", editingCategory.name);
      formData.append("description", editingCategory.description);
      if (editingCategory.imageFile) {
        formData.append("image", editingCategory.imageFile);
      }

      const response = await apiRequest.put(`/categories/${editingCategory.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...response.data } : cat
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeletingCategory(null);
    setIsDeleteModalOpen(false);
  };

  // Delete category
  const deleteCategory = async () => {
    if (!deletingCategory) return;
    try {
      setIsLoading(true);
      await apiRequest.delete(`/categories/${deletingCategory.id}`);
      setCategories(categories.filter((cat) => cat.id !== deletingCategory.id));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Manage Categories</h1>

      {/* Categories List */}
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto border-r-2 border-gray-800 items-center justify-center w-full text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="border-t-2 items-center justify-end">
                    <td className="px-4 py-2">{category.id}</td>
                    <td className="px-4 py-2">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 text-wrap py-2">{category.name}</td>
                    <td className="py-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        onClick={() => openEditModal(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-500"
                        onClick={() => openDeleteModal(category)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Edit Modal */}
      {isEditModalOpen && editingCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[90%] sm:w-[50%] p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Category</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-md"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                className="w-full border border-gray-400 p-2 rounded-md"
                value={editingCategory.description}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, description: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-400 p-2 rounded-md"
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, imageFile: e.target.files[0] })
                }
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={closeEditModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={saveCategory}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deletingCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[90%] sm:w-[40%] p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the category "{deletingCategory.name}"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={closeDeleteModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={deleteCategory}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
