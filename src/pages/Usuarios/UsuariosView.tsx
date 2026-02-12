import React from 'react';
import { Users, Shield, UserCheck, Mail, Clock } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Badge } from '@/views/components/Badge';
import { User } from '../../models/UserContext';

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

            <Card overflowVisible>
                <div className="overflow-x-auto -mx-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Usuario</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Rol</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Estado</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Última Actividad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 border-b border-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center font-bold text-brand-blue uppercase">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-brand-dark leading-tight">{user.name}</p>
                                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                    <Mail size={12} /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-50">
                                        <Badge variant={user.role === 'admin' ? 'info' : 'gray'}>
                                            <span className="capitalize">{user.role}</span>
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'activo' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-300'}`}></div>
                                            <span className="text-sm font-medium text-gray-600 capitalize">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-50 text-sm text-gray-500">
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <Clock size={14} className="text-gray-400" />
                                            {user.lastActive}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
