import React from 'react';
import { Waves } from 'lucide-react';
import { Washer } from './WashersContext';
import { WasherCard } from './components/WasherCard';
import { WasherHistoryModal } from './components/WasherHistoryModal';

interface WashersViewProps {
    washers: Washer[];
    handleToggle: (id: string) => void;
}

export const WashersView: React.FC<WashersViewProps> = ({ washers, handleToggle }) => {
    const [selectedMachine, setSelectedMachine] = React.useState<Washer | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

    const openHistory = (machine: Washer) => {
        setSelectedMachine(machine);
        setIsHistoryOpen(true);
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
                <div className="flex gap-6 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">En Espera</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">En uso</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Deshabilitado</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {washers.map(machine => (
                    <WasherCard
                        key={machine.id}
                        machine={machine}
                        onToggle={handleToggle}
                        onOpenHistory={openHistory}
                    />
                ))}
            </div>

            <WasherHistoryModal
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                machine={selectedMachine}
            />
        </div>
    );
};
