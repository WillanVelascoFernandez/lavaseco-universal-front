import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/views/components/Card';

interface RevenueChartProps {
    data: any[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => (
    <Card title="Recaudación por Día">
        <div className="h-80 -mx-6 -mb-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
);
