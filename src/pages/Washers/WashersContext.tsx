import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Washer } from '../../types/machine';
import { washerService } from './WasherService';
import { useLogin } from '../Login/LoginContext';

interface WashersContextType {
    washers: Washer[];
    loading: boolean;
    refreshWashers: () => Promise<void>;
    toggleWasherStatus: (washerId: string) => Promise<void>;
    updateWasherData: (washerId: string, newData: Partial<Washer>) => void;
}

const WashersContext = createContext<WashersContextType | undefined>(undefined);

const POLLING_INTERVAL = 5000; // 5 seconds

export const WashersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [washers, setWashers] = useState<Washer[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useLogin();

    const fetchWashers = useCallback(async (showLoading = true) => {
        if (showLoading) setLoading(true);
        try {
            const data = await washerService.getWashers();
            const adaptedWashers = data.map((w: any) => ({
                id: w.id.toString(),
                name: w.name,
                branchId: w.branchId.toString(),
                status: w.isEnabled ? 'idle' : 'disabled',
                enabled: w.isEnabled,
                usageCount: w._count?.logs || 0,
                revenue: (w._count?.logs || 0) * 15,
                lastCycle: { time: '--:--', temp: '0°C', type: 'Ninguno' },
                history: []
            }));
            setWashers(adaptedWashers);
        } catch (error) {
            console.error('Error fetching washers:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    }, []);

    // Initial fetch and polling
    useEffect(() => {
        if (isAuthenticated) {
            fetchWashers();
            
            const interval = setInterval(() => {
                fetchWashers(false); // Background update without showing loading spinner
            }, POLLING_INTERVAL);
            
            return () => clearInterval(interval);
        } else {
            setWashers([]);
            setLoading(false);
        }
    }, [isAuthenticated, fetchWashers]);

    const toggleWasherStatus = async (washerId: string) => {
        try {
            await washerService.toggleWasher(parseInt(washerId));
            await fetchWashers();
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
