import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { branchService } from './BranchService';
import { useLogin } from '../Login/LoginContext';
import { Branch } from '../../types/branch';

interface BranchesContextType {
    branches: Branch[];
    loading: boolean;
    refreshBranches: () => Promise<void>;
    updateBranchPrices: (branchId: string, washerPrice: number, dryerPrice: number, applyToAll: boolean) => void;
}

const BranchesContext = createContext<BranchesContextType | undefined>(undefined);

const POLLING_INTERVAL = 5000; // 5 seconds

export const BranchesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, hasPermission } = useLogin();

    const fetchBranches = useCallback(async (showLoading = true) => {
        if (!hasPermission('branches_view')) return;

        if (showLoading) setLoading(true);
        try {
            const data = await branchService.getBranches();
            const adaptedBranches = data.map((b: any) => ({
                ...b,
                revenue: b.revenue || 0,
                userCount: b._count?.users || 0,
                washerCount: b._count?.washers || 0,
                dryerCount: b._count?.dryers || 0,
                washerPrice: 15,
                dryerPrice: 15
            }));
            setBranches(adaptedBranches);
        } catch (error) {
            console.error('Error fetching branches:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    }, [hasPermission]);

    useEffect(() => {
        if (isAuthenticated && hasPermission('branches_view')) {
            fetchBranches();
            
            const interval = setInterval(() => {
                fetchBranches(false); // Background update
            }, POLLING_INTERVAL);
            
            return () => clearInterval(interval);
        } else {
            setBranches([]);
            setLoading(false);
        }
    }, [isAuthenticated, hasPermission, fetchBranches]);

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
