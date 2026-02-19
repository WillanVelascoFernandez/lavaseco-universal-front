import { apiFetch } from '../../services/api';

export const reportService = {
    getDashboardStats: async () => {
        return await apiFetch('/reports/dashboard');
    },
    
    getBranchReports: async (startDate?: string, endDate?: string) => {
        let url = '/reports/branches';
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;
        
        return await apiFetch(url);
    },
    
    getTypeStats: async () => {
        return await apiFetch('/reports/types');
    }
};
