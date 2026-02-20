import React from 'react';
import { createPortal } from 'react-dom';
import { History, X, Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/views/components/Badge';
import { Button } from '@/views/components/Button';
import { Dryer, HistoryEntry } from '../../../types/machine';
import { dryerService } from '../DryerService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DryerHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    machine: Dryer | null;
}

export const DryerHistoryModal: React.FC<DryerHistoryModalProps> = ({ isOpen, onClose, machine }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [history, setHistory] = React.useState<HistoryEntry[]>([]);
    const [loading, setLoading] = React.useState(false);
    const recordsPerPage = 10;

    const fetchHistory = React.useCallback(async () => {
        if (!machine) return;
        setLoading(true);
        try {
            const data = await dryerService.getDryerHistory(parseInt(machine.id));
            const formattedHistory: HistoryEntry[] = data.map((log: any) => ({
                id: log.id.toString(),
                date: format(new Date(log.createdAt), 'dd MMM yyyy', { locale: es }),
                time: format(new Date(log.createdAt), 'HH:mm'),
                cycleType: log.dryType || 'Normal',
                duration: (log.duration || 45) + ' min',
                revenue: log.revenue || 0,
                user: log.user?.name || 'Sistema'
            }));
            setHistory(formattedHistory);
        } catch (error) {
            console.error('Error fetching dryer history:', error);
        } finally {
            setLoading(false);
        }
    }, [machine]);

    React.useEffect(() => {
        if (isOpen) {
            setCurrentPage(1);
            fetchHistory();
        }
    }, [isOpen, fetchHistory]);

    if (!isOpen || !machine) return null;

    const totalRecords = history.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = history.slice(indexOfFirstRecord, indexOfLastRecord);

    return createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden transform animate-in zoom-in-95 duration-200 m-4 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-accent/10 text-brand-accent rounded-xl">
                            <History size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-brand-dark">Historial de Uso</h3>
                            <p className="text-xs text-gray-500 font-medium">Máquina {machine.id} • {machine.branchId.toUpperCase()}</p>
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
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/30">
                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-sm font-bold text-gray-400 italic">Cargando historial...</p>
                            </div>
                        ) : currentRecords.length > 0 ? (
                            currentRecords.map((entry) => (
                                <div key={entry.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex flex-row items-center justify-between gap-6">
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

                                        <div className="flex-1 border-r border-gray-50">
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Ciclo de Secado</p>
                                            <p className="font-bold text-brand-dark">Programa {entry.cycleType}</p>
                                        </div>

                                        <div className="w-32 border-r border-gray-50">
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Operado por</p>
                                            <div className="flex items-center gap-2">
                                                <User size={12} className="text-gray-400" />
                                                <p className="text-xs font-bold text-brand-dark">{entry.user}</p>
                                            </div>
                                        </div>

                                        <div className="w-24 border-r border-gray-50 text-center">
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 text-center">Duración</p>
                                            <p className="text-xs font-bold text-gray-600">{entry.duration}</p>
                                        </div>

                                        <div className="w-24 text-right">
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 text-right">Ingreso</p>
                                            <Badge variant="info" className="text-sm border-none bg-orange-50 text-brand-accent">Bs. {entry.revenue.toFixed(2)}</Badge>
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
                    <Button onClick={onClose} variant="outline" size="sm">Cerrar Historial</Button>
                </div>
            </div>
        </div>,
        document.body
    );
};
