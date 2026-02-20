import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Dryer } from '../../types/machine';
import { dryerService } from './DryerService';
import { useLogin } from '../Login/LoginContext';

interface DryersContextType {
    dryers: Dryer[];
    loading: boolean;
    refreshDryers: () => Promise<void>;
    toggleDryerStatus: (dryerId: string) => Promise<void>;
    updateDryerData: (dryerId: string, newData: Partial<Dryer>) => void;
}

const DryersContext = createContext<DryersContextType | undefined>(undefined);

const POLLING_INTERVAL = 5000; // 5 seconds

export const DryersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dryers, setDryers] = useState<Dryer[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useLogin();

    const fetchDryers = useCallback(async (showLoading = true) => {
        if (showLoading) setLoading(true);
        try {
            const data = await dryerService.getDryers();
            const adaptedDryers = data.map((d: any) => ({
                id: d.id.toString(),
                name: d.name,
                branchId: d.branchId.toString(),
                status: d.isEnabled ? 'idle' : 'disabled',
                enabled: d.isEnabled,
                usageCount: d._count?.logs || 0,
                revenue: (d._count?.logs || 0) * 15,
                lastCycle: { time: '--:--', temp: 'Media', type: 'Ninguno' },
                history: []
            }));
            setDryers(adaptedDryers);
        } catch (error) {
            console.error('Error fetching dryers:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    }, []);

    // Initial fetch and polling
    useEffect(() => {
        if (isAuthenticated) {
            fetchDryers();
            
            const interval = setInterval(() => {
                fetchDryers(false); // Background update
            }, POLLING_INTERVAL);
            
            return () => clearInterval(interval);
        } else {
            setDryers([]);
            setLoading(false);
        }
    }, [isAuthenticated, fetchDryers]);

    const toggleDryerStatus = async (dryerId: string) => {
        try {
            await dryerService.toggleDryer(parseInt(dryerId));
            await fetchDryers();
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
