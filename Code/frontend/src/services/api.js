import axios from 'axios';
import { API_BASE_URL } from '../constants/endpoints';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for standardizing responses
api.interceptors.response.use(
    (response) => {
        return {
            success: true,
            data: response.data,
            error: null,
        };
    },
    (error) => {
        const standardError = {
            success: false,
            data: null,
            error: {
                code: error.response?.status || 'NETWORK_ERROR',
                message: error.response?.data?.detail || error.message || 'An unexpected error occurred',
            },
        };
        return Promise.reject(standardError);
    }
);

export default api;
