import { useReports } from './ReportsContext';

export const useReportsController = () => {
    const { loading, dashboardData, branchData } = useReports();

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
