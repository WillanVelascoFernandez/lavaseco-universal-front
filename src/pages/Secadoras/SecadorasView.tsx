import React from 'react';
import { Wind, History, X, Calendar, Clock, User } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Card } from '@/views/components/Card';
import { Badge } from '../../views/components/Badge';
import { Button } from '../../views/components/Button';
import { Dryer } from '../../models/DryerContext';

interface SecadorasViewProps {
    secadoras: Dryer[];
    handleToggle: (id: string) => void;
}

export const SecadorasView: React.FC<SecadorasViewProps> = ({ secadoras, handleToggle }) => {
    const [selectedMachine, setSelectedMachine] = React.useState<Dryer | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const recordsPerPage = 10;

    const openHistory = (machine: Dryer) => {
        setSelectedMachine(machine);
        setIsHistoryOpen(true);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalRecords = selectedMachine?.history?.length || 0;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = selectedMachine?.history?.slice(indexOfFirstRecord, indexOfLastRecord) || [];

    const getStatusVariant = (status: string): any => {
        switch (status) {
            case 'en_uso': return 'info';
            case 'en_espera': return 'success';
            case 'deshabilitado': return 'gray';
            default: return 'gray';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-accent text-white rounded-lg">
                        <Wind size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Gestión de Secadoras</h2>
                        <p className="text-sm text-gray-500 italic">Administra el secado y monitorea tiempos de ciclo remotos.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Espera</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">En uso</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-400"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Deshabilitado</span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {secadoras.map(machine => (
                    <Card
                        key={machine.id}
                        className="group transition-all hover:border-brand-accent/30"
                        footer={
                            <div className="flex gap-2">
                                <Button
                                    variant={machine.enabled ? 'danger' : 'success'}
                                    size="sm"
                                    className="flex-1 gap-2"
                                    onClick={() => handleToggle(machine.id)}
                                >
                                    {machine.enabled ? 'Deshabilitar' : 'Habilitar'}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="px-3"
                                    onClick={() => openHistory(machine)}
                                >
                                    <History size={16} />
                                </Button>
                            </div>
                        }
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <Wind size={20} className="text-brand-accent" />
                                <span className="font-black text-xl text-brand-dark">{machine.id}</span>
                            </div>
                            <Badge variant={getStatusVariant(machine.status)}>
                                {machine.status.replace('_', ' ')}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2 h-24 items-start">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Sucursal</p>
                                <p className="font-bold text-brand-dark leading-tight capitalize">{machine.branchId.replace('-', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Secados</p>
                                <p className="font-bold text-brand-dark leading-tight">{machine.usageCount}</p>
                            </div>
                        </div>

                        <div className={`mt-4 p-3 rounded-xl border transition-all duration-300 ${machine.status === 'en_uso'
                            ? 'bg-blue-50 border-blue-100'
                            : 'bg-gray-100/50 border-gray-100 opacity-60'
                            }`}>
                            <p className={`text-[10px] uppercase font-black tracking-widest mb-1 ${machine.status === 'en_uso' ? 'text-blue-400' : 'text-gray-400'
                                }`}>
                                Ciclo Actual
                            </p>
                            <div className="flex justify-between items-center">
                                <span className={`text-sm font-bold ${machine.status === 'en_uso' ? 'text-blue-700' : 'text-gray-500'
                                    }`}>
                                    {machine.status === 'en_uso' ? machine.lastCycle.type : 'Ninguno'}
                                </span>
                                <span className={`text-xs font-medium ${machine.status === 'en_uso' ? 'text-blue-500' : 'text-gray-400'
                                    }`}>
                                    {machine.status === 'en_uso' ? machine.lastCycle.time : '--:--'}
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modal Historial */}
            {isHistoryOpen && createPortal(
                <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden transform animate-in zoom-in-95 duration-200 m-4 flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-accent/10 text-brand-accent rounded-xl">
                                    <History size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-dark">Historial de Uso</h3>
                                    <p className="text-xs text-gray-500 font-medium">Máquina {selectedMachine?.id} • {selectedMachine?.branchId.toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="p-1 hover:bg-white disabled:opacity-30 rounded-md transition-all font-bold text-xs px-2"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                                        Página {currentPage} de {totalPages || 1}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="p-1 hover:bg-white disabled:opacity-30 rounded-md transition-all font-bold text-xs px-2"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                                <button onClick={() => setIsHistoryOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/30">
                            <div className="space-y-3">
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((entry) => (
                                        <div key={entry.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
                                            <div className="flex flex-row items-center justify-between gap-6">
                                                {/* Fecha y Hora */}
                                                <div className="flex flex-col w-32 border-r border-gray-50">
                                                    <div className="flex items-center gap-1.5 text-[9px] font-black text-brand-accent uppercase tracking-widest mb-1">
                                                        <Calendar size={12} />
                                                        {entry.date}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                                        <Clock size={12} />
                                                        {entry.time}
                                                    </div>
                                                </div>

                                                {/* Ciclo */}
                                                <div className="flex-1 border-r border-gray-50">
                                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Ciclo de Secado</p>
                                                    <p className="font-bold text-brand-dark">Programa {entry.cycleType}</p>
                                                </div>

                                                {/* Detalle */}
                                                <div className="w-32 border-r border-gray-50">
                                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Operado por</p>
                                                    <div className="flex items-center gap-2">
                                                        <User size={12} className="text-gray-400" />
                                                        <p className="text-xs font-bold text-brand-dark">{entry.user}</p>
                                                    </div>
                                                </div>

                                                {/* Duración */}
                                                <div className="w-24 border-r border-gray-50 text-center">
                                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 text-center">Duración</p>
                                                    <p className="text-xs font-bold text-gray-600">{entry.duration}</p>
                                                </div>

                                                {/* Monto */}
                                                <div className="w-24 text-right">
                                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 text-right">Ingreso</p>
                                                    <Badge variant="info" className="text-sm">Bs. {entry.revenue}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <History size={32} className="text-gray-300" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-400">No hay registros de uso para esta máquina.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-xs">
                            <span className="font-bold text-gray-400">Mostrando {currentRecords.length} de {totalRecords} registros</span>
                            <Button onClick={() => setIsHistoryOpen(false)} variant="outline" size="sm">Cerrar Historial</Button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
