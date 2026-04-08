import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const dataField = {
  email: "",
  password: ""
}

export default function Login() {
  const [form, setForm] = useState(dataField);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    api.get("/auth/me")
      .then(() => navigate("/dashboard"))
      .catch(() => { });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const validate = () => {
    const err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) err.email = "Email wajib diisi";
    else if (!emailRegex.test(form.email)) err.email = "Format email tidak valid";

    if (!form.password) err.password = "Password wajib diisi";

    return err;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/login", form);

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Login gagal",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/30">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Selamat Datang 👋</h2>
          <p className="text-gray-500 text-sm mt-1">
            Silakan login untuk melanjutkan
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="contoh@mail.com"
              autoComplete="off"
              value={form.email}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition ${errors.email ? "border-red-400" : "border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition ${errors.password ? "border-red-400" : "border-gray-300"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-sm text-indigo-500 hover:text-indigo-700"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition flex justify-center items-center ${loading
              ? "bg-indigo-300"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}