import axiosInstance from "./axiousInstance";

const claimAPI = {
  // Lấy danh sách claims
  getAllClaims: async () => {
    try {
      const response = await axiosInstance.get("/claims");
      return response.data;
    } catch (error) {
      console.error("Error fetching claims:", error);
      throw error;
    }
  },
  getClaimById: async (claimId) => {
    console.log("ĐANG GỌI getClaimById VỚI ID:", claimId);
    try {
      const response = await axiosInstance.get(`/claims/${claimId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching claims:", error);
      throw error;
    }
  },
  approveClaim: async (claimId) => {
    try {
      const response = await axiosInstance.post(`/claims/${claimId}/approve`);
      return response.data;
    } catch (error) {
      console.error("Error approving claim:", error);
      throw error;
    }
  },
};

export default claimAPI;
