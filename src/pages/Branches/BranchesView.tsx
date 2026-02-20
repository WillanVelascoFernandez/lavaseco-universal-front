import React from 'react';
import { Building2 } from 'lucide-react';
import { Branch } from '../../types/branch';
import { useBranches } from './BranchesContext';
import { BranchCard } from './components/BranchCard';
import { BranchModal } from './components/BranchModal';
import { useLogin } from '../Login/LoginContext';

interface BranchesViewProps {
    branches: Branch[];
    loading: boolean;
    stats: {
        totalBranches: number;
        totalRevenue: number;
        totalUsers: number;
    };
    updateBranchSettings: (branchId: string, washerPrice: number, dryerPrice: number, washerTime: number, dryerTime: number, applyToAll: boolean) => void;
}

export const BranchesView: React.FC<BranchesViewProps> = ({ branches, updateBranchSettings }) => {
    const { hasPermission } = useLogin();
    const [selectedBranch, setSelectedBranch] = React.useState<Branch | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openPriceModal = (branch: Branch) => {
        setSelectedBranch(branch);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-blue text-white rounded-lg">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Sucursales</h2>
                        <p className="text-sm text-gray-500 italic">Administra y monitorea el rendimiento de cada punto de venta.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {branches.map(branch => (
                    <BranchCard
                        key={branch.id}
                        branch={branch}
                        onOpenSettings={hasPermission('branches_edit') ? openPriceModal : undefined}
                    />
                ))}
            </div>

            <BranchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                branch={selectedBranch}
                onUpdateSettings={updateBranchSettings}
            />
        </div>
    );
};
