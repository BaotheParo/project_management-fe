import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">
            Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
            to="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
            Go Home
        </Link>
        </div>
    );
}
