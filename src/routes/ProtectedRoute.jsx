import { Navigate } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";
import Loader from "../components/Loader";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />; // Show loading spinner briefly
    }

    if (!user) {
        // Redirect unauthenticated users to login
        return <Navigate to="/login" replace />;
    }

    return children;
}