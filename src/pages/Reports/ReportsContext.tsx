import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { reportService } from './ReportService';
import { useLogin } from '../Login/LoginContext';

interface ReportsContextType {
    loading: boolean;
    dashboardData: any;
    branchData: any[];
    refreshReports: () => Promise<void>;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

const POLLING_INTERVAL = 5000; // 5 seconds

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [branchData, setBranchData] = useState<any[]>([]);
    const { isAuthenticated, hasPermission } = useLogin();

    const fetchReports = useCallback(async (showLoading = true) => {
        // Only fetch if has reports_view permission
        if (!hasPermission('reports_view')) return;

        if (showLoading) setLoading(true);
        try {
            const [dash, branches] = await Promise.all([
                reportService.getDashboardStats(),
                reportService.getBranchReports()
            ]);
            setDashboardData(dash);
            setBranchData(branches);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    }, [hasPermission]);

    useEffect(() => {
        if (isAuthenticated && hasPermission('reports_view')) {
            fetchReports();
            
            const interval = setInterval(() => {
                fetchReports(false); // Background update
            }, POLLING_INTERVAL);
            
            return () => clearInterval(interval);
        } else {
            setDashboardData(null);
            setBranchData([]);
            setLoading(false);
        }
    }, [isAuthenticated, hasPermission, fetchReports]);

    return (
        <ReportsContext.Provider value={{ loading, dashboardData, branchData, refreshReports: fetchReports }}>
            {children}
        </ReportsContext.Provider>
    );
};

export const useReports = () => {
    const context = useContext(ReportsContext);
    if (!context) {
        throw new Error('useReports must be used within a ReportsProvider');
    }
    return context;
};
