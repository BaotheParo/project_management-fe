import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";
import { getClaimStatusLabel } from "../constants/ClaimStatus";

export const useWarrantyClaims = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const createClaim = async (payload) => {
        await axiousInstance.post("/claims", payload);
        await fetchClaims();
    };

    const updateClaim = async (id, payload) => {
        await axiousInstance.put(`/claims/${id}`, payload);
        await fetchClaims();
    };

    const deleteClaim = async (id) => {
        await axiousInstance.delete(`/claims/${id}`);
        await fetchClaims();
    };

    useEffect(() => {
        fetchClaims();
    }, []);

    return { rows, loading, error, createClaim, updateClaim, deleteClaim };
};
