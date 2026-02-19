import React from 'react';
import { MapPin, TrendingUp, Settings2 } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Badge } from '@/views/components/Badge';
import { Branch } from '../BranchesContext';

interface BranchCardProps {
    branch: Branch;
    onOpenSettings: (branch: Branch) => void;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch, onOpenSettings }) => (
    <Card className="hover:border-brand-blue/30 transition-shadow">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <MapPin className="text-brand-blue" size={20} />
                </div>
                <div>
                    <h4 className="font-black text-brand-dark text-lg uppercase">{branch.name}</h4>
                    <p className="text-xs text-gray-400 font-medium">{branch.address}</p>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => onOpenSettings(branch)}
                    className="h-8 w-8 bg-white border border-gray-200 text-gray-400 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center group"
                    title="Gestionar Sucursal"
                >
                    <Settings2 size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </button>
                <Badge variant="success">Operativo</Badge>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rendimiento Diario</p>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-brand-dark">Bs. {(branch.revenue || 0).toLocaleString()}</span>
                    <TrendingUp size={14} className="text-green-500" />
                </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Actividad Diaria</p>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-brand-dark">{branch.userCount}</span>
                    <span className="text-xs font-medium text-gray-400">usuarios hoy</span>
                </div>
            </div>
        </div>
    </Card>
);
