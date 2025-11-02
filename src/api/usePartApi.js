import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";

export const usePartApi = () => {
    const [parts, setParts] = useState([]);
    const [part, setPart] = useState(null);
    const [partLoading, setPartLoading] = useState(false);
    const [partError, setPartError] = useState(null);

    // Fetch all parts
    const fetchParts = async () => {
        try {
            setPartLoading(true);
            setPartError(null);

            const response = await axiousInstance.get("/parts");

            let data = null;

            if (Array.isArray(response.data)) {
                data = response.data;
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (Array.isArray(response)) {
                data = response;
            } else {
                for (const key of Object.keys(response)) {
                    if (Array.isArray(response[key])) {
                        data = response[key];
                        break;
                    }
                }
            }

            if (!data || !Array.isArray(data)) {
                setParts([]);
                return;
            }

            if (data.length === 0) {
                setParts([]);
                return;
            }

            const formattedParts = data.map((part) => ({
                partId: part.partId,
                partName: part.partName,
                partDescription: part.partDescription,
                vehiclePartId: part.vehiclePartId,
                status: part.status,
                vin: part.vin,
                vehicleName: part.vehicleName || "Unknown",
                model: part.model || "",
                quantity: part.quantity || 0,
            }));

            setParts(formattedParts);
        } catch (err) {
            console.error("❌ Fetch parts failed", err);
            setPartError(err);
            setParts([]);
        } finally {
            setPartLoading(false);
        }
    };

    // Fetch parts by VIN - Returns array of parts
    const fetchPartsByVin = async (vin) => {
        try {
            setPartLoading(true);
            setPartError(null);

            // console.log("🔍 Fetching parts for VIN:", vin);
            const response = await axiousInstance.get(`/parts/by-vin/${vin}`);
            
            // console.log("📦 Raw API response:", response);
            // console.log("📦 response.data:", response.data);
            // console.log("📦 Type of response:", typeof response);
            // console.log("📦 Is response an array?", Array.isArray(response));
            
            // Handle response - API returns data directly in response (not response.data)
            let partData = null;

            // Try different possible response structures
            if (Array.isArray(response)) {
                // Data is directly in response
                partData = response;
                // console.log("✅ Found array directly in response");
            } else if (Array.isArray(response.data)) {
                partData = response.data;
                // console.log("✅ Found array directly in response.data");
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                partData = response.data.data;
                // console.log("✅ Found array in response.data.data");
            } else if (response && typeof response === 'object') {
                // If response is an object, look for array properties
                // console.log("🔍 Searching for array in response properties...");
                for (const key of Object.keys(response)) {
                    // console.log(`  Checking key: ${key}, value type:`, typeof response[key], "is array:", Array.isArray(response[key]));
                    if (Array.isArray(response[key])) {
                        partData = response[key];
                        // console.log(`✅ Found array in response.${key}`);
                        break;
                    }
                }
            }

            if (!partData || !Array.isArray(partData)) {
                // console.warn("⚠️ No parts array found for VIN:", vin);
                // console.warn("⚠️ Full response structure:", JSON.stringify(response, null, 2));
                return [];
            }

            if (partData.length === 0) {
                // console.warn("⚠️ Parts array is empty for VIN:", vin);
                return [];
            }

            // console.log("✨ Found", partData.length, "parts");

            // Format each part in the array
            const formattedParts = partData.map(part => ({
                partId: part.partId,
                partName: part.partName,
                partDescription: part.partDescription,
                vehiclePartId: part.vehiclePartId,
                status: part.status,
                vin: part.vin,
                vehicleName: part.vehicleName || "Unknown",
                model: part.model || "",
                quantity: part.quantity || 0,
            }));

            // console.log("✅ Formatted parts:", formattedParts);

            setPart(formattedParts); // Store array in state
            return formattedParts;
        } catch (err) {
            // console.error("❌ Fetch parts by VIN failed:", err);
            // console.error("❌ Error response:", err.response);
            // console.error("❌ Error data:", err.response?.data);
            setPartError(err);
            return [];
        } finally {
            setPartLoading(false);
        }
    };

    const createPart = async (payload) => {
        try {
            setPartLoading(true);
            setPartError(null);

            const response = await axiousInstance.post("/part", payload);

            // Refetch all parts after creation
            await fetchParts();

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Failed to create part:", error);
            setPartError(error);
            return { success: false, error };
        } finally {
            setPartLoading(false);
        }
    };

    const updatePart = async (partId, payload) => {
        try {
            setPartLoading(true);
            setPartError(null);

            await axiousInstance.put(`/part/${partId}`, payload);

            // Refetch all parts after update
            await fetchParts();

            return { success: true };
        } catch (error) {
            console.error("Failed to update part:", error);
            setPartError(error);
            return { success: false, error };
        } finally {
            setPartLoading(false);
        }
    };

    const deletePart = async (partId) => {
        try {
            setPartLoading(true);
            setPartError(null);

            await axiousInstance.delete(`/part/${partId}`);

            // Refetch all parts after deletion
            await fetchParts();

            return { success: true };
        } catch (err) {
            console.error("Remove part request failed: ", err);
            setPartError(err);
            return { success: false, error: err };
        } finally {
            setPartLoading(false);
        }
    };

    // Auto-fetch parts when hook is initialized
    useEffect(() => {
        console.log("usePartApi: Auto-fetching parts on mount");
        fetchParts();
    }, []);

    return {
        parts,
        part,
        partLoading,
        partError,
        fetchParts,
        fetchPartsByVin,
        createPart,
        updatePart,
        deletePart,
    };
};