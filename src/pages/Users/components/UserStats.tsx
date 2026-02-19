import React from 'react';
import { Users, UserCheck, Shield } from 'lucide-react';
import { Card } from '@/views/components/Card';

interface UserStatsProps {
    stats: {
        totalUsers: number;
        activeUsers: number;
        admins: number;
    };
}

export const UserStats: React.FC<UserStatsProps> = ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card noPadding className="p-5">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                    <Users size={24} />
                </div>
                <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Registrados</p>
                    <h3 className="text-2xl font-bold text-brand-dark">{stats.totalUsers}</h3>
                </div>
            </div>
        </Card>
        <Card noPadding className="p-5">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-xl text-green-600">
                    <UserCheck size={24} />
                </div>
                <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Activos Ahora</p>
                    <h3 className="text-2xl font-bold text-brand-dark">{stats.activeUsers}</h3>
                </div>
            </div>
        </Card>
        <Card noPadding className="p-5">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                    <Shield size={24} />
                </div>
                <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Administradores</p>
                    <h3 className="text-2xl font-bold text-brand-dark">{stats.admins}</h3>
                </div>
            </div>
        </Card>
    </div>
);
