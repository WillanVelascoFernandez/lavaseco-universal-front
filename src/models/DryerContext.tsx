import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BaseMachine } from '../types/machine';

export type Dryer = BaseMachine;

interface DryerContextType {
    dryers: Dryer[];
    loading: boolean;
    toggleDryerStatus: (dryerId: string) => void;
    updateDryerData: (dryerId: string, newData: Partial<Dryer>) => void;
}

const DryerContext = createContext<DryerContextType | undefined>(undefined);

const initialDryers: Dryer[] = [
    { id: 'S01', branchId: 'SANTOS DUMONT', status: 'deshabilitado', enabled: false, usageCount: 95, revenue: 1900, lastCycle: { time: '09:00 AM', temp: 'Alta', type: 'Normal' } },
    { id: 'S02', branchId: 'ALEMANIA', status: 'en_uso', enabled: true, usageCount: 120, revenue: 2400, lastCycle: { time: '12:00 PM', temp: 'Media', type: 'Normal' } },
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
