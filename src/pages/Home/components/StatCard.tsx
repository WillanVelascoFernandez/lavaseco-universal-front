import React from 'react';
import { TrendingUp, LucideIcon } from 'lucide-react';
import { Card } from '@/views/components/Card';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    color: string;
    trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => (
    <Card noPadding className="flex flex-col justify-between shadow-none hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex justify-between items-center p-5 relative z-10">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                </div>
                <h3 className="text-xl font-bold text-brand-dark tracking-tight">{value}</h3>
                {trend && (
                    <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
                        {Math.abs(trend)}% vs mes pasado
                    </p>
                )}
            </div>
            <div className={`p-4 rounded-xl ${color.replace('bg-', 'bg-')}/10 border ${color.replace('bg-', 'border-')}/20 flex items-center justify-center`}>
                <Icon className={color.replace('bg-', 'text-')} size={24} />
            </div>
        </div>
    </Card>
);
