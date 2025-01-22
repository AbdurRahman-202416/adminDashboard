import React, { useState } from "react";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("all"); // Tracks the active tab
  const [selectedOrder, setSelectedOrder] = useState(null); // Tracks the selected order
  const [showModal, setShowModal] = useState(false); // Controls the modal visibility

  const allOrders = [
    { id: 1, product: "Product 1", status: "completed" },
    { id: 2, product: "Product 2", status: "pending" },
    { id: 3, product: "Product 3", status: "completed" },
    { id: 4, product: "Product 4", status: "pending" },
  ];

  // Filter and render orders based on active tab
  const renderOrders = () => {
    let filteredOrders;

    if (activeTab === "all") {
      filteredOrders = allOrders;
    } else if (activeTab === "pending") {
      filteredOrders = allOrders.filter((order) => order.status === "pending");
    } else if (activeTab === "completed") {
      filteredOrders = allOrders.filter((order) => order.status === "completed");
    }

    return filteredOrders.map((order) => (
      <div
        key={order.id}
        className="p-4 border-b border-gray-300 rounded-md bg-white shadow-sm my-2 cursor-pointer"
        onClick={() => handleOrderClick(order)}
      >
        <h5 className="text-lg font-bold">{order.product}</h5>
        <p>Status: <span className="capitalize">{order.status}</span></p>
      </div>
    ));
  };

  // Handle order click to show modal
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Handle modal actions
  const handleCompleteOrder = () => {
    alert(`Order for ${selectedOrder.product} marked as completed.`);
    setShowModal(false);
  };

  const handleCancelOrder = () => {
  
    setShowModal(false);
  };

  return (
    <div className="sm:p-6 p-1 bg-gray-100 min-h-screen">
      {/* Mini Navbar */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-6 py-2 font-bold rounded-t-md ${
            activeTab === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-2 font-bold rounded-t-md ${
            activeTab === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Pending Orders
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-6 py-2 font-bold rounded-t-md ${
            activeTab === "completed"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Completed Orders
        </button>
      </div>

      {/* Conditional Rendering */}
      <div>
        {activeTab === "all" && (
          <h3 className="text-xl font-bold mb-4">All Orders</h3>
        )}
        {activeTab === "pending" && (
          <h3 className="text-xl font-bold mb-4">Pending Orders</h3>
        )}
        {activeTab === "completed" && (
          <h3 className="text-xl font-bold mb-4">Completed Orders</h3>
        )}
        {renderOrders()}
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] sm:w-[40%] shadow-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Product:</strong> {selectedOrder.product}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{selectedOrder.status}</span>
            </p>

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={handleCancelOrder}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel 
              </button>
              <button
                onClick={handleCompleteOrder}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
