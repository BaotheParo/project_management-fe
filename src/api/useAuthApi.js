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

            // Store user with role and serviceCenterId - handle both formats
            const userData = data.user
                ? {
                    ...data.user,
                    role: data.user.role || data.role,
                    serviceCenterId: data.user.serviceCenterId || data.serviceCenterId
                }
                : {
                    role: data.role,
                    username: data.username,
                    userId: data.userId,
                    coverImage: data.coverImage,
                    serviceCenterId: data.serviceCenterId
                };

            console.log("✅ Login successful - Storing user data:", userData);
            console.log("✅ User role:", userData.role);
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
        setLoading(false);
        setError(null);
    }, []);

    // Check Auth on load
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token) {
            console.log("No token found, skipping auth check");
            setUser(null);
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
            console.log("Already initialized, skipping auth check");
            setLoading(false);
            return;
        }

        try {
            console.log("Checking auth with token...");
            setLoading(true);
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            
            // Try to get user info from /auth/me endpoint
            const response = await axiosClient.get("/auth/me");
            const data = response.data?.data || response.data || response;

            console.log("Auth check response:", data);

            // Store complete user data with role and serviceCenterId
            const userData = {
                role: data.role,
                serviceCenterId: data.serviceCenterId,
                userId: data.userId,
                userName: data.userName || data.username,
                name: data.name || data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                coverImage: data.coverImage,
                serviceCenterName: data.serviceCenterName,
            };

            console.log("Auth me - Storing user data:", userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setIsInitialized(true);
        } catch (err) {
            console.error("Auth check failed:", err.response?.status, err.response?.data);
            
            // If auth/me endpoint doesn't exist or token invalid, just use stored user if available
            if (storedUser && err.response?.status === 404) {
                console.log("⚠️ /auth/me endpoint not found, using stored user data");
                setIsInitialized(true);
            } else if (err.response?.status === 401 || err.response?.status === 403) {
                console.log("Invalid token, logging out");
                logout();
            } else {
                // If it's a network error or server error, keep the stored user
                console.log("Auth check failed but keeping stored user");
                setIsInitialized(true);
            }
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Only run checkAuth once on mount
        if (!isInitialized) {
            checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user, loading, error, login, logout, checkAuth };
};