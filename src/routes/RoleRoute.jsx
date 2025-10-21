import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const RoleRoute = ({ allowedRoles, children }) => {
    const role = getUserRole();
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
};

export default RoleRoute;
