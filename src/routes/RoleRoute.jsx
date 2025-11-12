import { Navigate } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";

const RoleRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth();
    
    console.log("🔒 RoleRoute - user:", user);
    console.log("🔒 RoleRoute - user.roles:", user?.roles);
    console.log("🔒 RoleRoute - allowedRoles:", allowedRoles);

    if (!user) {
        console.log("❌ No user - redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    // Normalize user roles to array
    let userRoles = [];
    if (typeof user.roles === 'string') {
        userRoles = [user.roles];
    } else if (Array.isArray(user.roles)) {
        userRoles = user.roles.map(r => {
            if (typeof r === 'string') return r;
            if (r.name) return r.name;
            if (r.authority) return r.authority;
            return null;
        }).filter(Boolean);
    }

    console.log("🔒 RoleRoute - normalized userRoles:", userRoles);

    // Check if user has any of the allowed roles
    const hasAccess = userRoles.some(userRole => 
        allowedRoles.some(allowedRole => String(allowedRole) === String(userRole))
    );

    console.log("🔒 RoleRoute - hasAccess:", hasAccess);

    if (!hasAccess) {
        console.log("❌ Access denied - redirecting to /unauthorized");
        return <Navigate to="/unauthorized" replace />;
    }

    console.log("✅ Access granted");
    return children;
};

export default RoleRoute;
