import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BaseMachine, HistoryEntry } from '../types/machine';

export type Dryer = BaseMachine;

interface DryerContextType {
    dryers: Dryer[];
    loading: boolean;
    toggleDryerStatus: (dryerId: string) => void;
    updateDryerData: (dryerId: string, newData: Partial<Dryer>) => void;
}

const DryerContext = createContext<DryerContextType | undefined>(undefined);

const sampleHistory: HistoryEntry[] = [
    { id: 'H01', date: '2024-03-20', time: '14:30', cycleType: 'Normal', duration: '45 min', revenue: 15, user: 'Maria G.' },
    { id: 'H02', date: '2024-03-20', time: '12:15', cycleType: 'Pesado', duration: '60 min', revenue: 20, user: 'Juan P.' },
    { id: 'H03', date: '2024-03-19', time: '16:45', cycleType: 'Rápido', duration: '30 min', revenue: 10, user: 'Ana L.' },
    { id: 'H04', date: '2024-03-19', time: '15:20', cycleType: 'Normal', duration: '45 min', revenue: 15, user: 'Carlos M.' },
    { id: 'H05', date: '2024-03-19', time: '11:05', cycleType: 'Media', duration: '40 min', revenue: 12, user: 'Elena R.' },
    { id: 'H06', date: '2024-03-18', time: '18:30', cycleType: 'Alta', duration: '60 min', revenue: 20, user: 'Roberto F.' },
    { id: 'H07', date: '2024-03-18', time: '14:15', cycleType: 'Baja', duration: '30 min', revenue: 10, user: 'Sofia V.' },
    { id: 'H08', date: '2024-03-18', time: '09:50', cycleType: 'Normal', duration: '45 min', revenue: 15, user: 'David K.' },
];

const initialDryers: Dryer[] = [
    { id: 'S01', branchId: 'santos-dumont', status: 'deshabilitado', enabled: false, usageCount: 95, revenue: 1900, lastCycle: { time: '35 min', temp: 'Alta', type: 'Normal' }, history: sampleHistory },
    { id: 'S02', branchId: 'alemana', status: 'en_uso', enabled: true, usageCount: 120, revenue: 2400, lastCycle: { time: '50 min', temp: 'Media', type: 'Normal' }, history: sampleHistory },
    { id: 'S03', branchId: 'hipermaxi-norte', status: 'en_espera', enabled: true, usageCount: 0, revenue: 0, lastCycle: { time: '--:--', temp: 'Baja', type: 'Ninguno' }, history: [] },
];

export const DryerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dryers, setDryers] = useState<Dryer[]>(initialDryers);
    const [loading] = useState(false);

    const toggleDryerStatus = (dryerId: string) => {
        setDryers(prev => prev.map(d =>
            d.id === dryerId ? { ...d, enabled: !d.enabled, status: !d.enabled ? 'en_espera' : 'deshabilitado' } : d
        ));
    };

    const updateDryerData = (dryerId: string, newData: Partial<Dryer>) => {
        setDryers(prev => prev.map(d =>
            d.id === dryerId ? { ...d, ...newData } as Dryer : d
        ));
    };

    return (
        <DryerContext.Provider value={{ dryers, loading, toggleDryerStatus, updateDryerData }}>
            {children}
        </DryerContext.Provider>
    );
};

export const useDryers = () => {
    const context = useContext(DryerContext);
    if (!context) {
        throw new Error('useDryers must be used within a DryerProvider');
    }
    return context;
};
