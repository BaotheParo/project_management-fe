import { useEffect, useState } from "react";
import axiosClient from "./axiousInstance";

export const warrantyClaims = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClaims = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/claims"); // GET /api/claims

            if (response.data && response.data.success) {
                const formattedClaims = response.data.data.map((claim) => ({
                    id: claim.claimId,
                    vehicle: claim.vehicleName || "Unkown",
                    vin: claim.vin,
                    status: 
                        claim.claimStatus === 0
                            ? "Pending"
                            : claim.claimStatus === 1
                            ? "In Progress"
                            : claim.claimStatus === 2
                            ? "Done"
                            : "Unknown",
                    dueDate: new Date(claim.claimDate).toISOString().split("T")[0],
                    issue: claim.issueDescription || "N/A",
                    totalCost: claim.totalCost || 0,
                    mileage: claim.mileage || 0,
                }));
                setRows(formattedClaims);
            }
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
                    dueDate: "2025-10-25",
                    issue: "Battery issue",
                    totalCost: 500000,
                    mileage: 45000,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const createClaim = async (payload) => {
        await axiosClient.post("/claims", payload);
        await fetchClaims();
    };

    const updateClaim = async (id, payload) => {
        await axiosClient.put(`/claims/${id}`, payload);
        await fetchClaims();
    };

    const deleteClaim = async (id) => {
        await axiosClient.delete(`/claims/${id}`);
        await fetchClaims();
    };

    useEffect(() => {
        fetchClaims();
    }, []);

    return { rows, loading, error, createClaim, updateClaim, deleteClaim };
};
