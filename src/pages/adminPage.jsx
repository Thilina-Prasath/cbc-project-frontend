import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import AdminProductsPage from "./admin/productsPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import AddProductPage from "./admin/addProduct";
import AdminUserPage from "./admin/AdminUserPage";
import AdminReviewPage from "./admin/AdminReviewPage";

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Add this hook to get current location
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.role !== "admin") {
          toast.error("You are not authorized to access this page");
          navigate("/");
        } else {
          setStatus("authenticated");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("You are not authenticated, please login");
        navigate("/login");
      });
  }, [navigate]);

  function getClass(name) {
    // Use location.pathname instead of undefined 'path'
    if (location.pathname.includes(name)) {
      return "bg-accent text-white p-4";
    } else {
      return "text-accent p-4";
    }
  }

  return (
    <div className="w-full h-screen flex bg-accent">
      {status === "loading" || status === "unauthenticated" ? (
        <Loading />
      ) : (
        <>
          <div className="h-full w-[300px] text-accent font-bold text-xl flex flex-col bg-white">
            <Link className={getClass("products")} to="/admin/products">
              Products
            </Link>
            <Link className={getClass("users")} to="/admin/users">
              Users
            </Link>
            <Link className={getClass("orders")} to="/admin/orders">
              Orders
            </Link>
            <Link className={getClass("reviews")} to="/admin/reviews">
              Reviews
            </Link>
          </div>
          <div className="h-full w-[calc(100%-300px)] border-accent border-4 rounded-xl bg-white">
            <Routes>
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/users" element={<AdminUserPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/reviews" element={<AdminReviewPage/>} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/edit-product" element={<EditProductPage />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}