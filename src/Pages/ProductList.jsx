import React, { useEffect, useState } from "react";
import apiRequest from "../Axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Fetch Products
  const getProducts = async () => {
    try {
      const response = await apiRequest.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Open Edit Modal
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  // Open Delete Modal
  const handleDelete = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    try {
      await apiRequest.delete(`/products/${deleteProductId}`);
      setProducts(products.filter((product) => product.id !== deleteProductId));
      setShowDeleteModal(false);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Save Changes (Edit)
  const saveChanges = async () => {
    try {
      await apiRequest.put(`/products/${selectedProduct.id}`, selectedProduct);
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProducts(updatedProducts);
      setShowEditModal(false);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl text-center font-bold text-blue-600 mb-6">
        Products
      </h2>

      <div className="">
      <table className="min-w-full table-auto">
  <thead>
    <tr className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
      <th className="py-2 px-2 sm:px-6 text-left">Product Image</th>
      <th className="py-2 px-2 sm:px-6 text-left">Title</th>
      <th className="py-2 px-2 sm:px-6 text-left">Price</th> {/* New Price Column */}
      <th className="py-2 px-2 sm:px-6 text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="text-gray-600">
    {products.map((product) => (
      <tr
        key={product.id}
        className="border-b border-gray-400 hover:bg-gray-100"
      >
        <td className="py-2 px-2 sm:px-6 text-center">
          <img
            src={product.images[0]}
            alt="Product"
            className="h-10 w-10 object-cover rounded-md"
          />
        </td>
        <td className="py-2 px-2 sm:px-6 text-left">{product.title}</td>
        <td className="py-2 px-2 sm:px-6 text-left">${product.price}</td> {/* Show Price */}
        <td className="py-2 px-2 sm:px-6 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
            <button
              onClick={() => handleEdit(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs sm:text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 text-white px-2 py-2 rounded-md text-xs sm:text-sm"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-md w-[90%] sm:w-[50%]">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={selectedProduct.title}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, title: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-4"
            />
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, price: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-md w-[90%] sm:w-[40%]">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex  justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
