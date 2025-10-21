import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    // LocalStorage check may take a moment on initial load
    const isLoading = user === undefined; // undefined means still checking

    if (isLoading) {
        return <Loader />; // Show loading spinner briefly
    }

    if (!user) {
        // Redirect unauthenticated users to login, keep their previous location
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}