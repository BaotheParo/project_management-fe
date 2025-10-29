import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";
import { getClaimStatusLabel } from "../constants/ClaimStatus";

export const useWarrantyClaims = () => {
    const [rows, setRows] = useState([]);
    const[row, setRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all claims
    const fetchClaims = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiousInstance.get("/claims"); // GET /api/claims

            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure:", response.data);
                setRows([]);
                return;
            }

            const formattedClaims = response.data.map((claim) => ({
                id: claim.claimId,
                vehicle: claim.vehicleName || "Unknown",
                vin: claim.vin,
                status: getClaimStatusLabel(claim.claimStatus),
                claimDate: new Date(claim.claimDate).toISOString().split("T")[0],
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
                id: claim.claimId,
                vehicle: claim.vehicleName || "Unknown",
                vin: claim.vin,
                status: getClaimStatusLabel(claim.claimStatus),
                name: claim.name,
                claimDate: new Date(claim.claimDate).toISOString().split("T")[0],
                issueDescription: claim.issueDescription,
                mileAge: claim.mileage,
                purchaseDate: new Date(claim.purchaseDate).toISOString().split("T")[0],
                // replacementDate: new Date(claim.)
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
        await axiousInstance.post("/claims", payload);
        await fetchClaims();
    };

    const updateClaim = async (id, payload) => {
        await axiousInstance.put(`/claims/${id}`, payload);
        await fetchClaims();
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
        fetchClaims();
    }, []);

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
