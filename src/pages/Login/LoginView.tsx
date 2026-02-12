import React, { useMemo } from 'react';
import { LogIn, Mail, Lock, Building2, Waves, Wind, Shirt, Droplets, Sparkles } from 'lucide-react';
import { Input } from '@/views/components/FormElements';
import { Button } from '@/views/components/Button';

interface LoginViewProps {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    loading: boolean;
    error: string;
    handleSubmit: (e: React.FormEvent) => void;
}

const BackgroundIcons = () => {
    const icons = [Waves, Wind, Shirt, Droplets, Sparkles];

    const staticIcons = useMemo(() => {
        const columns = 12;
        const rows = 10;
        const items = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                // Posición base en la cuadrícula + un "jitter" aleatorio
                // para que no parezca una cuadrícula perfecta, pero sin solaparse
                const top = (r * (100 / rows)) + (Math.random() * 5);
                const left = (c * (100 / columns)) + (Math.random() * 5);

                items.push({
                    id: `${r}-${c}`,
                    Icon: icons[(r + c) % icons.length],
                    top: `${top}%`,
                    left: `${left}%`,
                    rotate: `${Math.random() * 360}deg`,
                    size: Math.floor(Math.random() * (35 - 20 + 1) + 20),
                    delay: `${Math.random() * 5}s`,
                    opacity: Math.random() * (0.10 - 0.05) + 0.05
                });
            }
        }
        return items;
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-brand-blue">
            {staticIcons.map((item) => (
                <div
                    key={item.id}
                    className="absolute animate-pulse"
                    style={{
                        top: item.top,
                        left: item.left,
                        transform: `rotate(${item.rotate})`,
                        opacity: item.opacity,
                        animationDelay: item.delay
                    }}
                >
                    <item.Icon size={item.size} />
                </div>
            ))}
        </div>
    );
};

export const LoginView: React.FC<LoginViewProps> = ({
    email, setEmail, password, setPassword, loading, error, handleSubmit
}) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
            <BackgroundIcons />
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="bg-brand-blue p-8 text-center relative overflow-hidden">
                        {/* Decorative background circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl"></div>

                        <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20">
                            <Building2 className="text-white" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Lavaseco Universal</h1>
                        <p className="text-blue-100 text-sm mt-1">IoT Dashboard Management</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Input
                                        label="Correo Electrónico"
                                        type="email"
                                        placeholder="ejemplo@lavaseco.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Mail className="absolute right-3 bottom-3 text-gray-300" size={18} />
                                </div>
                                <div className="relative">
                                    <Input
                                        label="Contraseña"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Lock className="absolute right-3 bottom-3 text-gray-300" size={18} />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                                    <p className="text-xs text-red-600 font-bold text-center">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full h-12 rounded-xl text-md font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                isLoading={loading}
                            >
                                <LogIn className="mr-2" size={18} />
                                Iniciar Sesión
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-400 font-medium italic">
                                Sistema de Monitoreo de Lavanderías Ver. 2.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
