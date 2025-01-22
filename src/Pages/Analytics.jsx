import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../Axios";
import Footer from "../Component/Footer";

const StoreStatistics = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productResponse = await apiRequest.get("/products");
        const categoryResponse = await apiRequest.get("/categories");

        // Check for null or undefined responses
        const products = productResponse?.data ?? [];
        const categories = categoryResponse?.data ?? [];


        console.log("Products:", products);
        console.log("Categories:", categories);


        setStats({
          productsCount: products?.length ?? 0,
          categoriesCount: categories?.length ?? 0,
          // totalOrders: orders?.length ?? 0,
          // completedOrders: orders?.filter((order) => order.status === "completed")?.length ?? 0,
          // pendingOrders: orders?.filter((order) => order.status === "pending")?.length ?? 0,
        });

      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);



  const cards = [
    {
      title: "Total Products",
      count: stats.productsCount,
      icon: "fa-box",
      bgColor: "from-blue-200 to-blue-100",
      borderColor: "border-blue-600",
      iconBgColor: "bg-blue-600",
      route: "/dashboard/product-list",
    },

    {
      title: "Total Orders",
      count: 0,
      icon: "fa-shopping-cart",
      bgColor: "from-yellow-200 to-yellow-100",
      borderColor: "border-yellow-600",
      iconBgColor: "bg-yellow-600",
      route: "/dashboard/order",
    },
    {
      title: "Pending Orders",
      count: 0,
      icon: "fa-clock",
      bgColor: "from-red-200 to-red-100",
      borderColor: "border-red-600",
      iconBgColor: "bg-red-600",
      route: "/dashboard/order",
    },
    {
      title: "Completed Orders",
      count: 0,
      icon: "fa-check-circle",
      bgColor: "from-teal-200 to-teal-100",
      borderColor: "border-teal-600",
      iconBgColor: "bg-teal-600",
      route: "/dashboard/order",
    },
    {
      title: "Total Categories",
      count: stats.categoriesCount,
      icon: "fa-tags",
      bgColor: "from-green-200 to-green-100",
      borderColor: "border-green-600",
      iconBgColor: "bg-green-600",
      route: "/dashboard/category-list",
    },

  ];

  return (
    <div>
        <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6 bg-gray-100 min-h-screen">
      {cards.map((card, index) => (
        <Link
          to={card.route}
          key={index}
          className={`p-5 border-b-4 ${card.borderColor} rounded-lg shadow-xl bg-gradient-to-b ${card.bgColor} transform hover:scale-105 transition duration-300`}
        >
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div
                className={`p-5 ${card.iconBgColor} rounded-full text-white`}
              >
                <i className={`fa ${card.icon} fa-2x`}></i>
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h5 className="font-bold text-gray-600 uppercase">{card.title}</h5>
              <h3 className="text-3xl font-bold">{card.count}</h3>
            </div>
          </div>
        </Link>
      ))}
      
    </div>
    
    </div>
  
  );
};

export default StoreStatistics;
