import React from 'react';
import { createPortal } from 'react-dom';
import { User2, X, Save, Mail, Shield, Activity, MapPin, Building2 } from 'lucide-react';
import { Button } from '@/views/components/Button';
import { Select } from '@/views/components/FormElements';
import { User } from '../../../types/user';
import { useRoles } from '../../Roles/RolesContext';
import { useBranches } from '../../Branches/BranchesContext';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSave: (userData: any) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const { roles } = useRoles();
    const { branches } = useBranches();
    
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [roleId, setRoleId] = React.useState<number>(0);
    const [status, setStatus] = React.useState<'active' | 'inactive'>('active');
    const [selectedBranches, setSelectedBranches] = React.useState<number[]>([]);
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        if (isOpen) {
            if (user) {
                setName(user.name);
                setEmail(user.email);
                // Find role ID from name or use ID if available
                const currentRole = roles.find(r => r.name === user.role);
                setRoleId(currentRole?.id || 0);
                setStatus(user.status);
                setSelectedBranches(user.branches?.map(b => b.id) || []);
                setPassword('');
            } else {
                setName('');
                setEmail('');
                setRoleId(roles[0]?.id || 0);
                setStatus('active');
                setSelectedBranches([]);
                setPassword('');
            }
        }
    }, [isOpen, user, roles]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userData: any = { 
            name, 
            email, 
            roleId, 
            active: status === 'active',
            branchIds: selectedBranches 
        };
        if (password) userData.password = password;
        
        onSave(userData);
    };

    const toggleBranch = (branchId: number) => {
        setSelectedBranches(prev => 
            prev.includes(branchId) 
                ? prev.filter(id => id !== branchId)
                : [...prev, branchId]
        );
    };

    return createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden transform animate-in zoom-in-95 duration-200 m-4 flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-blue text-white rounded-2xl shadow-lg shadow-brand-blue/20">
                            <User2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-brand-dark tracking-tight">
                                {user ? 'Editar Usuario' : 'Nuevo Usuario'}
                            </h3>
                            <p className="text-sm text-gray-500 font-medium">Gestión de credenciales y acceso.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-gray-200 rounded-full transition-all group">
                        <X size={24} className="text-gray-400 group-hover:text-brand-dark" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block px-1">Nombre Completo</label>
                                <div className="relative">
                                    <User2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nombre del trabajador"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 font-bold text-brand-dark focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block px-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 font-bold text-brand-dark focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block px-1">Contraseña {user && '(Dejar en blanco para no cambiar)'}</label>
                            <input
                                type="password"
                                required={!user}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-brand-dark focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Rol de Acceso"
                                icon={Shield}
                                value={roleId.toString()}
                                onChange={(val) => setRoleId(parseInt(val))}
                                options={roles.map(r => ({ value: r.id.toString(), label: r.name }))}
                            />
                            <Select
                                label="Estado de Cuenta"
                                icon={Activity}
                                value={status}
                                onChange={(val) => setStatus(val as any)}
                                options={[
                                    { value: 'active', label: 'Activo' },
                                    { value: 'inactive', label: 'Inactivo' }
                                ]}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block px-1 flex items-center gap-2">
                                <Building2 size={14} className="text-brand-blue" />
                                Sucursales Asignadas
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-[2rem] border border-gray-100">
                                {branches.map(branch => (
                                    <div 
                                        key={branch.id}
                                        onClick={() => toggleBranch(branch.id)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                            selectedBranches.includes(branch.id)
                                                ? 'bg-white border-brand-blue shadow-md text-brand-blue ring-2 ring-brand-blue/5'
                                                : 'bg-white/50 border-gray-100 text-gray-500 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${selectedBranches.includes(branch.id) ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <MapPin size={14} />
                                        </div>
                                        <span className="text-sm font-bold truncate">{branch.name}</span>
                                        <div className="ml-auto">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                selectedBranches.includes(branch.id)
                                                    ? 'bg-brand-blue border-brand-blue'
                                                    : 'border-gray-200'
                                            }`}>
                                                {selectedBranches.includes(branch.id) && (
                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {branches.length === 0 && (
                                    <p className="col-span-full text-center py-4 text-sm text-gray-400 italic">No hay sucursales registradas.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 py-4 rounded-2xl">
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-[2] py-4 rounded-2xl gap-2 shadow-xl shadow-brand-blue/20">
                            <Save size={20} />
                            {user ? 'Actualizar Usuario' : 'Crear Usuario'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
