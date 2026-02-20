import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Role } from '../../types/role';
import { roleService } from './RoleService';
import { useLogin } from '../Login/LoginContext';

interface RolesContextType {
    roles: Role[];
    loading: boolean;
    refreshRoles: () => Promise<void>;
    addRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'isProtected'>) => Promise<void>;
    updateRole: (id: number, role: Partial<Role>) => Promise<void>;
    deleteRole: (id: number) => Promise<void>;
    getRoleById: (id: number) => Role | undefined;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

const POLLING_INTERVAL = 5000; // 5 seconds

export const RolesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, hasPermission } = useLogin();

    const fetchRoles = useCallback(async (showLoading = true) => {
        if (!hasPermission('roles_view')) return;

        if (showLoading) setLoading(true);
        try {
            const data = await roleService.getRoles();
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    }, [hasPermission]);

    useEffect(() => {
        if (isAuthenticated && hasPermission('roles_view')) {
            fetchRoles();
            
            const interval = setInterval(() => {
                fetchRoles(false); // Background update
            }, POLLING_INTERVAL);
            
            return () => clearInterval(interval);
        } else {
            setRoles([]);
            setLoading(false);
        }
    }, [isAuthenticated, hasPermission, fetchRoles]);

    const addRole = async (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'isProtected'>) => {
        try {
            await roleService.createRole(roleData);
            await fetchRoles();
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    const updateRole = async (id: number, updatedData: Partial<Role>) => {
        try {
            await roleService.updateRole(id, updatedData);
            await fetchRoles();
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const deleteRole = async (id: number) => {
        try {
            await roleService.deleteRole(id);
            await fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const getRoleById = (id: number) => roles.find(role => role.id === id);

    return (
        <RolesContext.Provider value={{ roles, loading, refreshRoles: fetchRoles, addRole, updateRole, deleteRole, getRoleById }}>
            {children}
        </RolesContext.Provider>
    );
};

export const useRoles = () => {
    const context = useContext(RolesContext);
    if (!context) throw new Error('useRoles must be used within a RolesProvider');
    return context;
};
