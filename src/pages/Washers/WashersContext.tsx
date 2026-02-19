import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Washer } from '../../types/machine';
import { washerService } from './WasherService';

interface WashersContextType {
    washers: Washer[];
    loading: boolean;
    refreshWashers: () => Promise<void>;
    toggleWasherStatus: (washerId: string) => Promise<void>;
    updateWasherData: (washerId: string, newData: Partial<Washer>) => void;
}

const WashersContext = createContext<WashersContextType | undefined>(undefined);

export const WashersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [washers, setWashers] = useState<Washer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWashers = async () => {
        setLoading(true);
        try {
            const data = await washerService.getWashers();
            // Adapt backend data to frontend model
            const adaptedWashers = data.map((w: any) => ({
                id: w.id.toString(),
                branchId: w.branchId.toString(),
                status: w.isEnabled ? 'idle' : 'disabled',
                enabled: w.isEnabled,
                usageCount: w._count?.logs || 0,
                revenue: (w._count?.logs || 0) * 15, // Mocking revenue based on count
                lastCycle: { time: '--:--', temp: '0°C', type: 'Ninguno' },
                history: [] // We could fetch logs separately
            }));
            setWashers(adaptedWashers);
        } catch (error) {
            console.error('Error fetching washers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWashers();
    }, []);

    const toggleWasherStatus = async (washerId: string) => {
        try {
            await washerService.toggleWasher(parseInt(washerId));
            await fetchWashers(); // Refresh list after toggle
        } catch (error) {
            console.error('Error toggling washer:', error);
        }
    };

    const updateWasherData = (washerId: string, newData: Partial<Washer>) => {
        setWashers(prev => prev.map(w =>
            w.id === washerId ? { ...w, ...newData } as Washer : w
        ));
    };

    return (
        <WashersContext.Provider value={{ washers, loading, refreshWashers: fetchWashers, toggleWasherStatus, updateWasherData }}>
            {children}
        </WashersContext.Provider>
    );
};

export const useWashers = () => {
    const context = useContext(WashersContext);
    if (!context) {
        throw new Error('useWashers must be used within a WashersProvider');
    }
    return context;
};
