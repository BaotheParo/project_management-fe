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

            // console.log("Login API response:", data);

            if (!data || !data.token) throw new Error("Invalid login response");

            // Save token for future requests
            localStorage.setItem("token", data.token);
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            // Store user with role - handle both formats
            const userData = data.user 
                ? { 
                    ...data.user, role: data.user.role || data.role,
                }  // If user object exists
                : { 
                    role: data.role, 
                    userName: data.userName, 
                    userId: data.userId,
                    coverImage: data.coverImage
                };  // If only role exists at top level

            // console.log("Storing user data:", userData);
            setUser(userData);
            setIsInitialized(true);
            return data;
        } catch (err) {
            // console.error("Login failed: ", err);
            setError(err.response?.data?.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout
    const logout = useCallback(() => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axiosClient.defaults.headers.common["Authorization"];
        setUser(null);
        setIsInitialized(false);
    }, []);

    // Check Auth on load
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        
        if (!token) {
            // console.log("No token found, skipping auth check");
            setLoading(false);
            setIsInitialized(true);
            return;
        }

        // Restore from localStorage first
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                // console.log("Restored user from localStorage:", userData);
            } catch (err) {
                console.error("Failed to parse stored user:", err);
            }
        }

        // Skip auth check if already initialized (just logged in)
        if (isInitialized) {
            // console.log("Already initialized, skipping auth check");
            setLoading(false);
            return;
        }

        try {
            // console.log("Checking auth with token...");
            setLoading(true);
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axiosClient.get("/auth/me");
            const data = response.data?.data || response.data;

            // console.log("Auth check response:", data);

            // Store complete user data with role
            const userData = data.user 
                ? { ...data.user, role: data.user.role || data.role }
                : { 
                    role: data.role,
                    ...(data.userName && { username: data.userName }),
                    ...(data.userId && { userId: data.userId }),
                    ...(data.name && { name: data.name }),
                    ...(data.email && { email: data.email }),
                    ...(data.fullName && { fullName: data.fullName }),
                    ...(data.coverImage && { coverImage: data.coverImage }),
                };

            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setIsInitialized(true);
        } catch (err) {
            console.error("Auth check failed:", err.response?.status, err.response?.data);
            // Only logout if it's actually an auth error (401/403)
            if (err.response?.status === 401 || err.response?.status === 403) {
                // console.log("Invalid token, logging out");
                logout();
            } else {
                // If it's a network error or server error, keep the stored user
                // console.log("Auth check failed but keeping stored user");
                setIsInitialized(true);
            }
        } finally {
            setLoading(false);
        }
    }, [logout, isInitialized]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return { user, loading, error, login, logout, checkAuth };
};