import { apiFetch } from '../../services/api';

export const washerService = {
    getWashers: async () => {
        return await apiFetch('/washers');
    },
    
    createWasher: async (washerData: { branchId: number }) => {
        return await apiFetch('/washers', {
            method: 'POST',
            body: JSON.stringify(washerData),
        });
    },
    
    toggleWasher: async (id: number) => {
        return await apiFetch(`/washers/${id}/toggle`, {
            method: 'POST',
        });
    },

    deleteWasher: async (id: number) => {
        return await apiFetch(`/washers/${id}`, {
            method: 'DELETE',
        });
    }
};
