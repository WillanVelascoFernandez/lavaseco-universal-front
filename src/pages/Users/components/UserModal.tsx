import React from 'react';
import { createPortal } from 'react-dom';
import { User2, X, Save, Mail, Shield, Activity } from 'lucide-react';
import { Button } from '@/views/components/Button';
import { Select } from '@/views/components/FormElements';
import { User } from '../UsersContext';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSave: (userData: any) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState<string>('operador');
    const [status, setStatus] = React.useState<'active' | 'inactive'>('active');

    React.useEffect(() => {
        if (isOpen) {
            if (user) {
                setName(user.name);
                setEmail(user.email);
                setRole(user.role);
                setStatus(user.status);
            } else {
                setName('');
                setEmail('');
                setRole('operador');
                setStatus('active');
            }
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, email, role, status });
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200 m-4 flex flex-col max-h-[90vh]">
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

                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Rol de Acceso"
                                icon={Shield}
                                value={role}
                                onChange={(val) => setRole(val as any)}
                                options={[
                                    { value: 'admin', label: 'Administrador' },
                                    { value: 'operador', label: 'Operador' },
                                    { value: 'tecnico', label: 'Técnico' }
                                ]}
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
