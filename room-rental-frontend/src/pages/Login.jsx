import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Login</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-xl px-4 py-2.5"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded-xl px-4 py-2.5"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-800 hover:bg-teal-900 text-white rounded-xl px-4 py-3 font-semibold disabled:opacity-50 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-teal-800 font-medium underline">
          Register
        </Link>
      </p>

      <p className="mt-2 text-sm">
        <Link to="/forgot-password" className="text-teal-800 underline">
          Forgot password?
        </Link>
      </p>
    </div>
  );
}

export default Login;