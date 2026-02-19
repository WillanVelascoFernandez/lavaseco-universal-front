import React, { createContext, useContext, useState } from 'react';
import { Role } from '../types/role';

interface RoleContextType {
    roles: Role[];
    addRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'isProtected'>) => Promise<void>;
    updateRole: (id: number, role: Partial<Role>) => Promise<void>;
    deleteRole: (id: number) => Promise<void>;
    getRoleById: (id: number) => Role | undefined;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Initial data precisely matching backend seed
const initialRoles: Role[] = [
    {
        id: 1,
        name: 'ADMIN',
        permissions: {
            users_view: true, users_create: true, users_edit: true, users_delete: true,
            roles_view: true, roles_create: true, roles_edit: true, roles_delete: true,
            branches_view: true, branches_create: true, branches_edit: true, branches_delete: true,
            washers_view: true, washers_create: true, washers_edit: true, washers_delete: true, washers_toggle: true,
            dryers_view: true, dryers_create: true, dryers_edit: true, dryers_delete: true, dryers_toggle: true,
            reports_view: true
        },
        isProtected: true,
        _count: { users: 2 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        name: 'OPERATOR',
        permissions: {
            users_view: false, users_create: false, users_edit: false, users_delete: false,
            roles_view: false, roles_create: false, roles_edit: false, roles_delete: false,
            branches_view: true,
            washers_view: true, washers_toggle: true,
            dryers_view: true, dryers_toggle: true,
            reports_view: false
        },
        isProtected: false,
        _count: { users: 12 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roles, setRoles] = useState<Role[]>(initialRoles);

    const addRole = async (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'isProtected'>) => {
        const newRole: Role = {
            ...roleData,
            id: Math.max(0, ...roles.map(r => r.id)) + 1,
            isProtected: false,
            _count: { users: 0 },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setRoles([...roles, newRole]);
    };

    const updateRole = async (id: number, updatedData: Partial<Role>) => {
        setRoles(roles.map(role =>
            role.id === id ? { ...role, ...updatedData, updatedAt: new Date().toISOString() } : role
        ));
    };

    const deleteRole = async (id: number) => {
        const role = roles.find(r => r.id === id);
        if (role?.isProtected) return;
        setRoles(roles.filter(role => role.id !== id));
    };

    const getRoleById = (id: number) => roles.find(role => role.id === id);

    return (
        <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole, getRoleById }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRoles = () => {
    const context = useContext(RoleContext);
    if (!context) throw new Error('useRoles must be used within a RoleProvider');
    return context;
};
