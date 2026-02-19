import { apiFetch } from '../../services/api';

export const roleService = {
    getRoles: async () => {
        return await apiFetch('/roles');
    },
    
    createRole: async (roleData: { name: string; permissions?: any }) => {
        return await apiFetch('/roles', {
            method: 'POST',
            body: JSON.stringify(roleData),
        });
    },
    
    updateRole: async (id: number, roleData: { name?: string; permissions?: any }) => {
        return await apiFetch(`/roles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(roleData),
        });
    },

    deleteRole: async (id: number) => {
        return await apiFetch(`/roles/${id}`, {
            method: 'DELETE',
        });
    }
};
