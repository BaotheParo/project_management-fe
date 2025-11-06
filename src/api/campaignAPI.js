import axiosInstance from './axiousInstance';

const campaignAPI = {
    // Lấy danh sách campaigns
    getAllCampaigns: async () => {
        try {
            const response = await axiosInstance.get('/campaigns');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy chi tiết một campaign
    getCampaignById: async (id) => {
        try {
            const response = await axiosInstance.get(`/campaigns/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Tạo campaign mới
    createCampaign: async (campaignData) => {
        try {
            const response = await axiosInstance.post('/campaigns', campaignData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật campaign
    updateCampaign: async (id, campaignData) => {
        try {
            const response = await axiosInstance.put(`/campaigns/${id}`, campaignData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Xóa campaign
    deleteCampaign: async (id) => {
        try {
            const response = await axiosInstance.delete(`/campaigns/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default campaignAPI;