import { useBranches } from '../../models/BranchContext';

export const useSucursalesController = () => {
    const { branches, loading, updateBranchPrices } = useBranches();

    const stats = {
        totalBranches: branches.length,
        totalRevenue: branches.reduce((acc, b) => acc + b.revenue, 0),
        totalUsers: branches.reduce((acc, b) => acc + b.userCount, 0)
    };

    return {
        branches,
        loading,
        stats,
        updateBranchPrices
    };
};
