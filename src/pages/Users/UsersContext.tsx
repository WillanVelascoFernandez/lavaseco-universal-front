import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userService } from './UserService';

export interface User {
    id: number;
    name: string;
    role: any;
    email: string;
    lastActive: string;
    status: 'active' | 'inactive';
}

interface UsersContextType {
    users: User[];
    loading: boolean;
    refreshUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getUsers();
            const adaptedUsers = data.map((u: any) => ({
                id: u.id,
                name: u.name || 'Sin nombre',
                role: u.role?.name || 'Invitado',
                email: u.email,
                lastActive: 'Recientemente', // Backend doesn't track this yet
                status: u.active ? 'active' : 'inactive'
            }));
            setUsers(adaptedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ users, loading, refreshUsers: fetchUsers }}>
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
