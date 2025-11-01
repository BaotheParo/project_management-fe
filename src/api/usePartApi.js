import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";

export const usePartApi = () => {
    const [parts, setVehicles] = useState([]);
    const [part, setVehicle] = useState(null);
    const [partLoading, setPartLoading] = useState(false);
    const [partError, setPartError] = useState(null);

    // Fetch all parts
    const fetchParts = async () => {
        // console.log("🚗 fetchVehicle called");
        try {
            setPartLoading(true);
            setPartError(null);

            // console.log("📡 Making API call to /vehicle/get-all");
            const response = await axiousInstance.get(`/part`);

            // console.log("✅ Full response object:", response);
            // console.log("✅ response.data:", response.data);
            // console.log("✅ response.status:", response.status);

            // Handle different response structures
            // Try multiple possible locations for the data
            let data = null;

            if (Array.isArray(response.data)) {
                // Data is directly in response.data
                data = response.data;
                // console.log("📦 Found data in response.data (array)");
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                // Data is in response.data.data
                data = response.data.data;
                // console.log("📦 Found data in response.data.data");
            } else if (Array.isArray(response)) {
                // Data is directly in response
                data = response;
                // console.log("📦 Found data in response (array)");
            } else {
                // If response.data is undefined, the data might be in the response itself
                // This can happen with some axios configurations
                // console.log("📦 Checking alternative response structure...");
                // console.log("📦 typeof response:", typeof response);
                // console.log("📦 response keys:", Object.keys(response));

                // Try to find an array property
                for (const key of Object.keys(response)) {
                    if (Array.isArray(response[key])) {
                        data = response[key];
                        // console.log(`📦 Found data in response.${key}`);
                        break;
                    }
                }
            }

            // console.log("📦 Final extracted data:", data);
            // console.log("📦 Is data an array?", Array.isArray(data));
            // console.log("📦 Data length:", data?.length);

            if (!data || !Array.isArray(data)) {
                // console.warn("⚠️ Could not find array data in response");
                // console.warn("⚠️ Full response structure:", JSON.stringify(response, null, 2));
                setVehicles([]);
                return;
            }

            if (data.length === 0) {
                // console.warn("⚠️ API returned empty array");
                setVehicles([]);
                return;
            }

            // Map the response
            const formattedVehicles = data.map((vehicle) => ({
                vin: vehicle.vin,
                vehicleName: vehicle.vehicleName || "Unknown",
                model: vehicle.model || "",
                purchaseDate: vehicle.purchaseDate,
                mileAge: vehicle.mileAge || 0,
                customerId: vehicle.customerId,
                firstName: vehicle.firstName || "",
                lastName: vehicle.lastName || "",
                phoneNumber: vehicle.phoneNumber || "",
                email: vehicle.email || "",
                fullName: vehicle.fullName || `${vehicle.firstName} ${vehicle.lastName}`.trim(),
            }));

            // console.log("✨ Formatted vehicles:", formattedVehicles);
            // console.log("✨ About to call setVehicles with:", formattedVehicles.length, "vehicles");

            setVehicles(formattedVehicles);

            // console.log("✅ setVehicles called successfully");
        } catch (err) {
            // console.error("❌ Fetch vehicles failed", err);
            // console.error("❌ Error response:", err.response);
            // console.error("❌ Error details:", err.response?.data || err.message);
            setPartError(err);
            setVehicles([]);
        } finally {
            // console.log("🏁 Setting loading to false");
            setPartLoading(false);
        }
    };

    // Fetch parts by VIN
    const fetchPartsByVin = async (vin) => {
        try {
            setPartLoading(true);
            setPartError(null);

            const response = await axiousInstance.get(`/part/${vin}`);
            const partData = response.data?.data || response.data;

            if (!partData) {
                throw new Error("Vehicle not found");
            }

            const formattedPart = {
                vin: partData.vin,
                vehicleName: partData.vehicleName || "Unknown",
                model: partData.model || "",
                purchaseDate: partData.purchaseDate,
                mileAge: partData.mileAge || 0,
                customerId: partData.customerId,
                firstName: partData.firstName || "",
                lastName: partData.lastName || "",
                phoneNumber: partData.phoneNumber || "",
                email: partData.email || "",
                fullName: partData.fullName || `${partData.firstName} ${partData.lastName}`.trim(),
            };

            setVehicle(formattedPart);
            return formattedPart;
        } catch (err) {
            console.error("Fetch parts by VIN failed: ", err);
            setPartError(err);
            return null;
        } finally {
            setPartLoading(false);
        }
    };

    const createVehicle = async (payload) => {
        try {
            setPartLoading(true);
            setPartError(null);

            const response = await axiousInstance.post("/vehicle", payload);

            // Refetch all vehicles after creation
            await fetchParts();

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Failed to create vehicle:", error);
            setPartError(error);
            return { success: false, error };
        } finally {
            setPartLoading(false);
        }
    };

    const updateVehicle = async (vin, payload) => {
        try {
            setPartLoading(true);
            setPartError(null);

            await axiousInstance.put(`/vehicle/${vin}`, payload);

            // Refetch all vehicles after update
            await fetchParts();

            return { success: true };
        } catch (error) {
            console.error("Failed to update vehicle:", error);
            setPartError(error);
            return { success: false, error };
        } finally {
            setPartLoading(false);
        }
    };

    const deleteVehicle = async (vin) => {
        try {
            setPartLoading(true);
            setPartError(null);

            await axiousInstance.delete(`/vehicle/${vin}`);

            // Refetch all vehicles after deletion
            await fetchParts();

            return { success: true };
        } catch (err) {
            console.error("Remove vehicle request failed: ", err);
            setPartError(err);
            return { success: false, error: err };
        } finally {
            setPartLoading(false);
        }
    };

    // Auto-fetch vehicles when hook is initialized
    useEffect(() => {
        console.log("useVehicleApi: Auto-fetching vehicles on mount");
        fetchParts();
    }, []);

    return {
        parts,
        part,
        partLoading,
        partError,
        fetchParts,
        fetchPartsByVin,
        createVehicle,
        updateVehicle,
        deleteVehicle,
    };
};