import { useEffect, useState } from "react";
import axiosInstance from "./axiousInstance";
import { getClaimStatusLabel } from "../constants/ClaimStatus";

/**
 * Custom hook for SC-Staff claims management
 * Fetches claims specific to a service center
 */
export const useSCStaffClaims = (serviceCenterId) => {
    const [claims, setClaims] = useState([]);
    const [stats, setStats] = useState({
        totalClaims: 0,
        acceptedClaims: 0,
        pendingClaims: 0,
        rejectedClaims: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch all claims for a specific service center
     */
    const fetchClaimsByServiceCenter = async (scId) => {
        try {
            setLoading(true);
            setError(null);

            console.log('useSCStaffClaims - Fetching claims with scId:', scId);

            let response;
            
            // If serviceCenterId is provided, fetch by service center
            // Otherwise, fetch all claims
            if (scId) {
                console.log('useSCStaffClaims - Calling API: /claims/service-center/' + scId);
                response = await axiosInstance.get(`/claims/service-center/${scId}`);
            } else {
                console.log('useSCStaffClaims - Calling API: /claims');
                response = await axiosInstance.get("/claims");
            }

            console.log('useSCStaffClaims - API Response:', response);

            // Handle different response structures
            const data = Array.isArray(response) 
                ? response 
                : (Array.isArray(response.data) ? response.data : response.data?.data || []);

            console.log('useSCStaffClaims - Extracted data:', data);

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure:", response);
                setClaims([]);
                calculateStats([]);
                return;
            }

            // Format claims data for display
            const formattedClaims = data.map((claim) => ({
                id: claim.claimId,
                date: new Date(claim.claimDate).toISOString().split("T")[0],
                vin: claim.vin,
                status: getClaimStatusLabel(claim.claimStatus),
                statusCode: claim.claimStatus,
                issueDescription: claim.issueDescription,
                vehicle: claim.vehicleName || "Unknown",
                purchaseDate: new Date(claim.purchaseDate).toISOString().split("T")[0],
                mileage: claim.mileage,
                parts: claim.parts || [],
                totalCost: claim.totalCost,
                policyName: claim.policyName,
                serviceCenterName: claim.serviceCenterName,
                requester: claim.technicianName || "Unassigned",
            }));

            setClaims(formattedClaims);
            calculateStats(formattedClaims);
        } catch (err) {
            console.error("Fetch claims by service center failed:", err);
            setError(err);
            
            // Set empty state on error
            setClaims([]);
            calculateStats([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Calculate statistics from claims data
     */
    const calculateStats = (claimsData) => {
        const total = claimsData.length;
        const accepted = claimsData.filter(claim => claim.statusCode === 1).length;
        const pending = claimsData.filter(claim => claim.statusCode === 0).length;
        const rejected = claimsData.filter(claim => claim.statusCode === 2).length;

        setStats({
            totalClaims: total,
            acceptedClaims: accepted,
            pendingClaims: pending,
            rejectedClaims: rejected,
        });
    };

    /**
     * Fetch a single claim by ID
     */
    const fetchClaimById = async (claimId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/claims/${claimId}`);
            const claim = response?.data || response;

            if (!claim) {
                throw new Error("Claim not found");
            }

            return {
                id: claim.claimId,
                claimNumber: `CL-${claim.claimId?.slice(0, 8).toUpperCase() || 'Unknown'}`,
                vehicle: claim.vehicleName || "Unknown",
                vin: claim.vin || "N/A",
                status: getClaimStatusLabel(claim.claimStatus),
                statusCode: claim.claimStatus,
                claimDate: new Date(claim.claimDate).toISOString().split("T")[0],
                issueDescription: claim.issueDescription || "",
                mileage: claim.mileage || 0,
                purchaseDate: claim.purchaseDate ? new Date(claim.purchaseDate).toISOString().split("T")[0] : "N/A",
                totalCost: claim.totalCost || 0,
                policyName: claim.policyName || "",
                serviceCenterName: claim.serviceCenterName || "",
                technicianName: claim.technicianName || "Unassigned",
                parts: claim.parts || [],
            };
        } catch (err) {
            console.error("Fetch claim by ID failed:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Approve a claim
     */
    const approveClaim = async (claimId) => {
        try {
            setLoading(true);
            await axiosInstance.put(`/claims/${claimId}/approve`);
            
            // Refetch claims after approval
            if (serviceCenterId) {
                await fetchClaimsByServiceCenter(serviceCenterId);
            }
        } catch (err) {
            console.error("Approve claim failed:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reject a claim
     */
    const rejectClaim = async (claimId, evmStaffId, rejectionReason) => {
        try {
            setLoading(true);
            await axiosInstance.put(`/claims/${claimId}/reject`, {
                evmStaffId,
                rejectionReason,
            });
            
            // Refetch claims after rejection
            if (serviceCenterId) {
                await fetchClaimsByServiceCenter(serviceCenterId);
            }
        } catch (err) {
            console.error("Reject claim failed:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update claim status
     */
    const updateClaimStatus = async (claimId, userId, newStatus) => {
        try {
            setLoading(true);
            await axiosInstance.put(`/claims/${claimId}/status`, {
                userId,
                newStatus,
            });
            
            // Refetch claims after status update
            if (serviceCenterId) {
                await fetchClaimsByServiceCenter(serviceCenterId);
            }
        } catch (err) {
            console.error("Update claim status failed:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        console.log('useSCStaffClaims - serviceCenterId changed:', serviceCenterId);
        if (serviceCenterId) {
            console.log('useSCStaffClaims - Fetching claims for service center:', serviceCenterId);
            fetchClaimsByServiceCenter(serviceCenterId);
        } else {
            console.log('useSCStaffClaims - No serviceCenterId provided, not fetching');
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceCenterId]);

    return {
        claims,
        stats,
        loading,
        error,
        fetchClaimsByServiceCenter,
        fetchClaimById,
        approveClaim,
        rejectClaim,
        updateClaimStatus,
        refetch: () => fetchClaimsByServiceCenter(serviceCenterId),
    };
};
