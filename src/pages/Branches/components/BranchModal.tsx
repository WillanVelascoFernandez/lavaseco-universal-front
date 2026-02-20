import React from 'react';
import { createPortal } from 'react-dom';
import { Building2, Waves, Wind, X } from 'lucide-react';
import { Button } from '@/views/components/Button';
import { Branch } from '../../../types/branch';

interface BranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    branch: Branch | null;
    onUpdateSettings: (branchId: string, washerPrice: number, dryerPrice: number, washerTime: number, dryerTime: number, applyToAll: boolean) => void;
}

export const BranchModal: React.FC<BranchModalProps> = ({ isOpen, onClose, branch, onUpdateSettings }) => {
    const [wPrice, setWPrice] = React.useState(0);
    const [dPrice, setDPrice] = React.useState(0);
    const [wTime, setWTime] = React.useState(45);
    const [dTime, setDTime] = React.useState(45);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const lastLoadedBranchId = React.useRef<string | null>(null);

    React.useEffect(() => {
        if (!isOpen) {
            lastLoadedBranchId.current = null;
            return;
        }

        if (branch) {
            const currentId = branch.id.toString();
            
            // Solo cargar si el modal se abre por primera vez o si cambiamos de sucursal
            if (lastLoadedBranchId.current !== currentId) {
                setWPrice(branch.washerPrice || 0);
                setDPrice(branch.dryerPrice || 0);
                setWTime(branch.washerTime || 45);
                setDTime(branch.dryerTime || 45);
                setShowConfirm(false);
                lastLoadedBranchId.current = currentId;
            }
        }
    }, [isOpen, branch]);

    if (!isOpen || !branch) return null;

    const handleSaveRequest = () => setShowConfirm(true);

    const confirmSave = (applyToAll: boolean) => {
        onUpdateSettings(branch.id.toString(), wPrice, dPrice, wTime, dTime, applyToAll);
        onClose();
    };

    return createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[999999] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200 m-4 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark">Gestión de Sucursal</h3>
                        <p className="text-sm text-gray-500 font-semibold">{branch.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar text-brand-dark">
                    {!showConfirm ? (
                        <>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest px-1">Inventario de Máquinas</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Waves size={14} className="text-brand-blue" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lavadoras</p>
                                        </div>
                                        <div className="text-xl font-bold text-brand-dark leading-none">{branch.washerCount}</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Wind size={14} className="text-brand-accent" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secadoras</p>
                                        </div>
                                        <div className="text-xl font-bold text-brand-dark leading-none">{branch.dryerCount}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest px-1">Ciclos Totales (Histórico)</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Waves size={14} className="text-brand-blue" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Lavados</p>
                                        </div>
                                        <div className="text-2xl font-black leading-none">{(branch.totalWashes || 0).toLocaleString()}</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Wind size={14} className="text-brand-accent" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Secados</p>
                                        </div>
                                        <div className="text-2xl font-black leading-none">{(branch.totalDries || 0).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>

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
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl font-bold text-xl transition-all outline-none"
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
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-brand-accent focus:bg-white rounded-2xl font-bold text-xl transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest px-1">Tiempos de Ciclo (Min.)</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Lavado</label>
                                        <div className="relative">
                                            <Waves className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue/40" size={20} />
                                            <input
                                                type="number"
                                                value={wTime}
                                                onChange={(e) => setWTime(Number(e.target.value))}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl font-bold text-xl transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Secado</label>
                                        <div className="relative">
                                            <Wind className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent/40" size={20} />
                                            <input
                                                type="number"
                                                value={dTime}
                                                onChange={(e) => setDTime(Number(e.target.value))}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-brand-accent focus:bg-white rounded-2xl font-bold text-xl transition-all outline-none"
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
    );
};
