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
    <nav className="bg-green-700 text-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">
          Room Rental
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-300 animate-bounce">
            Home
          </Link>

          <Link to="/rooms" className="hover:text-yellow-300 animate-bounce">
            Rooms
          </Link>

          {user ? (
            <>
              {user.role === "owner" && (
                <Link to="/my-rooms" className="hover:text-yellow-300 animate-bounce">
                  My Rooms
                </Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-yellow-300 animate-bounce">
                  Admin
                </Link>
              )}
              {user.role === "tenant" && (
                <Link to="/my-bookings" className="hover:text-yellow-300 animate-bounce">
                  My Bookings
                </Link>
              )}
              {user.role === "owner" && (
                <Link to="/owner-bookings" className="hover:text-yellow-300 animate-bounce">
                  Bookings
                </Link>
              )}
              {user.role === "owner" && (
                <Link to="/inquiries" className="hover:text-yellow-300 animate-bounce">
                  Inquiries
                </Link>
              )}

              <span className="text-sm animate-bounce">Hi, {user.name}</span>

              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded-md hover:bg-yellow-300 animate-bounce"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 animate-bounce">
                Login
              </Link>

              <Link to="/register" className="hover:text-yellow-300 animate-bounce">
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