import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setUserMessage(res.data.message))
      .catch(() => navigate("/"));
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      Swal.fire({
        icon: "success",
        title: "Logout berhasil",
        timer: 50,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/"), 50);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal logout",
        text: err.response?.data?.message || err.message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 hidden sm:block">
            Welcome, <span className="font-semibold">User</span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition active:scale-95"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-gray-500 mt-1">{userMessage}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">1</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border">
            <h3 className="text-sm text-gray-500">Login Attempts</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border">
            <h3 className="text-sm text-gray-500">Status</h3>
            <p className="text-2xl font-bold text-green-500 mt-2">Active</p>
          </div>

        </div>
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Activity</h3>
          <p className="text-gray-500 text-sm">
            Tidak ada aktivitas terbaru.
          </p>
        </div>

      </main>
    </div>
  );
}
