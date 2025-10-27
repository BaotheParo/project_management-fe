import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Access Denied
                </h2>
                <p className="text-gray-500 mb-8">
                    You don't have permission to access this page.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold transition-colors hover:bg-gray-50 cursor-pointer"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold transition-colors hover:bg-indigo-700 cursor-pointer"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}