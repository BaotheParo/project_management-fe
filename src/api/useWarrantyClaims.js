import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";
import { getClaimStatusLabel } from "../constants/ClaimStatus";

export const useWarrantyClaims = (userId) => {
    const [rows, setRows] = useState([]);
    const [row, setRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all claims for specific technician
    const fetchClaims = async (userId) => {
        if (!userId) return;
        try {
            setLoading(true);
            setError(null);
            const response = await axiousInstance.get(`/claims/user/${userId}`); // GET /api/claims

            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure:", response.data);
                setRows([]);
                return;
            }

            const formattedClaims = response.data.map((claim) => ({
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
                userId: claim.userId,
                technicianName: claim.technicianName,
                isActive: claim.isActive,
            }));

            setRows(formattedClaims);
        } catch (err) {
            console.error("Fetch claims failed", err)
            setError(err);
            // fallback mock data
            setRows([
                {
                    id: "RO-001",
                    vehicle: "VinFast VF-3",
                    vin: "LSV1E7AL0MC123456",
                    status: "In Progress",
                    claimDate: "2025-10-25",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch claim by Id
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

            setRow(formattedClaim);
        } catch (err) {
            console.error("Fetch claim by ID failed: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const createClaim = async (payload) => {
        try {
            const response = await axiousInstance.post("/claims", payload);
            // Optionally refetch updated claim list
            await fetchClaims(payload.userId);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Failed to create claim:", error);
            return { success: false, error };
        }
    };

    const updateClaim = async (id, payload) => {
        try {
            console.log("🔵 [useWarrantyClaims] updateClaim called");
            console.log("📝 Claim ID:", id);
            console.log("📦 Payload:", payload);
            
            const response = await axiousInstance.put(`/claims/${id}`, payload);
            
            console.log("✅ [useWarrantyClaims] Update response:", response);
            console.log("✅ [useWarrantyClaims] Update response data:", JSON.stringify(response, null, 2));
            
            // Note: Axios interceptor returns response.data, not full response
            // If we reach here without error, update was successful
            const isSuccess = response !== null && response !== undefined && 
                             !response?.error && !response?.message?.includes('error');
            
            console.log("✅ [useWarrantyClaims] Update successful:", isSuccess);
            console.log("✅ [useWarrantyClaims] Response type:", typeof response);
            
            // Always refetch claims list after update (backend should have updated)
            if (userId) {
                console.log("🔄 [useWarrantyClaims] Refetching claims list after update...");
                console.log("🔄 [useWarrantyClaims] UserId:", userId);
                try {
                    await fetchClaims(userId);
                    console.log("✅ [useWarrantyClaims] Claims list refetched successfully");
                } catch (fetchErr) {
                    console.error("❌ [useWarrantyClaims] Failed to refetch claims:", fetchErr);
                }
            } else {
                console.warn("⚠️ [useWarrantyClaims] No userId available to refetch claims");
            }
            
            return response;
        } catch (error) {
            console.error("❌ [useWarrantyClaims] Update failed:", error);
            console.error("❌ Error details:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
            throw error;
        }
    };

    const deleteClaim = async (id) => {
        try {
            await axiousInstance.delete(`/claims/${id}`);
            await fetchClaims();
            return { success: true };
        } catch (err) {
            console.error("Remove claim request failed: ", err);
            return { success: false, error: err };
        }
    };

    useEffect(() => {
        if (userId) {
            fetchClaims(userId);
        }
    }, [userId]);

    return {
        rows,
        row,
        loading,
        error,
        fetchClaims,
        fetchClaimById,
        createClaim,
        updateClaim,
        deleteClaim,
    };
};
