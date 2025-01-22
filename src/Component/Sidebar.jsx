import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX !== null && touchEndX - touchStartX > 50) {
            setIsOpen(true); // Swipe right opens sidebar
        }
        setTouchStartX(null);
    };

    const closeSidebarOnMobile = () => {
        setIsOpen(false); // Close sidebar on navigation
    };

    return (
        <div
            className={`h-full flex ${
                isOpen ? "w-[100vw]" : "sm:w-64"
            } transition-all duration-300`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Sidebar Toggle Button */}
            <button
                onClick={toggleSidebar}
                className={`sm:hidden fixed ${
                    isOpen ? "left-[38%] top-1 bg-gray-800" : "left-1 top-3"
                } z-50 bg-gray-800 text-white p-2 rounded-md focus:outline-none`}
            >
                {isOpen ? (
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}
            </button>

            {/* Sidebar */}
            <div
                className={`${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0 fixed  top-0 left-0 sm:sticky h-full sm:h-screen border-r-2 border-indigo-700 w-[50%] sm:w-64 bg-gray-800 text-white flex-shrink-0 z-40 transform transition-transform duration-300 ease-in-out`}
            >
                <div className="flex items-center py-2 shadow-lg rounded-lg">
                    <img
                        src="https://www.shutterstock.com/image-photo/young-brazilian-man-isolated-on-260nw-2152183993.jpg"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="text-white">
                        <h3 className="font-bold text-base">Rasel Sharkar</h3>
                        <p className="text-sm text-gray-400">Admin</p>
                    </div>
                </div>

                <ul className="font-bold mx-auto">
                    <li>
                        <NavLink
                            to="/dashboard/analytics"
                            className="block px-4 py-2 hover:bg-gray-700"
                            onClick={closeSidebarOnMobile}
                        >
                            Analytics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/order"
                            className="block px-4 py-2 hover:bg-gray-700"
                            onClick={closeSidebarOnMobile}
                        >
                            All Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/add-product"
                            className="block px-4 py-2 hover:bg-gray-700"
                            onClick={closeSidebarOnMobile}
                        >
                            Add Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/add-category"
                            className="block px-4 py-2 hover:bg-gray-700"
                            onClick={closeSidebarOnMobile}
                        >
                            Add Category
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/product-list"
                            className="block px-4 py-2 hover:bg-gray-700"
                            onClick={closeSidebarOnMobile}
                        >
                            Product List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/category-list"
                            className="block px-4 py-2 hover:bg-gray-700"
                            onClick={closeSidebarOnMobile}
                        >
                            Category List
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    aria-hidden="true"
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
