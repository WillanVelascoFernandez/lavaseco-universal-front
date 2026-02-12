import { useUsers } from '../../models/UserContext';

export const useUsuariosController = () => {
    const { users, loading } = useUsers();

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'activo').length,
        admins: users.filter(u => u.role === 'admin').length
    };

    return {
        users,
        loading,
        stats
    };
};
