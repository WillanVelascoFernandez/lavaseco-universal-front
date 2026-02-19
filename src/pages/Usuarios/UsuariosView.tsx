import React from 'react';
import { Users } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { User } from '../../models/UserContext';
import { UserStats } from './components/UserStats';
import { UserTable } from './components/UserTable';

interface UsuariosViewProps {
    users: User[];
    loading: boolean;
    stats: {
        totalUsers: number;
        activeUsers: number;
        admins: number;
    };
}

export const UsuariosView: React.FC<UsuariosViewProps> = ({ users, stats }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-blue text-white rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Gestión de Usuarios</h2>
                        <p className="text-sm text-gray-500 italic">Control de accesos y roles del personal administrativo y operativo.</p>
                    </div>
                </div>
            </div>

            <UserStats stats={stats} />

            <Card overflowVisible>
                <UserTable users={users} />
            </Card>
        </div>
    );
};
