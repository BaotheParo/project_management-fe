import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";

export const useVehicleApi = () => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState(null);
    const [vehicleLoading, setLoading] = useState(false);
    const [vehicleError, setError] = useState(null);

    // Fetch all vehicles
    const fetchVehicle = async () => {
        // console.log("🚗 fetchVehicle called");
        try {
            setLoading(true);
            setError(null);

            // console.log("📡 Making API call to /vehicle/get-all");
            const response = await axiousInstance.get("/vehicle/get-all");

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
            setError(err);
            setVehicles([]);
        } finally {
            // console.log("🏁 Setting loading to false");
            setLoading(false);
        }
    };

    // Fetch vehicle by VIN
    const fetchVehicleByVin = async (vin) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiousInstance.get(`/vehicle/${vin}`);
            const vehicleData = response.data?.data || response.data;

            if (!vehicleData) {
                throw new Error("Vehicle not found");
            }

            const formattedVehicle = {
                vin: vehicleData.vin,
                vehicleName: vehicleData.vehicleName || "Unknown",
                model: vehicleData.model || "",
                purchaseDate: vehicleData.purchaseDate,
                mileAge: vehicleData.mileAge || 0,
                customerId: vehicleData.customerId,
                firstName: vehicleData.firstName || "",
                lastName: vehicleData.lastName || "",
                phoneNumber: vehicleData.phoneNumber || "",
                email: vehicleData.email || "",
                fullName: vehicleData.fullName || `${vehicleData.firstName} ${vehicleData.lastName}`.trim(),
            };

            setVehicle(formattedVehicle);
            return formattedVehicle;
        } catch (err) {
            console.error("Fetch vehicle by VIN failed: ", err);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createVehicle = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiousInstance.post("/vehicle", payload);

            // Refetch all vehicles after creation
            await fetchVehicle();

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Failed to create vehicle:", error);
            setError(error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const updateVehicle = async (vin, payload) => {
        try {
            setLoading(true);
            setError(null);

            await axiousInstance.put(`/vehicle/${vin}`, payload);

            // Refetch all vehicles after update
            await fetchVehicle();

            return { success: true };
        } catch (error) {
            console.error("Failed to update vehicle:", error);
            setError(error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const deleteVehicle = async (vin) => {
        try {
            setLoading(true);
            setError(null);

            await axiousInstance.delete(`/vehicle/${vin}`);

            // Refetch all vehicles after deletion
            await fetchVehicle();

            return { success: true };
        } catch (err) {
            console.error("Remove vehicle request failed: ", err);
            setError(err);
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch vehicles when hook is initialized
    useEffect(() => {
        console.log("useVehicleApi: Auto-fetching vehicles on mount");
        fetchVehicle();
    }, []);

    return {
        vehicles,
        vehicle,
        vehicleLoading,
        vehicleError,
        fetchVehicle,
        fetchVehicleByVin,
        createVehicle,
        updateVehicle,
        deleteVehicle,
    };
};