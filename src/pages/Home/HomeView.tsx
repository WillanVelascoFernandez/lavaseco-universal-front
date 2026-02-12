import React from 'react';
import {
    Waves,
    Wind,
    ArrowUpRight,
    TrendingUp,
    CreditCard,
    LucideIcon
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Card } from '@/views/components/Card';
import { Select } from '../../views/components/FormElements';

const chartData = [
    { name: 'Lun', usage: 45, revenue: 1200 },
    { name: 'Mar', usage: 52, revenue: 1400 },
    { name: 'Mie', usage: 48, revenue: 1300 },
    { name: 'Jue', usage: 61, revenue: 1700 },
    { name: 'Vie', usage: 55, revenue: 1600 },
    { name: 'Sab', usage: 67, revenue: 1900 },
    { name: 'Dom', usage: 72, revenue: 2100 },
];

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    color: string;
    trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => (
    <Card noPadding className="flex flex-col justify-between shadow-none hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex justify-between items-center p-5 relative z-10">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                </div>
                <h3 className="text-3xl font-bold text-brand-dark tracking-tight">{value}</h3>
                {trend && (
                    <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
                        {Math.abs(trend)}% vs mes pasado
                    </p>
                )}
            </div>
            <div className={`p-4 rounded-xl ${color.replace('bg-', 'bg-')}/10 border ${color.replace('bg-', 'border-')}/20 flex items-center justify-center`}>
                <Icon className={color.replace('bg-', 'text-')} size={32} />
            </div>
        </div>
    </Card>
);

interface HomeViewProps {
    stats: {
        activeWashers: number;
        totalWashers: number;
        activeDryers: number;
        totalDryers: number;
        todayRevenue: number;
    };
    branches: { value: string; label: string }[];
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

                <Card noPadding overflowVisible className="shadow-none border-dashed border-2 flex flex-col justify-center px-6">
                    <Select
                        label="¿Qué estás viendo?"
                        value={selectedBranch}
                        onChange={setSelectedBranch}
                        options={[
                            { value: 'all', label: 'Todas las sucursales' },
                            ...branches
                        ]}
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Uso Semanal de Máquinas">
                    <div className="h-80 -mx-6 -mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06476D" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#06476D" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="usage" stroke="#06476D" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Recaudación por Día">
                    <div className="h-80 -mx-6 -mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f3f4f6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="revenue" fill="#1EA0DC" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
