import { useWashers } from '../Washers/WashersContext';
import { useDryers } from '../Dryers/DryersContext';
import { useBranches } from '../Branches/BranchesContext';

export const useHomeController = () => {
    const { washers } = useWashers();
    const { dryers } = useDryers();
    const { branches } = useBranches();

    // Stats calculations using separate models
    const stats = {
        activeWashers: washers.filter(w => w.status !== 'disabled').length,
        totalWashers: washers.length,
        activeDryers: dryers.filter(d => d.status !== 'disabled').length,
        totalDryers: dryers.length,
        todayRevenue: washers.reduce((acc, curr) => acc + curr.revenue, 0) +
            dryers.reduce((acc, curr) => acc + curr.revenue, 0),
    };

    const formattedBranches = branches.map(b => ({
        value: b.id,
        label: b.name
    }));

    return {
        stats,
        branches: formattedBranches,
        rawBranches: branches
    };
};
