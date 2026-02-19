import { apiFetch } from '../../services/api';

export const dryerService = {
    getDryers: async () => {
        return await apiFetch('/dryers');
    },
    
    createDryer: async (dryerData: { branchId: number }) => {
        return await apiFetch('/dryers', {
            method: 'POST',
            body: JSON.stringify(dryerData),
        });
    },
    
    toggleDryer: async (id: number) => {
        return await apiFetch(`/dryers/${id}/toggle`, {
            method: 'POST',
        });
    },

    deleteDryer: async (id: number) => {
        return await apiFetch(`/dryers/${id}`, {
            method: 'DELETE',
        });
    }
};
