import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BaseMachine } from '../../types/machine';
import { dryerService } from './DryerService';

export type Dryer = BaseMachine;

interface DryersContextType {
    dryers: Dryer[];
    loading: boolean;
    refreshDryers: () => Promise<void>;
    toggleDryerStatus: (dryerId: string) => Promise<void>;
    updateDryerData: (dryerId: string, newData: Partial<Dryer>) => void;
}

const DryersContext = createContext<DryersContextType | undefined>(undefined);

export const DryersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dryers, setDryers] = useState<Dryer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDryers = async () => {
        setLoading(true);
        try {
            const data = await dryerService.getDryers();
            // Adapt backend data to frontend model
            const adaptedDryers = data.map((d: any) => ({
                id: d.id.toString(),
                branchId: d.branchId.toString(),
                status: d.isEnabled ? 'idle' : 'disabled',
                enabled: d.isEnabled,
                usageCount: d._count?.logs || 0,
                revenue: (d._count?.logs || 0) * 15, // Mocking revenue based on count
                lastCycle: { time: '--:--', temp: 'Media', type: 'Ninguno' },
                history: [] // We could fetch logs separately
            }));
            setDryers(adaptedDryers);
        } catch (error) {
            console.error('Error fetching dryers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDryers();
    }, []);

    const toggleDryerStatus = async (dryerId: string) => {
        try {
            await dryerService.toggleDryer(parseInt(dryerId));
            await fetchDryers(); // Refresh list after toggle
        } catch (error) {
            console.error('Error toggling dryer:', error);
        }
    };

    const updateDryerData = (dryerId: string, newData: Partial<Dryer>) => {
        setDryers(prev => prev.map(d =>
            d.id === dryerId ? { ...d, ...newData } as Dryer : d
        ));
    };

    return (
        <DryersContext.Provider value={{ dryers, loading, refreshDryers: fetchDryers, toggleDryerStatus, updateDryerData }}>
            {children}
        </DryersContext.Provider>
    );
};

export const useDryers = () => {
    const context = useContext(DryersContext);
    if (!context) {
        throw new Error('useDryers must be used within a DryersProvider');
    }
    return context;
};
