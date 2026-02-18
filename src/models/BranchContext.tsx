import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Branch {
    id: string;
    name: string;
    address: string;
    revenue: number;
    userCount: number;
    washerPrice: number;
    dryerPrice: number;
    washerCount: number;
    dryerCount: number;
    totalWashes: number;
    totalDries: number;
}

interface BranchContextType {
    branches: Branch[];
    loading: boolean;
    updateBranchPrices: (branchId: string, washerPrice: number, dryerPrice: number, applyToAll: boolean) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

const initialBranches: Branch[] = [
    { id: 'alemana', name: 'Laundrymat Alemana', address: 'Av. Alemania', revenue: 5400, userCount: 45, washerPrice: 15, dryerPrice: 15, washerCount: 12, dryerCount: 10, totalWashes: 1540, totalDries: 1200 },
    { id: 'equipetrol', name: 'Laundrymat Equipetrol', address: 'Barrio Equipetrol', revenue: 4200, userCount: 60, washerPrice: 18, dryerPrice: 18, washerCount: 10, dryerCount: 8, totalWashes: 2100, totalDries: 1800 },
    { id: 'santos-dumont', name: 'Laundrymat Santos Dumont', address: 'Av. Santos Dumont', revenue: 1900, userCount: 30, washerPrice: 15, dryerPrice: 15, washerCount: 8, dryerCount: 8, totalWashes: 950, totalDries: 880 },
    { id: 'paragua', name: 'Laundrymat Paraguá', address: 'Av. Paraguá', revenue: 3600, userCount: 25, washerPrice: 15, dryerPrice: 15, washerCount: 8, dryerCount: 6, totalWashes: 1200, totalDries: 950 },
    { id: 'hipermaxi-norte', name: 'Laundrymat Hipermaxi Norte', address: 'Av. Banzer km 4', revenue: 0, userCount: 0, washerPrice: 20, dryerPrice: 20, washerCount: 15, dryerCount: 12, totalWashes: 0, totalDries: 0 },
];

export const BranchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [branches, setBranches] = useState<Branch[]>(initialBranches);
    const [loading] = useState(false);

    const updateBranchPrices = (branchId: string, washerPrice: number, dryerPrice: number, applyToAll: boolean) => {
        setBranches(prev => prev.map(b => {
            if (applyToAll || b.id === branchId) {
                return { ...b, washerPrice, dryerPrice };
            }
            return b;
        }));
    };

    return (
        <BranchContext.Provider value={{ branches, loading, updateBranchPrices }}>
            {children}
        </BranchContext.Provider>
    );
};

export const useBranches = () => {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error('useBranches must be used within a BranchProvider');
    }
    return context;
};
