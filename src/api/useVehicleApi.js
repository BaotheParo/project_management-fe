import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";
import { getClaimStatusLabel } from "../constants/ClaimStatus";

export const useVehicleApi = () => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState(null);
    const [vehicleLoading, setLoading] = useState(true);
    const [vehicleError, setError] = useState(null);

    // Fetch all vehicle
    const fetchVehicle = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiousInstance.get("/vehicle/get-all"); // GET /api/claims

            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure:", response.data);
                setVehicles([]);
                return;
            }

            const formattedVehicle = response.data.map((vehicle) => ({
                vin: vehicle.vin,
                vehicleName: vehicle.vehicleName || "Unknown",
                purchaseDate: vehicle.purchaseDate,
                mileAge: vehicle.mileAge,
            }));

            setVehicles(formattedVehicle);
        } catch (err) {
            console.error("Fetch claims failed", err)
            setError(err);
            // fallback mock data
            setVehicles([
                {
                    vin: "LSV1E7AL0MC123456",
                    vehicleName: "VinFast VF 3",
                    purchaseDate: "2023-10-12",
                    mileage: "4000",
                    manufacturer: "VinFast",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch vehicle by Id
    const fetchClaimById = async (id) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiousInstance.get(`/claims/${id}`);
            const claim = response.data?.data || response.data;

            if (!claim) {
                throw new Error("Claim not found");
            }

            const formattedClaim = {
                claimId: claim.claimId,
                claimDate: new Date(claim.claimDate).toISOString().split("T")[0],
                vin: claim.vin,
                claimStatus: getClaimStatusLabel(claim.claimStatus),
                issueDescription: claim.issueDescription,
                vehicleName: claim.vehicleName || "Unknown",
                purchaseDate: new Date(claim.purchaseDate).toISOString().split("T")[0],
                mileAge: claim.mileage,
                parts: claim.parts || [],
                totalCost: claim.totalCost,
                policyName: claim.policyName,
                serviceCenterName: claim.serviceCenterName,
                technicianName: claim.technicianName,
            };

            setVehicle(formattedClaim);
        } catch (err) {
            console.error("Fetch claim by ID failed: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const createVehicle = async (payload) => {
        try {
            const response = await axiousInstance.post("/claims", payload);
            // Optionally refetch updated claim list
            // await fetchClaims(payload.userId);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Failed to create claim:", error);
            return { success: false, error };
        }
    };

    const updateVehicle = async (id, payload) => {
        await axiousInstance.put(`/claims/${id}`, payload);
        await fetchVehicle();
    };

    const deleteVehicle = async (id) => {
        try {
            await axiousInstance.delete(`/claims/${id}`);
            await fetchVehicle();
            return { success: true };
        } catch (err) {
            console.error("Remove claim request failed: ", err);
            return { success: false, error: err };
        }
    };

    // useEffect(() => {
    //     fetchVehicle();
    // }, []);

    return {
        vehicles,
        vehicle,
        vehicleLoading,
        vehicleError,
        fetchVehicle,
        createVehicle,
        updateVehicle,
        deleteVehicle,
    };
};