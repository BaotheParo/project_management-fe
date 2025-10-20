import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext(null);

// Provider
export function AppProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load user from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null); // No user found after check
        }
    }, []);

    // Simulate login (pretend success)
    const login = async (email, password) => {
        // You can add fake validation here
        if (email === "admin@example.com" && password === "123456") {
            const fakeUser = { email, role: "technician" };
            setUser(fakeUser);
            localStorage.setItem("user", JSON.stringify(fakeUser));
            return { success: true };
        } else {
            return { success: false, message: "Invalid credentials" };
        }
    };

    // Simulate logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook
export function useAuth() {
    return useContext(AuthContext);
}
