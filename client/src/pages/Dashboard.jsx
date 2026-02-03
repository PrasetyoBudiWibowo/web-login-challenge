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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </nav>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
        <p className="mb-6 text-gray-700">{userMessage}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">Users</h3>
            <p className="text-gray-500">Jumlah user: 1</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">Login Attempts</h3>
            <p className="text-gray-500">Percobaan login terakhir: 5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
