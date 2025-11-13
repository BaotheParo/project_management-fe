import { useState, useEffect } from "react";
import axiosInstance from "./axiousInstance";

export const useTripsApi = () => {
    const [trips, setTrips] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all trips with pagination
    const fetchTrips = async (page = 0, size = 10) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axiosInstance.get(`/trips?page=${page}&size=${size}`);
            console.log("✅ Fetched trips:", response);
            
            // Handle paginated response
            if (response.content) {
                setTrips(response.content);
                setPagination({
                    page: response.number || page,
                    size: response.size || size,
                    totalPages: response.totalPages || 0,
                    totalElements: response.totalElements || 0
                });
            } else {
                // Fallback for non-paginated response
                const data = Array.isArray(response) ? response : [];
                setTrips(data);
                setPagination({
                    page: 0,
                    size: data.length,
                    totalPages: 1,
                    totalElements: data.length
                });
            }
            
            return response;
        } catch (err) {
            console.error("❌ Fetch trips failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch trips");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get trip by ID with details
    const getTripById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axiosInstance.get(`/trips/${id}`);
            console.log("✅ Fetched trip details:", response);
            return response;
        } catch (err) {
            console.error("❌ Get trip failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to get trip");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Create new trip
    const createTrip = async (tripData) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log("📤 Creating trip:", tripData);
            const response = await axiosInstance.post("/trips", tripData);
            console.log("✅ Trip created:", response);
            
            // Refresh list
            await fetchTrips(pagination.page, pagination.size);
            
            return response;
        } catch (err) {
            console.error("❌ Create trip failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to create trip");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update trip
    const updateTrip = async (id, tripData) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log("📤 Updating trip:", id, tripData);
            const response = await axiosInstance.put(`/trips/${id}`, tripData);
            console.log("✅ Trip updated:", response);
            
            // Refresh list
            await fetchTrips(pagination.page, pagination.size);
            
            return response;
        } catch (err) {
            console.error("❌ Update trip failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to update trip");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete trip
    const deleteTrip = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log("🗑️ Deleting trip:", id);
            await axiosInstance.delete(`/trips/${id}`);
            console.log("✅ Trip deleted");
            
            // Refresh list
            await fetchTrips(pagination.page, pagination.size);
            
            return true;
        } catch (err) {
            console.error("❌ Delete trip failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to delete trip");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return {
        trips,
        pagination,
        loading,
        error,
        fetchTrips,
        getTripById,
        createTrip,
        updateTrip,
        deleteTrip
    };
};
