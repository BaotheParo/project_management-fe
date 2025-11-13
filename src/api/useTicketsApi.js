import { useState } from "react";
import axiosInstance from "./axiousInstance";

export const useTicketsApi = () => {
    const [tickets, setTickets] = useState([]);
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
     * Get all tickets (Admin only)
     * GET /api/v1/admin/tickets?page=0&size=10&status=PURCHASED&userEmail=...
     */
    const fetchTicketsAdmin = async (filters = {}, page = 0, size = 10) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append('page', page);
            params.append('size', size);
            
            if (filters.status) params.append('status', filters.status);
            if (filters.userEmail) params.append('userEmail', filters.userEmail);
            if (filters.tripId) params.append('tripId', filters.tripId);

            const response = await axiosInstance.get(`/admin/tickets?${params.toString()}`);
            console.log("✅ Fetched tickets (Admin):", response);

            if (response.content) {
                setTickets(response.content);
                setPagination({
                    page: response.number || page,
                    size: response.size || size,
                    totalPages: response.totalPages || 0,
                    totalElements: response.totalElements || 0
                });
            } else {
                const data = Array.isArray(response) ? response : [];
                setTickets(data);
                setPagination({
                    page: 0,
                    size: data.length,
                    totalPages: 1,
                    totalElements: data.length
                });
            }

            return response;
        } catch (err) {
            console.error("❌ Fetch tickets (Admin) failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch tickets");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get ticket by ID (Admin only)
     * GET /api/v1/admin/tickets/{ticketId}
     */
    const getTicketByIdAdmin = async (ticketId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/admin/tickets/${ticketId}`);
            console.log("✅ Fetched ticket details (Admin):", response);
            return response;
        } catch (err) {
            console.error("❌ Get ticket (Admin) failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to get ticket");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Cancel ticket (Admin only)
     * POST /api/v1/admin/tickets/{ticketId}/cancel
     */
    const cancelTicketAdmin = async (ticketId) => {
        try {
            setLoading(true);
            setError(null);

            console.log("🔴 Cancelling ticket (Admin):", ticketId);
            const response = await axiosInstance.post(`/admin/tickets/${ticketId}/cancel`);
            console.log("✅ Ticket cancelled (Admin):", response);

            return response;
        } catch (err) {
            console.error("❌ Cancel ticket (Admin) failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to cancel ticket");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ===================== OPERATOR APIs =====================

    /**
     * Get all tickets (Operator only)
     * GET /api/v1/trips/operator/tickets?page=0&size=10&status=PURCHASED&userEmail=...
     */
    const fetchTicketsOperator = async (filters = {}, page = 0, size = 10) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append('page', page);
            params.append('size', size);
            
            if (filters.status) params.append('status', filters.status);
            if (filters.userEmail) params.append('userEmail', filters.userEmail);
            if (filters.tripId) params.append('tripId', filters.tripId);

            const response = await axiosInstance.get(`/trips/operator/tickets?${params.toString()}`);
            console.log("✅ Fetched tickets (Operator):", response);

            if (response.content) {
                setTickets(response.content);
                setPagination({
                    page: response.number || page,
                    size: response.size || size,
                    totalPages: response.totalPages || 0,
                    totalElements: response.totalElements || 0
                });
            } else {
                const data = Array.isArray(response) ? response : [];
                setTickets(data);
                setPagination({
                    page: 0,
                    size: data.length,
                    totalPages: 1,
                    totalElements: data.length
                });
            }

            return response;
        } catch (err) {
            console.error("❌ Fetch tickets (Operator) failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch tickets");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get ticket by ID (Operator only)
     * GET /api/v1/trips/operator/tickets/{ticketId}
     */
    const getTicketByIdOperator = async (ticketId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/trips/operator/tickets/${ticketId}`);
            console.log("✅ Fetched ticket details (Operator):", response);
            return response;
        } catch (err) {
            console.error("❌ Get ticket (Operator) failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to get ticket");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Cancel ticket (Operator only)
     * POST /api/v1/trips/operator/tickets/{ticketId}/cancel
     */
    const cancelTicketOperator = async (ticketId) => {
        try {
            setLoading(true);
            setError(null);

            console.log("🔴 Cancelling ticket (Operator):", ticketId);
            const response = await axiosInstance.post(`/trips/operator/tickets/${ticketId}/cancel`);
            console.log("✅ Ticket cancelled (Operator):", response);

            return response;
        } catch (err) {
            console.error("❌ Cancel ticket (Operator) failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to cancel ticket");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        // State
        tickets,
        pagination,
        loading,
        error,
        
        // Admin APIs
        fetchTicketsAdmin,
        getTicketByIdAdmin,
        cancelTicketAdmin,
        
        // Operator APIs
        fetchTicketsOperator,
        getTicketByIdOperator,
        cancelTicketOperator
    };
};
