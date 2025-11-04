import { useState, useEffect } from "react";
import axiosInstance from "./axiousInstance";

export const useAdminApi = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        totalServiceCenters: 0,
        totalPolicies: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all users - using /api/users endpoint
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get("/users");
            
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || response.data?.items || [];

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure:", response.data);
                setUsers([]);
                return;
            }

            setUsers(data);
            
            // Calculate stats from users data
            const activeCount = data.filter(u => u.status === "Active" || u.isActive).length;
            const inactiveCount = data.filter(u => u.status === "Inactive" || !u.isActive).length;
            
            setStats(prev => ({
                ...prev,
                totalUsers: data.length,
                activeUsers: activeCount,
                inactiveUsers: inactiveCount
            }));
        } catch (err) {
            console.error("Fetch users failed:", err);
            setError(err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch active users - using /api/users/active endpoint
    const fetchActiveUsers = async () => {
        try {
            const response = await axiosInstance.get("/users/active");
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];
            
            setStats(prev => ({
                ...prev,
                activeUsers: data.length
            }));
        } catch (err) {
            console.error("Fetch active users failed:", err);
        }
    };

    // Fetch users by role - using /api/users/by-role/{role}
    const fetchUsersByRole = async (role) => {
        try {
            const response = await axiosInstance.get(`/users/by-role/${role}`);
            return Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];
        } catch (err) {
            console.error(`Fetch users by role ${role} failed:`, err);
            return [];
        }
    };

    // Fetch technicians - using /api/users/technicians
    const fetchTechnicians = async () => {
        try {
            const response = await axiosInstance.get("/users/technicians");
            return Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];
        } catch (err) {
            console.error("Fetch technicians failed:", err);
            return [];
        }
    };

    // Fetch users by center - using /api/users/by-center/{centerId}
    const fetchUsersByCenter = async (centerId) => {
        try {
            const response = await axiosInstance.get(`/users/by-center/${centerId}`);
            return Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];
        } catch (err) {
            console.error(`Fetch users by center ${centerId} failed:`, err);
            return [];
        }
    };

    // Toggle user active status - using PUT /api/users/{userId}/active
    const toggleUserActive = async (userId) => {
        try {
            setLoading(true);
            setError(null);
            await axiosInstance.put(`/users/${userId}/active`);
            await fetchUsers();
            return { success: true, message: "User status updated successfully" };
        } catch (err) {
            console.error("Toggle user active failed:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get user by ID
    const getUserById = async (userId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(`/users/${userId}`);
            return response.data?.data || response.data;
        } catch (err) {
            console.error("Get user failed:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchActiveUsers();
    }, []);

    return {
        users,
        stats,
        loading,
        error,
        fetchUsers,
        fetchActiveUsers,
        fetchUsersByRole,
        fetchTechnicians,
        fetchUsersByCenter,
        toggleUserActive,
        getUserById
    };
};
