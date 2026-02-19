import { useUsers } from './UsersContext';

export const useUsersController = () => {
    const { users, loading } = useUsers();

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        admins: users.filter(u => u.role === 'admin').length
    };

    return {
        users,
        loading,
        stats
    };
};
