import { apiFetch } from '../../services/api';

export const homeService = {
    getDashboardStats: async () => {
        return await apiFetch('/reports/dashboard');
    }
};
