import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BaseMachine } from '../types/machine';

export type Washer = BaseMachine;

interface WasherContextType {
    washers: Washer[];
    loading: boolean;
    toggleWasherStatus: (washerId: string) => void;
    updateWasherData: (washerId: string, newData: Partial<Washer>) => void;
}

const WasherContext = createContext<WasherContextType | undefined>(undefined);

const initialWashers: Washer[] = [
    { id: 'L01', branchId: 'ALEMANIA', status: 'en_espera', enabled: true, usageCount: 150, revenue: 3000, lastCycle: { time: '10:30 AM', temp: '40°C', type: 'Delicado' } },
    { id: 'L02', branchId: 'EQUIPETROL', status: 'en_uso', enabled: true, usageCount: 210, revenue: 4200, lastCycle: { time: '11:15 AM', temp: '60°C', type: 'Pesado' } },
    { id: 'L03', branchId: 'PARAGUÁ', status: 'en_espera', enabled: true, usageCount: 180, revenue: 3600, lastCycle: { time: '08:45 AM', temp: '30°C', type: 'Rápido' } },
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
