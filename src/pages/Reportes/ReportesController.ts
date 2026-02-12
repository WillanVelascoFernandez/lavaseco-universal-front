export const useReportesController = () => {
    // Mock data for reports
    const revenueData = [
        { month: 'Ene', amount: 12500 },
        { month: 'Feb', amount: 15400 },
        { month: 'Mar', amount: 13200 },
        { month: 'Abr', amount: 17800 },
        { month: 'May', amount: 16900 },
        { month: 'Jun', amount: 21000 },
    ];

    const distributionData = [
        { name: 'Lavado', value: 65 },
        { name: 'Secado', value: 35 },
    ];

    const summary = {
        avgMonthly: 16133,
        bestMonth: 'Junio',
        growth: 12.5
    };

    return {
        revenueData,
        distributionData,
        summary
    };
};
