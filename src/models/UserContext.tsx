import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
    id: string;
    name: string;
    role: 'admin' | 'operador' | 'tecnico';
    email: string;
    lastActive: string;
    status: 'activo' | 'inactivo';
}

interface UserContextType {
    users: User[];
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUsers: User[] = [
    { id: '1', name: 'Admin Principal', role: 'admin', email: 'admin@lavaseco.com', lastActive: 'Ayer, 18:30', status: 'activo' },
    { id: '2', name: 'Juan Perez', role: 'operador', email: 'juan.p@sucursal.com', lastActive: 'Hoy, 09:15', status: 'activo' },
    { id: '3', name: 'Maria Lopez', role: 'operador', email: 'maria.l@sucursal.com', lastActive: 'Hace 3 días', status: 'inactivo' },
    { id: '4', name: 'Carlos Tecnico', role: 'tecnico', email: 'carlos.t@soporte.com', lastActive: 'Hoy, 14:00', status: 'activo' },
];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users] = useState<User[]>(initialUsers);
    const [loading] = useState(false);

    return (
        <UserContext.Provider value={{ users, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};
