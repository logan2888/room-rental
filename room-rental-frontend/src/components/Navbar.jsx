import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">
          Room Rental
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link to="/rooms" className="hover:text-yellow-300">
            Rooms
          </Link>

          {user ? (
            <>
              {user.role === "owner" && (
                <Link to="/my-rooms" className="hover:text-yellow-300">
                  My Rooms
                </Link>
              )}

              {user.role === "tenant" && (
                <Link to="/my-bookings" className="hover:text-yellow-300">
                  My Bookings
                </Link>
              )}
              {user.role === "owner" && (
  <Link to="/owner-bookings" className="hover:text-yellow-300">
    Bookings
  </Link>
)}

              <span className="text-sm">Hi, {user.name}</span>

              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-yellow-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>

              <Link to="/register" className="hover:text-yellow-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;