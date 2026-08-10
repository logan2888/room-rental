import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-6xl font-bold mb-4">

                404

            </h1>

            <p className="mb-8">

                Page Not Found
            </p>

            <Link
                to="/"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
                Go Home
            </Link>

        </div>

    );

}

export default NotFound;