import { Mail, Clock, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/views/components/Badge';
import { User } from '../../../models/UserContext';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => (
    <div className="overflow-x-auto -mx-6">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Usuario</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Rol</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Estado</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Última Actividad</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-center">Acciones</th>
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
                        <td className="px-6 py-4 border-b border-gray-50 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="p-2 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-all"
                                    title="Editar"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    title="Eliminar"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
