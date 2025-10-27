import { useState, useCallback, useEffect } from "react";
import axiosClient from "./axiousInstance";

export const useAuthApi = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start with true for initial auth check
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Login
    const login = useCallback(async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosClient.post("/auth/login", credentials);
            const data = response.data?.data || response.data;

            console.log("Login API response:", data);

            if (!data || !data.token) throw new Error("Invalid login response");

            // Save token for future requests
            localStorage.setItem("token", data.token);
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            // Store user with role - handle both formats
            const userData = data.user 
                ? { ...data.user, role: data.user.role || data.role }  // If user object exists
                : { role: data.role, username: data.username };  // If only role exists at top level

            console.log("Storing user data:", userData);
            setUser(userData);
            setIsInitialized(true);
            return data;
        } catch (err) {
            console.error("Login failed: ", err);
            setError(err.response?.data?.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        delete axiosClient.defaults.headers.common["Authorization"];
        setUser(null);
    }, []);

    // Check Auth on load
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axiosClient.get("/auth/me");
            const data = response.data?.data || response.data;

            console.log("Auth check response:", data);

            // Store user with role - handle both formats
            const userData = data.user 
                ? { ...data.user, role: data.user.role || data.role }
                : { role: data.role };

            setUser(userData);
        } catch (err) {
            console.warn("Auth check failed: ", err);
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return { user, loading, error, login, logout, checkAuth };
};