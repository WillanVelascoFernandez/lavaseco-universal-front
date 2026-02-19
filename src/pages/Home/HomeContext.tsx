import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { homeService } from './HomeService';

interface HomeContextType {
    stats: any;
    loading: boolean;
    refreshStats: () => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const data = await homeService.getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching home stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

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
