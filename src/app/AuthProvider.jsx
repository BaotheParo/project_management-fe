import { createContext, useContext } from "react";
import { useAuthApi } from "../api/useAuthApi";

// Create context
const AuthContext = createContext(null);

// Provider
export function AuthProvider({ children }) {
    const auth = useAuthApi();

    return (
        <AuthContext.Provider value={ auth }>
            {children}
        </AuthContext.Provider>
    );
}

// Hook
export function useAuth() {
    return useContext(AuthContext);
}
