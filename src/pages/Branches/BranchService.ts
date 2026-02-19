import { apiFetch } from '../../services/api';
import { Branch } from '../../types/branch';

export const branchService = {
    getBranches: async () => {
        return await apiFetch('/branches');
    },
    
    createBranch: async (branchData: { name: string; address?: string; phone?: string }) => {
        return await apiFetch('/branches', {
            method: 'POST',
            body: JSON.stringify(branchData),
        });
    },
    
    deleteBranch: async (id: number) => {
        return await apiFetch(`/branches/${id}`, {
            method: 'DELETE',
        });
    }
};
