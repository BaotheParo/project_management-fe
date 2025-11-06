import { Navigate } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";

const RoleRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth();
    const role = user?.role;

    console.log("RoleRoute - user:", user);
    console.log("RoleRoute - role:", role);
    console.log("RoleRoute - allowedRoles:", allowedRoles);

    // Convert role to string for comparison
    const roleStr = String(role);
    const hasAccess = allowedRoles.some(allowedRole => String(allowedRole) === roleStr);

    console.log("RoleRoute - hasAccess:", hasAccess);

    if (!hasAccess) {
        console.log("❌ Access denied - redirecting to /unauthorized");
        return <Navigate to="/unauthorized" replace />;
    }

    console.log("✅ Access granted");
    return children;
};

export default RoleRoute;
