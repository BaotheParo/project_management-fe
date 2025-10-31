import { Navigate } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";

const RoleRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth();
    const role = user?.role;

    console.log("RoleRoute - user:", user);
    console.log("RoleRoute - role:", role);
    console.log("RoleRoute - allowedRoles:", allowedRoles);

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default RoleRoute;
