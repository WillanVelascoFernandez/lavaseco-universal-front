import { useHome } from './HomeContext';
import { useBranches } from '../Branches/BranchesContext';

export const useHomeController = () => {
    const { stats: apiStats, loading } = useHome();
    const { branches } = useBranches();

    // Adapt API stats or fallback to calculated ones
    const stats = apiStats ? {
        activeWashers: apiStats.totals.washers, // Assuming API structure
        totalWashers: apiStats.totals.washers,
        activeDryers: apiStats.totals.dryers,
        totalDryers: apiStats.totals.dryers,
        todayRevenue: apiStats.last24Hours.washes * 15 + apiStats.last24Hours.dries * 15, // Mock value
    } : {
        activeWashers: 0,
        totalWashers: 0,
        activeDryers: 0,
        totalDryers: 0,
        todayRevenue: 0,
    };

    const formattedBranches = branches.map(b => ({
        value: b.id,
        label: b.name
    }));

    return {
        stats,
        branches: formattedBranches,
        rawBranches: branches,
        loading
    };
};

