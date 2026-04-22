import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,

    login: (userData, token) => {
        localStorage.setItem('token', token);
        set({ user: userData, isAuthenticated: true, error: null });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
    },

    setLoading: (isLoading) => set({ loading: isLoading }),
    setError: (error) => set({ error }),
}));

export default useAuthStore;
