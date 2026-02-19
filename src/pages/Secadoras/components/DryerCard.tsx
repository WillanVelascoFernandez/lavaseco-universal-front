import React from 'react';
import { Wind, History } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Badge } from '@/views/components/Badge';
import { Button } from '@/views/components/Button';
import { Dryer } from '../../../models/DryerContext';

interface DryerCardProps {
    machine: Dryer;
    onToggle: (id: string) => void;
    onOpenHistory: (machine: Dryer) => void;
}

export const DryerCard: React.FC<DryerCardProps> = ({ machine, onToggle, onOpenHistory }) => {
    const getStatusVariant = (status: string): any => {
        switch (status) {
            case 'en_uso': return 'info';
            case 'en_espera': return 'success';
            case 'deshabilitado': return 'gray';
            default: return 'gray';
        }
    };

    return (
        <Card
            className="group transition-all hover:border-brand-accent/30"
            footer={
                <div className="flex gap-2">
                    <Button
                        variant={machine.enabled ? 'danger' : 'success'}
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => onToggle(machine.id)}
                    >
                        {machine.enabled ? 'Deshabilitar' : 'Habilitar'}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                        onClick={() => onOpenHistory(machine)}
                    >
                        <History size={16} />
                    </Button>
                </div>
            }
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Wind size={20} className="text-brand-accent" />
                    <span className="font-black text-xl text-brand-dark">{machine.id}</span>
                </div>
                <Badge variant={getStatusVariant(machine.status)}>
                    {machine.status.replace('_', ' ')}
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2 h-24 items-start">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Sucursal</p>
                    <p className="font-bold text-brand-dark leading-tight capitalize">{machine.branchId.replace('-', ' ')}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Secados</p>
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
    );
};
