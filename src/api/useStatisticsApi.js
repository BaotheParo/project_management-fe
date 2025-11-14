import { useState } from "react";
import axiosInstance from "./axiousInstance";

export const useStatisticsApi = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Get statistics (works for both ADMIN and OPERATOR)
     * Backend automatically determines role and returns appropriate data
     * GET /api/v1/statistics?startDate=2025-11-01&endDate=2025-11-30
     */
    const fetchStatistics = async (startDate, endDate) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append('startDate', startDate);
            params.append('endDate', endDate);

            const response = await axiosInstance.get(`/statistics?${params.toString()}`);
            console.log("✅ Fetched statistics:", response);

            setStatistics(response);
            return response;
        } catch (err) {
            console.error("❌ Fetch statistics failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch statistics");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        statistics,
        loading,
        error,
        fetchStatistics
    };
};
