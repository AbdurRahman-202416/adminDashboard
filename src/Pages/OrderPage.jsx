import React, { useState } from "react";

const OrderPage = () => {
    const [activeTab, setActiveTab] = useState("all"); // Tracks the active tab

    const allOrders = [
        { id: 1, product: "Product 1", status: "completed" },
        { id: 2, product: "Product 2", status: "pending" },
        { id: 3, product: "Product 3", status: "completed" },
        { id: 4, product: "Product 4", status: "pending" },
    ];

    const renderOrders = () => {
        let filteredOrders;

        if (activeTab === "all") {
            filteredOrders = allOrders;
        } else if (activeTab === "pending") {
            filteredOrders = allOrders.filter((order) => order.status === "pending");
        } else if (activeTab === "completed") {
            filteredOrders = allOrders.filter(
                (order) => order.status === "completed"
            );
        }

        return filteredOrders.map((order) => (
            <div
                key={order.id}
                className="p-4 border-b border-gray-300 rounded-md bg-white shadow-sm my-2"
            >
                <h5 className="text-lg font-bold">{order.product}</h5>
                <p>Status: <span className="capitalize">{order.status}</span></p>
            </div>
        ));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Mini Navbar */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`px-6 py-2 font-bold rounded-t-md ${activeTab === "all"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                >
                    All Orders
                </button>
                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-6 py-2 font-bold rounded-t-md ${activeTab === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                >
                    Pending Orders
                </button>
                <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-6 py-2 font-bold rounded-t-md ${activeTab === "completed"
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
        </div>
    );
};

export default OrderPage;
