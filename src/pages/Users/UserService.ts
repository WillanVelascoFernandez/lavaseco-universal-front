import { apiFetch } from '../../services/api';

export const userService = {
    getUsers: async () => {
        return await apiFetch('/users');
    },
    
    createUser: async (userData: any) => {
        return await apiFetch('/auth/register', { // Registration is handled by auth routes in this backend
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
    
    updateUser: async (id: number, userData: any) => {
        return await apiFetch(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    },

    deleteUser: async (id: number) => {
        return await apiFetch(`/users/${id}`, {
            method: 'DELETE',
        });
    }
};
