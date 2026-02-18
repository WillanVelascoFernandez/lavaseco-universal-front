import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BaseMachine, HistoryEntry } from '../types/machine';

export type Washer = BaseMachine;

interface WasherContextType {
    washers: Washer[];
    loading: boolean;
    toggleWasherStatus: (washerId: string) => void;
    updateWasherData: (washerId: string, newData: Partial<Washer>) => void;
}

const WasherContext = createContext<WasherContextType | undefined>(undefined);

const sampleHistory: HistoryEntry[] = [
    { id: 'H01', date: '2024-03-20', time: '14:30', cycleType: 'Normal', duration: '45 min', revenue: 15, user: 'Maria G.' },
    { id: 'H02', date: '2024-03-20', time: '12:15', cycleType: 'Pesado', duration: '60 min', revenue: 20, user: 'Juan P.' },
    { id: 'H03', date: '2024-03-19', time: '16:45', cycleType: 'Rápido', duration: '30 min', revenue: 10, user: 'Ana L.' },
    { id: 'H04', date: '2024-03-19', time: '15:20', cycleType: 'Normal', duration: '45 min', revenue: 15, user: 'Carlos M.' },
    { id: 'H05', date: '2024-03-19', time: '11:05', cycleType: 'Delicado', duration: '40 min', revenue: 12, user: 'Elena R.' },
    { id: 'H06', date: '2024-03-18', time: '18:30', cycleType: 'Pesado', duration: '60 min', revenue: 20, user: 'Roberto F.' },
    { id: 'H07', date: '2024-03-18', time: '14:15', cycleType: 'Rápido', duration: '30 min', revenue: 10, user: 'Sofia V.' },
    { id: 'H08', date: '2024-03-18', time: '09:50', cycleType: 'Normal', duration: '45 min', revenue: 15, user: 'David K.' },
];

const initialWashers: Washer[] = [
    { id: 'L01', branchId: 'alemana', status: 'en_espera', enabled: true, usageCount: 150, revenue: 3000, lastCycle: { time: '45 min', temp: '40°C', type: 'Delicado' }, history: sampleHistory },
    { id: 'L02', branchId: 'equipetrol', status: 'en_uso', enabled: true, usageCount: 210, revenue: 4200, lastCycle: { time: '30 min', temp: '60°C', type: 'Pesado' }, history: sampleHistory },
    { id: 'L03', branchId: 'paragua', status: 'en_espera', enabled: true, usageCount: 180, revenue: 3600, lastCycle: { time: '20 min', temp: '30°C', type: 'Rápido' }, history: sampleHistory },
    { id: 'L04', branchId: 'hipermaxi-norte', status: 'en_espera', enabled: true, usageCount: 0, revenue: 0, lastCycle: { time: '--:--', temp: '0°C', type: 'Ninguno' }, history: [] },
];

export const WasherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [washers, setWashers] = useState<Washer[]>(initialWashers);
    const [loading] = useState(false);

    const toggleWasherStatus = (washerId: string) => {
        setWashers(prev => prev.map(w =>
            w.id === washerId ? { ...w, enabled: !w.enabled, status: !w.enabled ? 'en_espera' : 'deshabilitado' } : w
        ));
    };

    const updateWasherData = (washerId: string, newData: Partial<Washer>) => {
        setWashers(prev => prev.map(w =>
            w.id === washerId ? { ...w, ...newData } as Washer : w
        ));
    };

    return (
        <WasherContext.Provider value={{ washers, loading, toggleWasherStatus, updateWasherData }}>
            {children}
        </WasherContext.Provider>
    );
};

export const useWashers = () => {
    const context = useContext(WasherContext);
    if (!context) {
        throw new Error('useWashers must be used within a WasherProvider');
    }
    return context;
};
