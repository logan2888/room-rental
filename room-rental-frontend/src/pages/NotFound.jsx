import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <p className="text-8xl font-bold text-teal-800">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">Page Not Found</h1>
      <p className="text-gray-500 mt-2 text-center max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-8 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;