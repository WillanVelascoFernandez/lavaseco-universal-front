import React from 'react';
import { Shield, Plus } from 'lucide-react';
import { Button } from '@/views/components/Button';
import { Role } from '../../types/role';
import { RoleCard } from './components/RoleCard';
import { RoleModal } from './components/RoleModal';

interface RolesViewProps {
    roles: Role[];
    loading: boolean;
    addRole: (role: any) => Promise<void>;
    updateRole: (id: number, role: any) => Promise<void>;
    deleteRole: (id: number) => Promise<void>;
}

export const RolesView: React.FC<RolesViewProps> = ({ roles, addRole, updateRole, deleteRole }) => {
    const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenEdit = (role: Role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    const handleSave = async (name: string, permissions: Record<string, boolean>) => {
        if (selectedRole) {
            await updateRole(selectedRole.id, { permissions });
        } else {
            await addRole({ name: name.toUpperCase(), permissions });
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-dark text-white rounded-lg">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Roles y Permisos</h2>
                        <p className="text-sm text-gray-500 italic">Define qué pueden hacer los usuarios en el sistema.</p>
                    </div>
                </div>
                <Button onClick={handleOpenCreate} className="gap-2">
                    <Plus size={18} />
                    Nuevo Rol
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map(role => (
                    <RoleCard
                        key={role.id}
                        role={role}
                        onEdit={handleOpenEdit}
                        onDelete={deleteRole}
                    />
                ))}
            </div>

            <RoleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedRole={selectedRole}
                onSave={handleSave}
            />
        </div>
    );
};
