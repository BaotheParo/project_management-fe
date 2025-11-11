import axiosInstance from "./axiousInstance";

const claimAPI = {
  // Lấy danh sách claims
  getAllClaims: () => {
    // Bỏ async/await và try/catch
    return axiosInstance.get("/claims");
  },

  // Lấy 1 claim bằng ID
  getClaimById: (claimId) => {
    console.log("ĐANG GỌI getClaimById VỚI ID:", claimId); // Dòng này vẫn OK
    return axiosInstance.get(`/claims/${claimId}`);
  },

  // Duyệt 1 claim
  approveClaim: (claimId) => {
    return axiosInstance.post(`/claims/${claimId}/approve`);
  },
};

export default claimAPI;
