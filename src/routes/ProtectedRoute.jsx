import { useAuth } from "../app/AuthProvider";
import Loader from "../components/Loader";
import Unauthorized from "../components/Unauthorized";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />; // Show loading spinner briefly
    }

    if (!user) {
        // Redirect unauthenticated users to login, keep their previous location
        return <Unauthorized />
    }

    return children;
}