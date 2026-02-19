import React from 'react';
import { FileBarChart, Download, Calendar, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import { Card } from '@/views/components/Card';
import { Button } from '@/views/components/Button';

interface ReportesViewProps {
    revenueData: any[];
    distributionData: any[];
    summary: {
        avgMonthly: number;
        bestMonth: string;
        growth: number;
    };
}

const COLORS = ['#06476D', '#1EA0DC', '#5EBED6', '#434244'];

export const ReportesView: React.FC<ReportesViewProps> = ({ revenueData, distributionData, summary }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-blue text-white rounded-lg">
                        <FileBarChart size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Reportes y Estadísticas</h2>
                        <p className="text-sm text-gray-500 italic">Análisis detallado de ingresos y uso de maquinaria.</p>
                    </div>
                </div>
                <Button variant="primary" className="gap-2">
                    <Download size={18} />
                    Exportar PDF
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card noPadding className="p-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Promedio Mensual</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-xl font-bold text-brand-dark">Bs. {summary.avgMonthly.toLocaleString()}</h3>
                        <span className="text-xs font-bold text-green-500">+{summary.growth}%</span>
                    </div>
                </Card>
                <Card noPadding className="p-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mes con Mayor Ingreso</p>
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-brand-blue" />
                        <h3 className="text-xl font-bold text-brand-dark">{summary.bestMonth}</h3>
                    </div>
                </Card>
                <Card noPadding className="p-6 text-white bg-brand-blue">
                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Proyección Siguiente Mes</p>
                    <div className="flex items-center gap-2">
                        <TrendingUp size={22} className="text-brand-cyan" />
                        <h3 className="text-xl font-bold">Bs. 23,400</h3>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2" title="Ingresos Semestrales" subtitle="Evolución económica de los últimos 6 meses.">
                    <div className="h-80 -mx-6 -mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line type="monotone" dataKey="amount" stroke="#06476D" strokeWidth={4} dot={{ r: 6, fill: '#06476D', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Distribución de Servicios" subtitle="Porcentaje de uso Lavado vs Secado.">
                    <div className="h-80 flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="70%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 w-full mt-4">
                            {distributionData.map((d, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                        <span className="font-medium text-gray-600">{d.name}</span>
                                    </div>
                                    <span className="font-bold text-brand-dark">{d.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
