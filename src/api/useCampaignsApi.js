import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";

/**
 * Custom hook for Campaigns management (for SC Technician)
 * Fetches campaigns assigned to a technician
 */
export const useCampaignsApi = (userId) => {
    const [campaigns, setCampaigns] = useState([]);
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch all campaigns for a specific technician
     */
    const fetchCampaigns = async (userId) => {
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            console.log("🔵 [useCampaignsApi] Fetching campaigns for userId:", userId);

            // Try different possible endpoints based on backend structure
            // Option 1: /campaigns/technician/:userId (most common)
            // Option 2: /campaigns/user/:userId (similar to work orders)
            // Option 3: /campaigns (get all, then filter client-side)
            
            let response;
            try {
                // Try endpoint 1 first
                response = await axiousInstance.get(`/campaigns/technician/${userId}`);
                console.log("✅ [useCampaignsApi] Used endpoint: /campaigns/technician/:userId");
            } catch (err) {
                if (err.response?.status === 404) {
                    console.warn("⚠️ [useCampaignsApi] Endpoint /campaigns/technician/:userId not found, trying alternative...");
                    try {
                        // Try endpoint 2
                        response = await axiousInstance.get(`/campaigns/user/${userId}`);
                        console.log("✅ [useCampaignsApi] Used endpoint: /campaigns/user/:userId");
                    } catch (err2) {
                        if (err2.response?.status === 404) {
                            console.warn("⚠️ [useCampaignsApi] Endpoint /campaigns/user/:userId not found, trying /campaigns...");
                            // Try endpoint 3 - get all campaigns
                            response = await axiousInstance.get(`/campaigns`);
                            console.log("✅ [useCampaignsApi] Used endpoint: /campaigns (all campaigns)");
                            // Note: Backend might need to filter by technicianId, or we filter client-side
                        } else {
                            throw err2;
                        }
                    }
                } else {
                    throw err;
                }
            }

            console.log("📥 [useCampaignsApi] API Response:", response);

            // Handle different response structures
            const data = Array.isArray(response)
                ? response
                : (Array.isArray(response.data) ? response.data : response.data?.data || []);

            if (!Array.isArray(data)) {
                console.warn("⚠️ [useCampaignsApi] Unexpected response structure:", response);
                setCampaigns([]);
                return;
            }

            // Format campaigns data
            const formattedCampaigns = data.map((camp) => ({
                campaignId: camp.campaignId || camp.id,
                campaignName: camp.campaignName || camp.name || "Unknown Campaign",
                description: camp.description || "",
                status: camp.status || 0,
                statusDisplay: getCampaignStatusLabel(camp.status),
                startDate: camp.startDate ? new Date(camp.startDate).toLocaleDateString() : "N/A",
                endDate: camp.endDate ? new Date(camp.endDate).toLocaleDateString() : "N/A",
                technicianId: camp.technicianId,
                technicianName: camp.technicianName || "Unassigned",
                vehicleCount: camp.vehicleCount || camp.vehicles?.length || 0,
                vehicles: camp.vehicles || [],
                serviceCenterId: camp.serviceCenterId,
                serviceCenterName: camp.serviceCenterName || "",
                createdAt: camp.createdAt,
                updatedAt: camp.updatedAt,
            }));

            console.log("✅ [useCampaignsApi] Formatted campaigns:", formattedCampaigns);
            setCampaigns(formattedCampaigns);
        } catch (err) {
            console.error("❌ [useCampaignsApi] Fetch campaigns failed:", err);
            setError(err);
            setCampaigns([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch a single campaign by ID
     */
    const fetchCampaignById = async (id) => {
        try {
            setLoading(true);
            setError(null);

            console.log("🔵 [useCampaignsApi] Fetching campaign by ID:", id);
            console.log("🔵 [useCampaignsApi] Endpoint: GET /campaigns/" + id);

            let response;
            try {
                response = await axiousInstance.get(`/campaigns/${id}`);
                console.log("✅ [useCampaignsApi] Campaign fetched successfully");
            } catch (err) {
                if (err.response?.status === 404) {
                    console.error("❌ [useCampaignsApi] Endpoint /campaigns/:id not found (404)");
                    console.error("❌ [useCampaignsApi] Backend endpoint does not exist yet");
                    throw new Error("API endpoint /campaigns/:id not found. Please check with backend team.");
                }
                throw err;
            }

            const camp = response?.data || response;

            if (!camp) {
                throw new Error("Campaign not found");
            }

            console.log("📥 [useCampaignsApi] Campaign data:", camp);

            const formattedCampaign = {
                campaignId: camp.campaignId || camp.id,
                campaignName: camp.campaignName || camp.name || "Unknown Campaign",
                description: camp.description || "",
                status: camp.status || 0,
                statusDisplay: getCampaignStatusLabel(camp.status),
                startDate: camp.startDate ? new Date(camp.startDate).toLocaleDateString() : "N/A",
                endDate: camp.endDate ? new Date(camp.endDate).toLocaleDateString() : "N/A",
                technicianId: camp.technicianId,
                technicianName: camp.technicianName || "Unassigned",
                vehicleCount: camp.vehicleCount || camp.vehicles?.length || 0,
                vehicles: camp.vehicles || [],
                serviceCenterId: camp.serviceCenterId,
                serviceCenterName: camp.serviceCenterName || "",
                createdAt: camp.createdAt,
                updatedAt: camp.updatedAt,
            };

            setCampaign(formattedCampaign);
            console.log("✅ [useCampaignsApi] Campaign fetched:", formattedCampaign);
        } catch (err) {
            console.error("❌ [useCampaignsApi] Fetch campaign by ID failed:", err);
            setError(err);
            setCampaign(null);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update campaign status
     */
    const updateCampaignStatus = async (id, status) => {
        try {
            setLoading(true);
            await axiousInstance.put(`/campaigns/${id}/status`, { status });
            
            // Refetch campaigns after update
            if (userId) {
                await fetchCampaigns(userId);
            }
            
            return { success: true };
        } catch (err) {
            console.error("❌ [useCampaignsApi] Update campaign status failed:", err);
            setError(err);
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        if (userId) {
            fetchCampaigns(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return {
        campaigns,
        campaign,
        loading,
        error,
        fetchCampaigns,
        fetchCampaignById,
        updateCampaignStatus,
        refetch: () => fetchCampaigns(userId),
    };
};

/**
 * Helper function to get campaign status label
 */
const getCampaignStatusLabel = (statusCode) => {
    const statusMap = {
        0: "Pending",
        1: "InProgress",
        2: "Completed",
        3: "Overdue",
    };
    return statusMap[statusCode] || "Unknown";
};

