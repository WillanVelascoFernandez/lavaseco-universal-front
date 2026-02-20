import React from 'react';
import { ShieldAlert, Users, Save, X } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Badge } from '@/views/components/Badge';
import { Button } from '@/views/components/Button';
import { Role } from '../../../types/role';

interface RoleCardProps {
    role: Role;
    onEdit?: (role: Role) => void;
    onDelete?: (id: number) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onEdit, onDelete }) => {
    return (
        <Card
            key={role.id}
            className={`border-t-4 h-[300px] flex flex-col ${role.isProtected ? 'border-t-brand-dark' : 'border-t-blue-500'}`}
            footer={
                <div className="flex gap-2 w-full relative group/tooltip">
                    {onEdit && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1.5"
                            onClick={() => !role.isProtected && onEdit(role)}
                            disabled={role.isProtected}
                        >
                            <Save size={14} />
                            Configurar Permisos
                        </Button>
                    )}
                    {role.isProtected && (
                        <div className="absolute bottom-full left-0 mb-2 w-full opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-brand-dark text-white text-[10px] font-bold py-2 px-3 rounded-xl shadow-xl border border-white/10 text-center">
                                Rol de sistema: Permisos fijos e inalterables
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-brand-dark"></div>
                            </div>
                        </div>
                    )}
                    {onDelete && !role.isProtected && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(role.id)}
                            disabled={role._count && role._count.users > 0}
                        >
                            <X size={14} />
                        </Button>
                    )}
                </div>
            }
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-xl text-brand-dark">{role.name}</h3>
                        {role.isProtected && <ShieldAlert size={16} className="text-orange-500" />}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-wider">
                        <Users size={12} />
                        {role._count?.users || 0} Usuarios asignados
                    </div>
                </div>
                <Badge variant={role.isProtected ? 'gray' : 'info'}>
                    {role.isProtected ? 'Sistema' : 'Personalizado'}
                </Badge>
            </div>

            <div className="space-y-3 py-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resumen de Permisos</p>
                <div className="flex flex-wrap gap-1.5 h-20 overflow-hidden content-start">
                    {Object.entries(role.permissions)
                        .filter(([_, value]) => value)
                        .slice(0, 5)
                        .map(([key]) => (
                            <span key={key} className="px-2 py-0.5 bg-gray-100 text-[9px] font-bold text-gray-600 rounded-md uppercase tracking-tighter">
                                {key.replace('_', ' ')}
                            </span>
                        ))}
                    {Object.values(role.permissions).filter(v => v).length > 5 && (
                        <span className="px-2 py-0.5 bg-brand-dark text-[9px] font-bold text-white rounded-md">
                            +{Object.values(role.permissions).filter(v => v).length - 5} MÁS
                        </span>
                    )}
                    {Object.values(role.permissions).filter(v => v).length === 0 && (
                        <span className="text-xs text-gray-400 italic">Sin permisos asignados</span>
                    )}
                </div>
            </div>
        </Card>
    );
};
