import React, { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Button } from '@/views/components/Button';
import { User, useUsers } from '../../models/UserContext';
import { UserStats } from './components/UserStats';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';

interface UsuariosViewProps {
    users: User[];
    loading: boolean;
    stats: {
        totalUsers: number;
        activeUsers: number;
        admins: number;
    };
}

export const UsuariosView: React.FC<UsuariosViewProps> = ({ stats }) => {
    const { users, addUser, updateUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleAddClick = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = (userData: Omit<User, 'id' | 'lastActive'>) => {
        if (selectedUser) {
            updateUser(selectedUser.id, userData);
        } else {
            addUser(userData);
        }
    };

    const handleDeleteUser = (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            deleteUser(id);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-blue text-white rounded-lg shadow-lg shadow-brand-blue/20">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Gestión de Usuarios</h2>
                        <p className="text-sm text-gray-500 italic">Administración de cuentas, permisos y niveles de acceso del personal.</p>
                    </div>
                </div>
                <Button onClick={handleAddClick} className="gap-2 px-6 rounded-2xl shadow-xl shadow-brand-blue/10">
                    <UserPlus size={20} />
                    Agregar Usuario
                </Button>
            </div>

            <UserStats stats={stats} />

            <Card overflowVisible className="border-none shadow-xl shadow-gray-200/50 rounded-[2rem]">
                <UserTable
                    users={users}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteUser}
                />
            </Card>

            <UserModal
                isOpen={isModalOpen}
                user={selectedUser}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
            />
        </div>
    );
};
