import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/views/components/Card';

interface UsageChartProps {
    data: any[];
}

export const UsageChart: React.FC<UsageChartProps> = ({ data }) => (
    <Card title="Uso Semanal de Máquinas">
        <div className="h-80 -mx-6 -mb-6">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
);
