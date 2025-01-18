import { Routes, Route } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import Analytics from "./Analytics";
import OrderPage from "./OrderPage";

const Dashboard = () => (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
            <Navbar />
            <div className="p-4 py-20">
                <Routes>
                    <Route path="/dashboard/*" element={<Analytics/>} />
                    <Route path="/analytics" element={<Analytics/>} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/category-list" element={<CategoryList />} />
                    <Route path="/order" element={<OrderPage />} />
                </Routes>
            </div>
        </div>
    </div>
);

export default Dashboard;
