import React from 'react';
import { Wind } from 'lucide-react';
import { Dryer } from '../../models/DryerContext';
import { DryerCard } from './components/DryerCard';
import { DryerHistoryModal } from './components/DryerHistoryModal';

interface SecadorasViewProps {
    secadoras: Dryer[];
    handleToggle: (id: string) => void;
}

export const SecadorasView: React.FC<SecadorasViewProps> = ({ secadoras, handleToggle }) => {
    const [selectedMachine, setSelectedMachine] = React.useState<Dryer | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

    const openHistory = (machine: Dryer) => {
        setSelectedMachine(machine);
        setIsHistoryOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-accent text-white rounded-lg">
                        <Wind size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Gestión de Secadoras</h2>
                        <p className="text-sm text-gray-500 italic">Administra el secado y monitorea tiempos de ciclo remotos.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Espera</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">En uso</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-400"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Deshabilitado</span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {secadoras.map(machine => (
                    <DryerCard
                        key={machine.id}
                        machine={machine}
                        onToggle={handleToggle}
                        onOpenHistory={openHistory}
                    />
                ))}
            </div>

            <DryerHistoryModal
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                machine={selectedMachine}
            />
        </div>
    );
};
