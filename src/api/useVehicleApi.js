import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";

export const useVehicleApi = () => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState(null);
    const [vehicleLoading, setLoading] = useState(false);
    const [vehicleError, setError] = useState(null);

    // Fetch all vehicles
    const fetchVehicle = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axiousInstance.get("/vehicle/get-all");
            
            console.log("Raw API Response:", response.data); // Debug log

            // Handle response - your API returns array directly
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure:", response.data);
                setVehicles([]);
                return;
            }

            // Map the response to match your actual API structure
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

            console.log("Formatted vehicles:", formattedVehicles); // Debug log
            setVehicles(formattedVehicles);
        } catch (err) {
            console.error("Fetch vehicles failed", err);
            console.error("Error details:", err.response?.data || err.message);
            setError(err);
            
            // fallback mock data
            const mockData = [
                {
                    vin: "0f51b827-bcee-46e7-b624-3571dc14ba12",
                    vehicleName: "Vf8",
                    model: "Doi moi nhat",
                    purchaseDate: "2024-11-01T09:00:00Z",
                    mileAge: 45000,
                    customerId: "f69efef6-c13a-412c-9c63-d4277c27b279",
                    firstName: "Nguyen",
                    lastName: "Thinh",
                    phoneNumber: "0909090909",
                    email: "example@gmail.com",
                    fullName: "Nguyen Thinh"
                },
            ];
            console.log("Using mock data:", mockData);
            setVehicles(mockData);
        } finally {
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