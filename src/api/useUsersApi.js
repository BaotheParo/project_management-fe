import { useState } from "react";
import axiosInstance from "./axiousInstance";

export const useUsersApi = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ===================== ADMIN APIs =====================

    /**
     * Get all users (Admin only)
     * GET /api/v1/admin/users?role=PASSENGER&isActive=true&page=0&size=10
     */
    const fetchUsers = async (filters = {}, page = 0, size = 10) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append('page', page);
            params.append('size', size);
            
            if (filters.role) params.append('role', filters.role);
            if (filters.isActive !== undefined && filters.isActive !== '') {
                params.append('isActive', filters.isActive === 'true' || filters.isActive === true);
            }
            if (filters.search) params.append('search', filters.search);

            const response = await axiosInstance.get(`/admin/users?${params.toString()}`);
            console.log("✅ Fetched users:", response);

            if (response.content) {
                setUsers(response.content);
                setPagination({
                    page: response.number || page,
                    size: response.size || size,
                    totalPages: response.totalPages || 0,
                    totalElements: response.totalElements || 0
                });
            } else {
                const data = Array.isArray(response) ? response : [];
                setUsers(data);
                setPagination({
                    page: 0,
                    size: data.length,
                    totalPages: 1,
                    totalElements: data.length
                });
            }

            return response;
        } catch (err) {
            console.error("❌ Fetch users failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch users");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get user by ID (Admin only)
     * GET /api/v1/admin/users/{userId}
     */
    const getUserById = async (userId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/admin/users/${userId}`);
            console.log("✅ Fetched user details:", response);
            return response;
        } catch (err) {
            console.error("❌ Get user failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to get user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create user (Admin only)
     * POST /api/v1/admin/users
     */
    const createUser = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            console.log("📤 Creating user:", userData);
            const response = await axiosInstance.post("/admin/users", userData);
            console.log("✅ User created:", response);

            return response;
        } catch (err) {
            console.error("❌ Create user failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to create user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update user (Admin only)
     * PUT /api/v1/admin/users/{userId}
     */
    const updateUser = async (userId, userData) => {
        try {
            setLoading(true);
            setError(null);

            console.log("📤 Updating user:", userId, userData);
            const response = await axiosInstance.put(`/admin/users/${userId}`, userData);
            console.log("✅ User updated:", response);

            return response;
        } catch (err) {
            console.error("❌ Update user failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to update user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Deactivate user (Admin only)
     * PATCH /api/v1/admin/users/{userId}/deactivate
     */
    const deactivateUser = async (userId) => {
        try {
            setLoading(true);
            setError(null);

            console.log("🔴 Deactivating user:", userId);
            const response = await axiosInstance.patch(`/admin/users/${userId}/deactivate`);
            console.log("✅ User deactivated:", response);

            return response;
        } catch (err) {
            console.error("❌ Deactivate user failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to deactivate user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reactivate user (Admin only)
     * PATCH /api/v1/admin/users/{userId}/reactivate
     */
    const reactivateUser = async (userId) => {
        try {
            setLoading(true);
            setError(null);

            console.log("🟢 Reactivating user:", userId);
            const response = await axiosInstance.patch(`/admin/users/${userId}/reactivate`);
            console.log("✅ User reactivated:", response);

            return response;
        } catch (err) {
            console.error("❌ Reactivate user failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to reactivate user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ===================== OPERATOR APIs =====================

    /**
     * Get all staff (Operator only)
     * GET /api/v1/operator/staff?isActive=true&page=0&size=10
     */
    const fetchStaff = async (filters = {}, page = 0, size = 10) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append('page', page);
            params.append('size', size);
            
            if (filters.isActive !== undefined && filters.isActive !== '') {
                params.append('isActive', filters.isActive === 'true' || filters.isActive === true);
            }
            if (filters.search) params.append('search', filters.search);

            const response = await axiosInstance.get(`/operator/staff?${params.toString()}`);
            console.log("✅ Fetched staff:", response);

            if (response.content) {
                setUsers(response.content);
                setPagination({
                    page: response.number || page,
                    size: response.size || size,
                    totalPages: response.totalPages || 0,
                    totalElements: response.totalElements || 0
                });
            } else {
                const data = Array.isArray(response) ? response : [];
                setUsers(data);
                setPagination({
                    page: 0,
                    size: data.length,
                    totalPages: 1,
                    totalElements: data.length
                });
            }

            return response;
        } catch (err) {
            console.error("❌ Fetch staff failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch staff");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get staff by ID (Operator only)
     * GET /api/v1/operator/staff/{staffId}
     */
    const getStaffById = async (staffId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/operator/staff/${staffId}`);
            console.log("✅ Fetched staff details:", response);
            return response;
        } catch (err) {
            console.error("❌ Get staff failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to get staff");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create staff (Operator only)
     * POST /api/v1/operator/staff
     */
    const createStaff = async (staffData) => {
        try {
            setLoading(true);
            setError(null);

            console.log("📤 Creating staff:", staffData);
            const response = await axiosInstance.post("/operator/staff", staffData);
            console.log("✅ Staff created:", response);

            return response;
        } catch (err) {
            console.error("❌ Create staff failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to create staff");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update staff (Operator only)
     * PUT /api/v1/operator/staff/{staffId}
     */
    const updateStaff = async (staffId, staffData) => {
        try {
            setLoading(true);
            setError(null);

            console.log("📤 Updating staff:", staffId, staffData);
            const response = await axiosInstance.put(`/operator/staff/${staffId}`, staffData);
            console.log("✅ Staff updated:", response);

            return response;
        } catch (err) {
            console.error("❌ Update staff failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to update staff");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Deactivate staff (Operator only)
     * PATCH /api/v1/operator/staff/{staffId}/deactivate
     */
    const deactivateStaff = async (staffId) => {
        try {
            setLoading(true);
            setError(null);

            console.log("🔴 Deactivating staff:", staffId);
            const response = await axiosInstance.patch(`/operator/staff/${staffId}/deactivate`);
            console.log("✅ Staff deactivated:", response);

            return response;
        } catch (err) {
            console.error("❌ Deactivate staff failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to deactivate staff");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reactivate staff (Operator only)
     * PATCH /api/v1/operator/staff/{staffId}/reactivate
     */
    const reactivateStaff = async (staffId) => {
        try {
            setLoading(true);
            setError(null);

            console.log("🟢 Reactivating staff:", staffId);
            const response = await axiosInstance.patch(`/operator/staff/${staffId}/reactivate`);
            console.log("✅ Staff reactivated:", response);

            return response;
        } catch (err) {
            console.error("❌ Reactivate staff failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to reactivate staff");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        // State
        users,
        pagination,
        loading,
        error,
        
        // Admin APIs
        fetchUsers,
        getUserById,
        createUser,
        updateUser,
        deactivateUser,
        reactivateUser,
        
        // Operator APIs
        fetchStaff,
        getStaffById,
        createStaff,
        updateStaff,
        deactivateStaff,
        reactivateStaff
    };
};
