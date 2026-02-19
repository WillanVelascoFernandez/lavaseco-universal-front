import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { branchService } from './BranchService';

import { Branch } from '../../types/branch';

interface BranchesContextType {
    branches: Branch[];
    loading: boolean;
    refreshBranches: () => Promise<void>;
    updateBranchPrices: (branchId: string, washerPrice: number, dryerPrice: number, applyToAll: boolean) => void;
}

const BranchesContext = createContext<BranchesContextType | undefined>(undefined);

export const BranchesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBranches = async () => {
        setLoading(true);
        try {
            const data = await branchService.getBranches();
            // Adapt backend data to frontend model if necessary
            const adaptedBranches = data.map((b: any) => ({
                ...b,
                revenue: b.revenue || 0,
                userCount: b._count?.users || 0,
                washerCount: b._count?.washers || 0,
                dryerCount: b._count?.dryers || 0,
                washerPrice: 15, // Default for now
                dryerPrice: 15  // Default for now
            }));
            setBranches(adaptedBranches);
        } catch (error) {
            console.error('Error fetching branches:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const updateBranchPrices = (branchId: string, washerPrice: number, dryerPrice: number, applyToAll: boolean) => {
        setBranches(prev => prev.map(b => {
            if (applyToAll || b.id.toString() === branchId) {
                return { ...b, washerPrice, dryerPrice };
            }
            return b;
        }));
    };

    return (
        <BranchesContext.Provider value={{ branches, loading, refreshBranches: fetchBranches, updateBranchPrices }}>
            {children}
        </BranchesContext.Provider>
    );
};

export const useBranches = () => {
    const context = useContext(BranchesContext);
    if (!context) {
        throw new Error('useBranches must be used within a BranchesProvider');
    }
    return context;
};
