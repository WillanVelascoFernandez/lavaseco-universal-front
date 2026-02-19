import { useRoles } from './RolesContext';

export const useRolesController = () => {
    const { roles, loading, refreshRoles, addRole, updateRole, deleteRole } = useRoles();

    return {
        roles,
        loading,
        refreshRoles,
        addRole,
        updateRole,
        deleteRole
    };
};
