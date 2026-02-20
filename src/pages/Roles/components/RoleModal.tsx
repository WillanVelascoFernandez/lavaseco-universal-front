import React from 'react';
import { createPortal } from 'react-dom';
import { Shield, X, Check, Save } from 'lucide-react';
import { Button } from '@/views/components/Button';
import { AVAILABLE_PERMISSIONS, Role, Permission } from '../../../types/role';

interface RoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedRole: Role | null;
    onSave: (name: string, permissions: Record<string, boolean>) => Promise<void>;
}

export const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, selectedRole, onSave }) => {
    const [newRoleName, setNewRoleName] = React.useState('');
    const [editedPermissions, setEditedPermissions] = React.useState<Record<string, boolean>>({});

    const lastLoadedRoleId = React.useRef<number | null | 'new'>(null);

    React.useEffect(() => {
        if (!isOpen) {
            lastLoadedRoleId.current = null;
            return;
        }

        const currentId = selectedRole ? selectedRole.id : 'new';

        // Solo cargar si el modal se abre por primera vez o si cambiamos de rol
        if (lastLoadedRoleId.current !== currentId) {
            if (selectedRole) {
                setEditedPermissions(selectedRole.permissions);
                setNewRoleName(selectedRole.name);
            } else {
                setNewRoleName('');
                const defaultPermissions: Record<string, boolean> = {};
                AVAILABLE_PERMISSIONS.forEach(p => defaultPermissions[p.id] = false);
                setEditedPermissions(defaultPermissions);
            }
            lastLoadedRoleId.current = currentId;
        }
    }, [isOpen, selectedRole]);

    if (!isOpen) return null;

    const handleTogglePermission = (id: string) => {
        setEditedPermissions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleSave = async () => {
        await onSave(selectedRole ? selectedRole.name : newRoleName, editedPermissions);
        onClose();
    };

    const permissionsByCategory = AVAILABLE_PERMISSIONS.reduce((acc, p) => {
        if (!acc[p.category]) acc[p.category] = [];
        acc[p.category].push(p);
        return acc;
    }, {} as Record<string, Permission[]>);

    return createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden transform animate-in zoom-in-95 duration-200 m-4 flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-dark text-white rounded-2xl">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-brand-dark tracking-tight">
                                {selectedRole ? `Configurar permisos: ${selectedRole.name}` : 'Crear Nuevo Rol'}
                            </h3>
                            <p className="text-sm text-gray-500 font-medium">Asigna privilegios específicos para este perfil.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-gray-200 rounded-full transition-all group">
                        <X size={24} className="text-gray-400 group-hover:text-brand-dark" />
                    </button>
                </div>

                {!selectedRole && (
                    <div className="px-8 pt-6 pb-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Nombre del Rol</label>
                        <input
                            type="text"
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                            placeholder="Ej: AUDITOR, GERENTE"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-brand-dark focus:ring-4 focus:ring-brand-dark/5 focus:border-brand-dark outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>
                )}

                <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(permissionsByCategory).map(([category, perms]) => (
                            <div key={category} className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                                    <div className="w-1.5 h-6 bg-brand-dark rounded-full"></div>
                                    <h4 className="font-black text-brand-dark uppercase tracking-widest text-xs">{category}</h4>
                                </div>
                                <div className="space-y-2">
                                    {perms.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => handleTogglePermission(p.id)}
                                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${editedPermissions[p.id]
                                                ? 'bg-brand-dark text-white border-brand-dark shadow-lg shadow-brand-dark/20'
                                                : 'bg-gray-50/50 border-gray-100 hover:border-brand-dark/30'
                                                }`}
                                        >
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-bold ${editedPermissions[p.id] ? 'text-white' : 'text-brand-dark'}`}>
                                                    {p.name}
                                                </span>
                                                <span className={`text-[10px] ${editedPermissions[p.id] ? 'text-white/70' : 'text-gray-400 font-medium'}`}>
                                                    {p.description}
                                                </span>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${editedPermissions[p.id] ? 'bg-white text-brand-dark shadow-inner' : 'bg-gray-200 text-transparent'}`}>
                                                <Check size={14} className="stroke-[4px]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
                    <Button variant="outline" onClick={onClose} className="flex-1 py-4 rounded-2xl">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="flex-[2] py-4 rounded-2xl gap-2 shadow-xl shadow-brand-dark/20"
                        disabled={!selectedRole && !newRoleName}
                    >
                        <Save size={20} />
                        {selectedRole ? 'Actualizar Cambios' : 'Guardar Nuevo Rol'}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
};
