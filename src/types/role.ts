export interface Permission {
    id: string;
    name: string;
    description: string;
    category: 'Users' | 'Roles' | 'Branches' | 'Washers' | 'Dryers' | 'Reports';
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
    // Users
    { id: 'users_view', name: 'Ver Usuarios', description: 'Permite visualizar la lista de usuarios', category: 'Users' },
    { id: 'users_create', name: 'Crear Usuarios', description: 'Permite registrar nuevos usuarios', category: 'Users' },
    { id: 'users_edit', name: 'Editar Usuarios', description: 'Permite modificar datos de usuarios existentes', category: 'Users' },
    { id: 'users_delete', name: 'Eliminar Usuarios', description: 'Permite dar de baja usuarios del sistema', category: 'Users' },

    // Roles
    { id: 'roles_view', name: 'Ver Roles', description: 'Ver configuración de roles y permisos', category: 'Roles' },
    { id: 'roles_create', name: 'Crear Roles', description: 'Crear nuevos perfiles de acceso', category: 'Roles' },
    { id: 'roles_edit', name: 'Editar Roles', description: 'Modificar permisos de roles existentes', category: 'Roles' },
    { id: 'roles_delete', name: 'Eliminar Roles', description: 'Eliminar roles personalizados', category: 'Roles' },

    // Branches
    { id: 'branches_view', name: 'Ver Sucursales', description: 'Ver lista y detalles de sucursales', category: 'Branches' },
    { id: 'branches_create', name: 'Crear Sucursales', description: 'Registrar nuevas sucursales', category: 'Branches' },
    { id: 'branches_edit', name: 'Editar Sucursales', description: 'Modificar precios y datos de sucursal', category: 'Branches' },
    { id: 'branches_delete', name: 'Eliminar Sucursales', description: 'Eliminar sucursales del sistema', category: 'Branches' },

    // Washers
    { id: 'washers_view', name: 'Ver Lavadoras', description: 'Monitorear estado de lavadoras', category: 'Washers' },
    { id: 'washers_create', name: 'Crear Lavadoras', description: 'Añadir nuevas máquinas lavadoras', category: 'Washers' },
    { id: 'washers_edit', name: 'Editar Lavadoras', description: 'Modificar datos técnicos de lavadoras', category: 'Washers' },
    { id: 'washers_delete', name: 'Eliminar Lavadoras', description: 'Retirar lavadoras del sistema', category: 'Washers' },
    { id: 'washers_toggle', name: 'Habilitar/Deshabilitar', description: 'Controlar disponibilidad de la máquina', category: 'Washers' },

    // Dryers
    { id: 'dryers_view', name: 'Ver Secadoras', description: 'Monitorear estado de secadoras', category: 'Dryers' },
    { id: 'dryers_create', name: 'Crear Secadoras', description: 'Añadir nuevas máquinas secadoras', category: 'Dryers' },
    { id: 'dryers_edit', name: 'Editar Secadoras', description: 'Modificar datos técnicos de secadoras', category: 'Dryers' },
    { id: 'dryers_delete', name: 'Eliminar Secadoras', description: 'Retirar secadoras del sistema', category: 'Dryers' },
    { id: 'dryers_toggle', name: 'Habilitar/Deshabilitar', description: 'Controlar disponibilidad de la máquina', category: 'Dryers' },

    // Reports
    { id: 'reports_view', name: 'Ver Reportes', description: 'Acceso a estadísticas y reportes de recaudación', category: 'Reports' },
];
