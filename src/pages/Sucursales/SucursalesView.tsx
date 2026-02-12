import React from 'react';
import { MapPin, TrendingUp, Users, Building2 } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Badge } from '@/views/components/Badge';
import { Branch } from '../../models/BranchContext';

interface SucursalesViewProps {
    branches: Branch[];
    loading: boolean;
    stats: {
        totalBranches: number;
        totalRevenue: number;
        totalUsers: number;
    };
}

export const SucursalesView: React.FC<SucursalesViewProps> = ({ branches, stats }) => {
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
                    <Card key={branch.id} className="hover:border-brand-blue/30 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                    <MapPin className="text-brand-blue" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark text-lg">{branch.name}</h4>
                                    <p className="text-xs text-gray-400 font-medium">{branch.address}</p>
                                </div>
                            </div>
                            <Badge variant="success">Operativo</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rendimiento</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-brand-dark">Bs. {branch.revenue.toLocaleString()}</span>
                                    <TrendingUp size={14} className="text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Actividad</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-brand-dark">{branch.userCount}</span>
                                    <span className="text-xs font-medium text-gray-400">usuarios hoy</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
