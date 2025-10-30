import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://dev-be-wm.fleeforezz.site/api", // your ASP.NET Web API base URL
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional interceptors for auth / errors
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API Error:", error);
        throw error;
    }
);

export default axiosInstance;