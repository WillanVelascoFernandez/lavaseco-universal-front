import React from 'react';
import { Waves, History } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Badge } from '../../views/components/Badge';
import { Button } from '../../views/components/Button';
import { Washer } from '../../models/WasherContext';

interface LavadorasViewProps {
    lavadoras: Washer[];
    handleToggle: (id: string) => void;
}

export const LavadorasView: React.FC<LavadorasViewProps> = ({ lavadoras, handleToggle }) => {
    const getStatusVariant = (status: string): any => {
        switch (status) {
            case 'en_uso': return 'info';
            case 'en_espera': return 'success';
            case 'deshabilitado': return 'gray';
            default: return 'gray';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-blue text-white rounded-lg">
                        <Waves size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Gestión de Lavadoras</h2>
                        <p className="text-sm text-gray-500 italic">Monitorea y controla el estado de las lavadoras en tiempo real.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Espera</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">En uso</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-400"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Deshabilitado</span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {lavadoras.map(machine => (
                    <Card
                        key={machine.id}
                        className="group transition-all hover:border-brand-blue/30"
                        footer={
                            <div className="flex gap-2">
                                <Button
                                    variant={machine.enabled ? 'danger' : 'success'}
                                    size="sm"
                                    className="flex-1 gap-2"
                                    onClick={() => handleToggle(machine.id)}
                                >
                                    {machine.enabled ? 'Deshabilitar' : 'Habilitar'}
                                </Button>
                                <Button variant="outline" size="sm" className="px-3">
                                    <History size={16} />
                                </Button>
                            </div>
                        }
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <Waves size={20} className="text-brand-blue" />
                                <span className="font-black text-xl text-brand-dark">{machine.id}</span>
                            </div>
                            <Badge variant={getStatusVariant(machine.status)}>
                                {machine.status.replace('_', ' ')}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Sucursal</p>
                                <p className="font-bold text-brand-dark leading-tight capitalize">{machine.branchId.replace('-', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Lavados</p>
                                <p className="font-bold text-brand-dark leading-tight">{machine.usageCount}</p>
                            </div>
                        </div>

                        <div className={`mt-4 p-3 rounded-xl border transition-all duration-300 ${machine.status === 'en_uso'
                            ? 'bg-blue-50 border-blue-100'
                            : 'bg-gray-100/50 border-gray-100 opacity-60'
                            }`}>
                            <p className={`text-[10px] uppercase font-black tracking-widest mb-1 ${machine.status === 'en_uso' ? 'text-blue-400' : 'text-gray-400'
                                }`}>
                                Ciclo Actual
                            </p>
                            <div className="flex justify-between items-center">
                                <span className={`text-sm font-bold ${machine.status === 'en_uso' ? 'text-blue-700' : 'text-gray-500'
                                    }`}>
                                    {machine.status === 'en_uso' ? machine.lastCycle.type : 'Ninguno'}
                                </span>
                                <span className={`text-xs font-medium ${machine.status === 'en_uso' ? 'text-blue-500' : 'text-gray-400'
                                    }`}>
                                    {machine.status === 'en_uso' ? machine.lastCycle.time : '--:--'}
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
