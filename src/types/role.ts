export interface Permission {
    id: string;
    name: string;
    description: string;
    category: 'Usuarios' | 'Roles' | 'Sucursales' | 'Lavadoras' | 'Secadoras' | 'Reportes';
}

export interface Role {
    id: number;
    name: string;
    permissions: Record<string, boolean>;
    isProtected: boolean;
    _count?: {
        users: number;
    };
    createdAt: string;
    updatedAt: string;
}

export const AVAILABLE_PERMISSIONS: Permission[] = [
    // Usuarios
    { id: 'users_view', name: 'Ver Usuarios', description: 'Permite visualizar la lista de usuarios', category: 'Usuarios' },
    { id: 'users_create', name: 'Crear Usuarios', description: 'Permite registrar nuevos usuarios', category: 'Usuarios' },
    { id: 'users_edit', name: 'Editar Usuarios', description: 'Permite modificar datos de usuarios existentes', category: 'Usuarios' },
    { id: 'users_delete', name: 'Eliminar Usuarios', description: 'Permite dar de baja usuarios del sistema', category: 'Usuarios' },

    // Roles
    { id: 'roles_view', name: 'Ver Roles', description: 'Ver configuración de roles y permisos', category: 'Roles' },
    { id: 'roles_create', name: 'Crear Roles', description: 'Crear nuevos perfiles de acceso', category: 'Roles' },
    { id: 'roles_edit', name: 'Editar Roles', description: 'Modificar permisos de roles existentes', category: 'Roles' },
    { id: 'roles_delete', name: 'Eliminar Roles', description: 'Eliminar roles personalizados', category: 'Roles' },

    // Sucursales
    { id: 'branches_view', name: 'Ver Sucursales', description: 'Ver lista y detalles de sucursales', category: 'Sucursales' },
    { id: 'branches_create', name: 'Crear Sucursales', description: 'Registrar nuevas sucursales', category: 'Sucursales' },
    { id: 'branches_edit', name: 'Editar Sucursales', description: 'Modificar precios y datos de sucursal', category: 'Sucursales' },
    { id: 'branches_delete', name: 'Eliminar Sucursales', description: 'Eliminar sucursales del sistema', category: 'Sucursales' },

    // Lavadoras
    { id: 'washers_view', name: 'Ver Lavadoras', description: 'Monitorear estado de lavadoras', category: 'Lavadoras' },
    { id: 'washers_create', name: 'Crear Lavadoras', description: 'Añadir nuevas máquinas lavadoras', category: 'Lavadoras' },
    { id: 'washers_edit', name: 'Editar Lavadoras', description: 'Modificar datos técnicos de lavadoras', category: 'Lavadoras' },
    { id: 'washers_delete', name: 'Eliminar Lavadoras', description: 'Retirar lavadoras del sistema', category: 'Lavadoras' },
    { id: 'washers_toggle', name: 'Habilitar/Deshabilitar', description: 'Controlar disponibilidad de la máquina', category: 'Lavadoras' },

    // Secadoras
    { id: 'dryers_view', name: 'Ver Secadoras', description: 'Monitorear estado de secadoras', category: 'Secadoras' },
    { id: 'dryers_create', name: 'Crear Secadoras', description: 'Añadir nuevas máquinas secadoras', category: 'Secadoras' },
    { id: 'dryers_edit', name: 'Editar Secadoras', description: 'Modificar datos técnicos de secadoras', category: 'Secadoras' },
    { id: 'dryers_delete', name: 'Eliminar Secadoras', description: 'Retirar secadoras del sistema', category: 'Secadoras' },
    { id: 'dryers_toggle', name: 'Habilitar/Deshabilitar', description: 'Controlar disponibilidad de la máquina', category: 'Secadoras' },

    // Reportes
    { id: 'reports_view', name: 'Ver Reportes', description: 'Acceso a estadísticas y reportes de recaudación', category: 'Reportes' },
];
