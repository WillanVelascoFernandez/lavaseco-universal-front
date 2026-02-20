import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { userService } from './UserService';
import { useLogin } from '../Login/LoginContext';
import { User } from '../../types/user';

interface UsersContextType {
    users: User[];
    loading: boolean;
    refreshUsers: () => Promise<void>;
    addUser: (userData: any) => Promise<void>;
    updateUser: (id: number, userData: any) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

const POLLING_INTERVAL = 5000; // 5 seconds

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, hasPermission } = useLogin();

    const fetchUsers = useCallback(async (showLoading = true) => {
        if (!hasPermission('users_view')) return;
        
        if (showLoading) setLoading(true);
        try {
            const data = await userService.getUsers();
            const adaptedUsers = data.map((u: any) => ({
                id: u.id,
                name: u.name || 'Sin nombre',
                role: u.role?.name || 'Invitado',
                email: u.email,
                lastActive: 'Recientemente',
                status: u.active ? 'active' : 'inactive',
                branches: u.branches || []
            }));
            setUsers(adaptedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    }, [hasPermission]);

    useEffect(() => {
        if (isAuthenticated && hasPermission('users_view')) {
            fetchUsers();
            
            const interval = setInterval(() => {
                fetchUsers(false); // Background update
            }, POLLING_INTERVAL);
            
            return () => clearInterval(interval);
        } else {
            setUsers([]);
            setLoading(false);
        }
    }, [isAuthenticated, hasPermission, fetchUsers]);

    const addUser = async (userData: any) => {
        await userService.createUser(userData);
        await fetchUsers();
    };

    const updateUser = async (id: number, userData: any) => {
        await userService.updateUser(id, userData);
        await fetchUsers();
    };

    const deleteUser = async (id: number) => {
        await userService.deleteUser(id);
        await fetchUsers();
    };

    return (
        <UsersContext.Provider value={{ users, loading, refreshUsers: fetchUsers, addUser, updateUser, deleteUser }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers must be used within a UsersProvider');
    }
    return context;
};
