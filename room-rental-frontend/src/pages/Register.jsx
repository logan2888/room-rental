import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "tenant",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Register</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded-xl px-4 py-2.5"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-xl px-4 py-2.5"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border rounded-xl px-4 py-2.5"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2.5"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2.5 bg-white"
        >
          <option value="tenant">I'm looking for a room</option>
          <option value="owner">I want to list rooms</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-800 hover:bg-teal-900 text-white rounded-xl px-4 py-3 font-semibold disabled:opacity-50 transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-teal-800 font-medium underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;