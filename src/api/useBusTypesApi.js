import { useState, useEffect } from "react";
import axiosInstance from "./axiousInstance";

export const useBusTypesApi = () => {
    const [busTypes, setBusTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all bus types
    const fetchBusTypes = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axiosInstance.get("/bus-types");
            console.log("✅ Fetched bus types:", response);
            
            const data = Array.isArray(response) ? response : [];
            setBusTypes(data);
            
            return data;
        } catch (err) {
            console.error("❌ Fetch bus types failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch bus types");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Create new bus type
    const createBusType = async (busTypeData) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log("📤 Creating bus type:", busTypeData);
            const response = await axiosInstance.post("/bus-types", busTypeData);
            console.log("✅ Bus type created:", response);
            
            // Refresh list
            await fetchBusTypes();
            
            return response;
        } catch (err) {
            console.error("❌ Create bus type failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to create bus type");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update bus type
    const updateBusType = async (id, busTypeData) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log("📤 Updating bus type:", id, busTypeData);
            const response = await axiosInstance.put(`/bus-types/${id}`, busTypeData);
            console.log("✅ Bus type updated:", response);
            
            // Refresh list
            await fetchBusTypes();
            
            return response;
        } catch (err) {
            console.error("❌ Update bus type failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to update bus type");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete bus type
    const deleteBusType = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log("🗑️ Deleting bus type:", id);
            await axiosInstance.delete(`/bus-types/${id}`);
            console.log("✅ Bus type deleted");
            
            // Refresh list
            await fetchBusTypes();
            
            return true;
        } catch (err) {
            console.error("❌ Delete bus type failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to delete bus type");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get bus type by ID
    const getBusTypeById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axiosInstance.get(`/bus-types/${id}`);
            return response;
        } catch (err) {
            console.error("❌ Get bus type failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to get bus type");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusTypes();
    }, []);

    return {
        busTypes,
        loading,
        error,
        fetchBusTypes,
        createBusType,
        updateBusType,
        deleteBusType,
        getBusTypeById
    };
};
