import { useEffect } from 'react';
import { useRoles } from './RolesContext';

export const useRolesController = () => {
    const { roles, loading, refreshRoles, addRole, updateRole, deleteRole } = useRoles();

    useEffect(() => {
        refreshRoles();
    }, [refreshRoles]);

    return {
        roles,
        loading,
        refreshRoles,
        addRole,
        updateRole,
        deleteRole
    };
};
