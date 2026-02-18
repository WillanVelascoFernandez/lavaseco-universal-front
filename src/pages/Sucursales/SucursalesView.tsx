import React from 'react';
import { createPortal } from 'react-dom';
import { MapPin, TrendingUp, Building2, Waves, Wind, Settings2, X } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Badge } from '@/views/components/Badge';
import { Button } from '@/views/components/Button';
import { Branch } from '../../models/BranchContext';

interface SucursalesViewProps {
    branches: Branch[];
    loading: boolean;
    stats: {
        totalBranches: number;
        totalRevenue: number;
        totalUsers: number;
    };
    updateBranchPrices: (branchId: string, washerPrice: number, dryerPrice: number, applyToAll: boolean) => void;
}

export const SucursalesView: React.FC<SucursalesViewProps> = ({ branches, stats, updateBranchPrices }) => {
    const [selectedBranch, setSelectedBranch] = React.useState<Branch | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Modal local state
    const [wPrice, setWPrice] = React.useState(0);
    const [dPrice, setDPrice] = React.useState(0);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const openPriceModal = (branch: Branch) => {
        setSelectedBranch(branch);
        setWPrice(branch.washerPrice);
        setDPrice(branch.dryerPrice);
        setIsModalOpen(true);
        setShowConfirm(false);
    };

    const handleSaveRequest = () => {
        setShowConfirm(true);
    };

    const confirmSave = (applyToAll: boolean) => {
        if (selectedBranch) {
            updateBranchPrices(selectedBranch.id, wPrice, dPrice, applyToAll);
            setIsModalOpen(false);
        }
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
                    <Card key={branch.id} className="hover:border-brand-blue/30 transition-shadow">
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
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => openPriceModal(branch)}
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
                                    <span className="text-xl font-bold text-brand-dark">Bs. {branch.revenue.toLocaleString()}</span>
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
                ))}
            </div>

            {/* Modal de Precios y Estadísticas con Portal */}
            {isModalOpen && createPortal(
                <div className="fixed top-0 left-0 right-0 bottom-0 z-[999999] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200 m-4 flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-brand-dark">Gestión de Sucursal</h3>
                                <p className="text-xs text-gray-500">{selectedBranch?.name}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar text-brand-dark">
                            {!showConfirm ? (
                                <>
                                    {/* Estadísticas de Inventario */}
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest px-1">Inventario de Máquinas</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Waves size={14} className="text-brand-blue" />
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lavadoras</p>
                                                </div>
                                                <div className="text-2xl font-black leading-none">{selectedBranch?.washerCount}</div>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Wind size={14} className="text-brand-accent" />
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secadoras</p>
                                                </div>
                                                <div className="text-2xl font-black leading-none">{selectedBranch?.dryerCount}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Estadísticas de Uso Totales */}
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest px-1">Ciclos Totales (Histórico)</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Waves size={14} className="text-brand-blue" />
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Lavados</p>
                                                </div>
                                                <div className="text-2xl font-black leading-none">{selectedBranch?.totalWashes.toLocaleString()}</div>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Wind size={14} className="text-brand-accent" />
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Secados</p>
                                                </div>
                                                <div className="text-2xl font-black leading-none">{selectedBranch?.totalDries.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Configuración de Precios */}
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest px-1">Ajuste de Precios (Bs.)</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Lavadora</label>
                                                <div className="relative">
                                                    <Waves className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={20} />
                                                    <input
                                                        type="number"
                                                        value={wPrice}
                                                        onChange={(e) => setWPrice(Number(e.target.value))}
                                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl font-black text-2xl transition-all outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Secadora</label>
                                                <div className="relative">
                                                    <Wind className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent" size={20} />
                                                    <input
                                                        type="number"
                                                        value={dPrice}
                                                        onChange={(e) => setDPrice(Number(e.target.value))}
                                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-brand-accent focus:bg-white rounded-2xl font-black text-2xl transition-all outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button onClick={handleSaveRequest} className="w-full h-[3.25rem] text-lg font-bold rounded-2xl shadow-lg shadow-brand-blue/20">
                                        Guardar Cambios
                                    </Button>
                                </>
                            ) : (
                                <div className="text-center py-6 animate-in slide-in-from-bottom-4 duration-300">
                                    <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Building2 size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">¿Aplicar en todas?</h4>
                                    <p className="text-sm text-gray-500 mb-8 px-4">Esta acción actualizará los precios en todos los puntos de venta.</p>
                                    <div className="flex flex-col gap-3">
                                        <Button onClick={() => confirmSave(true)} variant="primary" className="w-full h-12 rounded-xl text-base">
                                            Sí, en todas
                                        </Button>
                                        <Button onClick={() => confirmSave(false)} variant="outline" className="w-full h-12 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-700 text-base">
                                            Sólo en esta
                                        </Button>
                                        <button onClick={() => setShowConfirm(false)} className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-brand-dark py-3 transition-colors">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
