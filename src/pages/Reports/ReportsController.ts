import { useState, useEffect } from 'react';
import { reportService } from './ReportService';

export const useReportsController = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [branchData, setBranchData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, []);

    // Adapt real data to view's expectations or provide real data
    const revenueData = branchData.map(b => ({
        month: b.branchName, // Using branch name instead of months for now
        amount: b.usage.total * 15 // Mocking amount based on usage
    }));

    const distributionData = dashboardData ? [
        { name: 'Lavado', value: dashboardData.last24Hours.washes },
        { name: 'Secado', value: dashboardData.last24Hours.dries },
    ] : [
        { name: 'Lavado', value: 0 },
        { name: 'Secado', value: 0 },
    ];

    const summary = dashboardData ? {
        avgMonthly: dashboardData.totals.washers + dashboardData.totals.dryers, // Mocking summary
        bestMonth: 'En Vivo',
        growth: 0
    } : {
        avgMonthly: 0,
        bestMonth: '---',
        growth: 0
    };

    return {
        revenueData,
        distributionData,
        summary,
        loading
    };
};
