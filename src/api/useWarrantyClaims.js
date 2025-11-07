import { useEffect, useState, useCallback } from "react";
import axiousInstance from "./axiousInstance";
import { getClaimStatusLabel } from "../constants/ClaimStatus";

export const useWarrantyClaims = (userId) => {
    const [rows, setRows] = useState([]);
    const [row, setRow] = useState(null);
    const [loading, setLoading] = useState(false); // Changed to false - only set true when fetching
    const [error, setError] = useState(null);

    // Fetch all claims
    const fetchClaims = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiousInstance.get(`/claims`); // GET /api/claims

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

    // Fetch all claims for specific technician
    const fetchClaimsByTechnician = async (userId) => {
        if (!userId) return;
        try {
            setLoading(true);
            setError(null);
            const response = await axiousInstance.get(`/claims/user/${uid}`); // GET /api/claims

            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure:", response.data);
                setRows([]);
                return;
            }

            const formattedClaims = data.map((claim) => ({
                claimId: claim.claimId,
                claimDate: claim.claimDate ? new Date(claim.claimDate).toISOString().split("T")[0] : null,
                vin: claim.vin,
                claimStatus: getClaimStatusLabel(claim.claimStatus),
                // Map backend action field (swagger uses `action`)
                actionType: claim.action ?? claim.actionType ?? claim.ActionType ?? 0,
                // Backwards-compatible raw action field
                action: claim.action ?? claim.actionType ?? claim.ActionType,
                issueDescription: claim.issueDescription,
                vehicleName: claim.vehicleName || "Unknown",
                purchaseDate: claim.purchaseDate ? new Date(claim.purchaseDate).toISOString().split("T")[0] : null,
                mileAge: claim.mileage,
                // Normalize parts array (keep raw, edit page will normalize further)
                parts: Array.isArray(claim.parts) ? claim.parts : [],
                // Include images/evidence (swagger uses `images`)
                claimImages: claim.images || claim.claimImages || claim.ClaimImages || claim.evidenceUrls || [],
                // Provide convenient array of URLs
                evidenceUrls: (claim.images || claim.claimImages || claim.ClaimImages || claim.evidenceUrls || []).map(img => img?.imageUrl || img?.url || img || null).filter(Boolean),
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

    // Fetch claim by Id - wrapped in useCallback to prevent infinite loops
    const fetchClaimById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔍 [useWarrantyClaims] Fetching claim by ID:', id);
            const response = await axiousInstance.get(`/claims/${id}`);
            console.log('✅ [useWarrantyClaims] API response:', response);
            
            const claim = response.data?.data || response.data;

            if (!claim) {
                console.error('❌ [useWarrantyClaims] No claim data in response');
                throw new Error("Claim not found");
            }

            console.log('📦 [useWarrantyClaims] Raw claim data:', claim);

            const formattedClaim = {
                claimId: claim.claimId,
                claimDate: claim.claimDate ? new Date(claim.claimDate).toISOString().split("T")[0] : null,
                vin: claim.vin,
                claimStatus: getClaimStatusLabel(claim.claimStatus),
                issueDescription: claim.issueDescription,
                vehicleName: claim.vehicleName || "Unknown",
                purchaseDate: claim.purchaseDate ? new Date(claim.purchaseDate).toISOString().split("T")[0] : null,
                mileAge: claim.mileage,
                // Normalize parts to shapes expected by edit page and filter out nulls
                parts: Array.isArray(claim.parts)
                    ? claim.parts
                          .filter((p) => p !== null && p !== undefined)
                          .map((p) => ({
                              partName: p?.partName || "",
                              partNumber: p?.partNumber || p?.partId || p?.partItemId || "",
                              partCode: p?.partNumber || p?.partCode || "",
                              replacementDate: p?.replacementDate || p?.ReplacementDate || "",
                              partId: p?.partId || p?.partItemId || "",
                              quantity: p?.quantity || 1,
                              price: p?.price || p?.cost || 0,
                              cost: p?.cost || p?.price || 0, // Add cost field for detail page
                          }))
                    : [],
                // Include images/evidence for edit form (swagger uses `images`)
                claimImages: claim.images || claim.claimImages || claim.ClaimImages || claim.evidenceUrls || [],
                evidenceUrls: (claim.images || claim.claimImages || claim.ClaimImages || claim.evidenceUrls || []).map(img => img?.imageUrl || img?.url || img || null).filter(Boolean),
                totalCost: claim.totalCost,
                policyName: claim.policyName,
                serviceCenterName: claim.serviceCenterName,
                technicianName: claim.technicianName,
                images: claim.images || [],
                action: claim.action,
                actionDisplay: claim.actionDisplay,
            };

            setRow(formattedClaim);
            console.log('✅ [useWarrantyClaims] Formatted claim set:', formattedClaim);
        } catch (err) {
            console.error("❌ [useWarrantyClaims] Fetch claim by ID failed:", err);
            console.error("❌ Error details:", {
                message: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                url: err.config?.url
            });
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // Empty deps - function doesn't depend on external values

    const createClaim = async (id, payload) => {
        try {
            if (payload instanceof FormData) {
                console.log("📦 Sending createClaim with FormData (files included)");
                // Log FormData entries
                for (const [key, value] of payload.entries()) {
                    if (value instanceof File) {
                        console.log(`   ${key}: File(${value.name}, ${value.size} bytes)`);
                    } else {
                        console.log(`   ${key}:`, value);
                    }
                }
            } else {
                console.log("📦 Sending createClaim payload:", JSON.stringify(payload, null, 2));
            }
            const response = await axiousInstance.post(`/claims?technicianId=${id}`, payload);
            // Optionally refetch updated claim list
            if (payload.userId) {
                await fetchClaims(payload.userId);
            }
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
            
            const response = await axiousInstance.put(`/claims/${id}/approve`);
            
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

    const approveClaim = async (id) => {
        try {
            const payload = {
                claimStatus: 1, // Accepted
                action: 1
            };
            const res = await axiousInstance.put(`/claims/${id}/approve`, payload);
            return res.data;
        } catch (err) {
            console.error("approveClaim error:", err.response?.data || err.message);
            throw err;
        }
    };

    const rejectClaim = async (id) => {
        try {
            const payload = {
                claimStatus: 1, // Rejected
                action: 1
            };
            const res = await axiousInstance.put(`/claims/${id}/reject`, payload);
            return res.data;
        } catch (err) {
            console.error("approveClaim error:", err.response?.data || err.message);
            throw err;
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
        fetchClaimsByTechnician,
        fetchClaimById,
        approveClaim,
        rejectClaim,
        createClaim,
        updateClaim,
        deleteClaim,
    };
};
