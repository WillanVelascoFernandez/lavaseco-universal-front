import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Branch {
    id: string;
    name: string;
    address: string;
    revenue: number;
    userCount: number;
}

interface BranchContextType {
    branches: Branch[];
    loading: boolean;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

const initialBranches: Branch[] = [
    { id: 'ALEMANIA', name: 'LAUNDRYMAT ALEMANIA', address: 'Av. Alemania', revenue: 5400, userCount: 45 },
    { id: 'EQUIPETROL', name: 'LAUNDRYMAT EQUIPETROL', address: 'Bario Equipetrol', revenue: 4200, userCount: 60 },
    { id: 'SANTOS DUMONT', name: 'LAUNDRYMAT SANTOS DUMONT', address: 'Av. Santos Dumont', revenue: 1900, userCount: 30 },
    { id: 'PARAGUÁ', name: 'LAUNDRYMAT PARAGUÁ', address: 'Av. Paraguá', revenue: 3600, userCount: 25 },
];

export const BranchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [branches] = useState<Branch[]>(initialBranches);
    const [loading] = useState(false);

    return (
        <BranchContext.Provider value={{ branches, loading }}>
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
