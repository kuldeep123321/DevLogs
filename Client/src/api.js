// ✅ SAHI api.js
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor — token lagao
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); 
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response, 

    async (error) => {      
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(
                    "http://localhost:3000/api/auth/refreshtoken",
                    {},
                    { withCredentials: true }
                );

                localStorage.setItem("accessToken", data.accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                return api(originalRequest);

            } catch (err) {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
                return Promise.reject(err); // 
            }
        }
        return Promise.reject(error);
    }
);

export default api;