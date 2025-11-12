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

            // Step 1: Login to get tokens
            const response = await axiosClient.post("/auth/signin", credentials);
            
            console.log("🔍 Raw login response:", response);
            console.log("🔍 Response type:", typeof response);
            console.log("🔍 Response keys:", Object.keys(response));

            const { accessToken, refreshToken } = response;

            console.log("🔑 Access Token:", accessToken ? "✅ Present" : "❌ Missing");
            console.log("🔑 Refresh Token:", refreshToken ? "✅ Present" : "❌ Missing");

            if (!accessToken || !refreshToken) {
                throw new Error("Invalid response: missing tokens");
            }

            // Save tokens
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            
            // Set auth header for next requests
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            // Step 2: Get user info
            console.log("📞 Fetching user info from /auth/me...");
            const userInfo = await axiosClient.get("/auth/me");
            
            console.log("✅ Login successful - User info:", userInfo);
            console.log("👤 User roles:", userInfo?.roles);
            console.log("👤 User keys:", Object.keys(userInfo));

            // Store user info
            setUser(userInfo);
            localStorage.setItem("user", JSON.stringify(userInfo));
            setIsInitialized(true);

            return userInfo;
        } catch (err) {
            console.error("❌ Login failed:", err);
            setError(err.response?.data?.error || err.message || "Login failed");
            
            // Clear any stored data on error
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            delete axiosClient.defaults.headers.common["Authorization"];
            
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout
    const logout = useCallback(() => {
        console.log("🚪 Logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        delete axiosClient.defaults.headers.common["Authorization"];
        setUser(null);
        setIsInitialized(false);
        setLoading(false);
        setError(null);
    }, []);

    // Check Auth on load
    const checkAuth = useCallback(async () => {
        const accessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (!accessToken) {
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
                console.log("Restored user from localStorage:", userData);
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
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            
            // Try to get user info from /auth/me endpoint
            const userInfo = await axiosClient.get("/auth/me");

            console.log("✅ Auth check successful - User info:", userInfo);

            setUser(userInfo);
            localStorage.setItem("user", JSON.stringify(userInfo));
            setIsInitialized(true);
        } catch (err) {
            console.error("Auth check failed:", err.response?.status, err.response?.data);
            
            // If token invalid, logout
            if (err.response?.status === 401 || err.response?.status === 403) {
                console.log("Invalid token, logging out");
                logout();
            } else if (storedUser) {
                // If it's a network error or server error, keep the stored user
                console.log("⚠️ Auth check failed but keeping stored user");
                setIsInitialized(true);
            } else {
                logout();
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