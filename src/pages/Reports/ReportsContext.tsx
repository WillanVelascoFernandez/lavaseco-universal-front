import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { reportService } from './ReportService';

interface ReportsContextType {
    loading: boolean;
    dashboardData: any;
    branchData: any[];
    refreshReports: () => Promise<void>;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [branchData, setBranchData] = useState<any[]>([]);

    const fetchReports = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

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
