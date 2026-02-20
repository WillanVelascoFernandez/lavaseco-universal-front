import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { homeService } from './HomeService';
import { useLogin } from '../Login/LoginContext';

interface HomeContextType {
    stats: any;
    loading: boolean;
    refreshStats: () => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

const POLLING_INTERVAL = 5000; // 5 seconds

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, hasPermission } = useLogin();

    const fetchStats = useCallback(async (showLoading = true) => {
        // Only fetch if authenticated AND has reports_view permission
        if (!hasPermission('reports_view')) return;

        if (showLoading) setLoading(true);
        try {
            const data = await homeService.getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching home stats:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    }, [hasPermission]);

    // Initial fetch and polling
    useEffect(() => {
        if (isAuthenticated && hasPermission('reports_view')) {
            fetchStats();
            
            const interval = setInterval(() => {
                fetchStats(false); // Background update
            }, POLLING_INTERVAL);
            
            return () => clearInterval(interval);
        } else {
            setStats(null);
            setLoading(false);
        }
    }, [isAuthenticated, hasPermission, fetchStats]);

    return (
        <HomeContext.Provider value={{ stats, loading, refreshStats: fetchStats }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHome = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useHome must be used within a HomeProvider');
    }
    return context;
};
