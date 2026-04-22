export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const ENDPOINTS = {
    HEALTH: '/health',
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        ME: '/auth/me',
    },
    TRANSACTIONS: '/transactions',
    PORTFOLIO: '/portfolio',
    AI: {
        CHAT: '/ai/chat',
        INSIGHTS: '/ai/insights',
        FORECAST: '/ai/forecast',
    },
    GOALS: '/goals',
};
