import { useEffect } from 'react';
import { useBranches } from './BranchesContext';

export const useBranchesController = () => {
    const { branches, loading, updateBranchSettings, refreshBranches } = useBranches();

    useEffect(() => {
        refreshBranches();
    }, [refreshBranches]);

    const stats = {
        totalBranches: branches.length,
        totalRevenue: branches.reduce((acc, b) => acc + (b.revenue || 0), 0),
        totalUsers: branches.reduce((acc, b) => acc + (b.userCount || 0), 0)
    };

    return {
        branches,
        loading,
        stats,
        updateBranchSettings
    };
};
