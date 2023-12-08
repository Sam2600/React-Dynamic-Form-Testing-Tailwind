import axios from "axios";

const token = localStorage.getItem("token");

export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_LARAVEL_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            return error;
        }

        throw error;
    }
);