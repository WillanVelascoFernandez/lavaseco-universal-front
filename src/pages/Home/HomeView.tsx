import React from 'react';
import { Waves, Wind, CreditCard, Building2 } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Branch } from '../../types/branch';
import { Select } from '../../views/components/FormElements';
import { StatCard } from './components/StatCard';
import { UsageChart } from './components/UsageChart';
import { RevenueChart } from './components/RevenueChart';

const chartData = [
    { name: 'Lun', usage: 45, revenue: 1200 },
    { name: 'Mar', usage: 52, revenue: 1400 },
    { name: 'Mie', usage: 48, revenue: 1300 },
    { name: 'Jue', usage: 61, revenue: 1700 },
    { name: 'Vie', usage: 55, revenue: 1600 },
    { name: 'Sab', usage: 67, revenue: 1900 },
    { name: 'Dom', usage: 72, revenue: 2100 },
];

interface HomeViewProps {
    stats: {
        activeWashers: number;
        totalWashers: number;
        activeDryers: number;
        totalDryers: number;
        todayRevenue: number;
    };
    branches: { value: string; label: string }[];
    rawBranches: Branch[];
}

export const HomeView: React.FC<HomeViewProps> = ({ stats, branches }) => {
    const [selectedBranch, setSelectedBranch] = React.useState('all');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Lavadoras Activas"
                    value={`${stats.activeWashers}/${stats.totalWashers}`}
                    icon={Waves}
                    color="bg-brand-blue"
                    trend={8}
                />
                <StatCard
                    title="Secadoras Activas"
                    value={`${stats.activeDryers}/${stats.totalDryers}`}
                    icon={Wind}
                    color="bg-brand-accent"
                    trend={12}
                />
                <StatCard
                    title="Recaudación Hoy"
                    value={`Bs.${stats.todayRevenue.toLocaleString()}`}
                    icon={CreditCard}
                    color="bg-green-600"
                    trend={5}
                />

                <Card noPadding overflowVisible className="shadow-none border-dashed border-2 flex flex-col">
                    <div className="flex-1 flex flex-col justify-center px-6 py-5">
                        <Select
                            label="¿Qué estás viendo?"
                            variant="simple"
                            showCheck={false}
                            value={selectedBranch}
                            onChange={setSelectedBranch}
                            options={[
                                { value: 'all', label: 'Todas las sucursales' },
                                ...branches
                            ]}
                        />
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UsageChart data={chartData} />
                <RevenueChart data={chartData} />
            </div>
        </div>
    );
};
