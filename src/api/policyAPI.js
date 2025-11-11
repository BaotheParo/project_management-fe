// Import axiosInstance (vẫn tôn trọng tên file "axiousInstance" của bạn)
import axiosInstance from "./axiousInstance";

const policyAPI = {
  /**
   * 1. GET /api/policy/validate
   * (Tên hàm này mình tự đặt, bạn có thể đổi)
   */
  validatePolicy: () => {
    // Lưu ý: baseURL trong axiousInstance.js đã là /api
    // nên ở đây ta chỉ cần gọi "/policy/validate"
    return axiosInstance.get("/policy/validate");
  },

  /**
   * 2. GET /api/policy/check-status/{partItemId}
   */
  checkStatusByPartItemId: (partItemId) => {
    return axiosInstance.get(`/policy/check-status/${partItemId}`);
  },

  /**
   * 3. POST /api/policy/check-multiple
   */
  checkMultiplePolicies: (data) => {
    // 'data' ở đây là body của request,
    // có thể là một mảng ID hoặc đối tượng nào đó
    return axiosInstance.post("/policy/check-multiple", data);
  },

  /**
   * 4. GET /api/policy/expiring-soon
   */
  getExpiringSoonPolicies: () => {
    return axiosInstance.get("/policy/expiring-soon");
  },
};

export default policyAPI;
