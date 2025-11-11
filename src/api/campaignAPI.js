import axiosInstance from "./axiousInstance";

const campaignAPI = {
  // Lấy danh sách campaigns
  getAllCampaigns: () => {
    return axiosInstance.get("/campaigns");
  },

  // Lấy chi tiết một campaign
  getCampaignById: (id) => {
    return axiosInstance.get(`/campaigns/${id}`);
  },

  // Tạo campaign mới
  createCampaign: (campaignData) => {
    return axiosInstance.post("/campaigns", campaignData);
  },

  // Cập nhật campaign
  updateCampaign: (id, campaignData) => {
    return axiosInstance.put(`/campaigns/${id}`, campaignData);
  },

  // Xóa campaign
  deleteCampaign: (id) => {
    return axiosInstance.delete(`/campaigns/${id}`);
  },
};

export default campaignAPI;
