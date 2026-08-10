import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="bg-blue-700 text-white shadow">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    Room Rental
                </Link>

                <div className="flex gap-6">

                    <Link
                        to="/"
                        className="hover:text-yellow-300"
                    >
                        Home
                    </Link>

                    <Link
                        to="/login"
                        className="hover:text-yellow-300"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="hover:text-yellow-300"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;