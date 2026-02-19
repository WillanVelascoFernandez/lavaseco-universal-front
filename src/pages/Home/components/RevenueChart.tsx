import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/views/components/Card';

interface RevenueChartProps {
    data: any[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => (
    <Card title="Recaudación por Día" subtitle="Ingresos generados en la última semana.">
        <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                    />
                    <Tooltip
                        cursor={{ fill: '#f8fafc', radius: 8 }}
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            padding: '12px'
                        }}
                    />
                    <Bar
                        dataKey="revenue"
                        fill="#1EA0DC"
                        radius={[6, 6, 0, 0]}
                        barSize={32}
                        animationDuration={1500}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
);
