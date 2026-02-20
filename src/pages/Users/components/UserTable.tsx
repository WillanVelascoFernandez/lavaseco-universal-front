import { Mail, Clock, Edit2, Trash2, MapPin } from 'lucide-react';
import { User } from '../../../types/user';

interface UserTableProps {
    users: User[];
    onEdit?: (user: User) => void;
    onDelete?: (id: number) => void;
}

const getRoleColor = (roleName: string) => {
    if (!roleName) return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' };
    
    // Generate a hash from the string
    let hash = 0;
    for (let i = 0; i < roleName.length; i++) {
        hash = roleName.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to HSL for better visual control (avoid very light colors)
    const h = Math.abs(hash % 360);
    const s = 70; // High saturation for vividness
    const l = 40; // Low lightness for readable text on light backgrounds
    
    return {
        bg: `hsl(${h}, ${s}%, 95%)`,
        text: `hsl(${h}, ${s}%, ${l}%)`,
        border: `hsl(${h}, ${s}%, 90%)`
    };
};

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => (
    <div className="overflow-x-auto -mx-6">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Usuario</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Rol</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Sucursales</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Estado</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Última Actividad</th>
                    {(onEdit || onDelete) && <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-center">Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    const roleColors = getRoleColor(user.role);
                    return (
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
                                <span 
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-widest"
                                    style={{ 
                                        backgroundColor: roleColors.bg, 
                                        color: roleColors.text, 
                                        borderColor: roleColors.border 
                                    }}
                                >
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-50">
                                <div className="flex flex-wrap gap-1 max-w-[200px]">
                                    {user.branches && user.branches.length > 0 ? (
                                        user.branches.map(b => (
                                            <div key={b.id} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-gray-200">
                                                <MapPin size={8} />
                                                {b.name}
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-[10px] text-gray-400 italic">Sin asignar</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-300'}`}></div>
                                    <span className="text-sm font-medium text-gray-600 capitalize">{user.status}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-50 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5 font-medium">
                                    <Clock size={14} className="text-gray-400" />
                                    {user.lastActive}
                                </div>
                            </td>
                            {(onEdit || onDelete) && (
                                <td className="px-6 py-4 border-b border-gray-50 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(user)}
                                                className="p-2 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-all"
                                                title="Editar"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => !user.isProtected && onDelete(user.id)}
                                                disabled={user.isProtected}
                                                className={`p-2 rounded-lg transition-all ${
                                                    user.isProtected 
                                                        ? 'text-gray-200 cursor-not-allowed' 
                                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                                }`}
                                                title={user.isProtected ? "No se puede eliminar un usuario administrador del sistema" : "Eliminar"}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);
