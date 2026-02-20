import React from 'react';
import { Users, UserCheck, Shield, ChevronRight, MapPin } from 'lucide-react';

interface UserStatsProps {
    filterOptions: Record<string, number>;
    selectedFilters: string[];
    onFilterToggle: (id: string) => void;
    onlineMinutes: number;
    onMinutesChange: (minutes: number) => void;
}

const getFilterIcon = (filterId: string) => {
    if (filterId === 'all') return <Users size={14} />;
    if (filterId === 'online') return <UserCheck size={14} />;
    if (filterId === 'blocked') return <Shield size={14} className="rotate-180" />;
    if (filterId.startsWith('branch:')) return <MapPin size={14} />;
    if (filterId.startsWith('role:')) return <Shield size={14} />;
    return <ChevronRight size={14} />;
};

const getFilterLabel = (filterId: string) => {
    if (filterId === 'all') return 'Todos';
    if (filterId === 'online') return 'En línea';
    if (filterId === 'blocked') return 'Bloqueados';
    if (filterId.startsWith('branch:')) return filterId.replace('branch:', '');
    if (filterId.startsWith('role:')) return filterId.replace('role:', '');
    return filterId;
};

const getFilterStyles = (id: string, isActive: boolean) => {
    if (isActive) {
        if (id === 'all') return 'bg-brand-blue border-transparent text-white shadow-lg shadow-brand-blue/20';
        if (id === 'online') return 'bg-green-500 border-transparent text-white shadow-lg shadow-green-500/20';
        if (id === 'blocked') return 'bg-red-500 border-transparent text-white shadow-lg shadow-red-500/20';
        if (id.startsWith('branch:')) return 'bg-orange-500 border-transparent text-white shadow-lg shadow-orange-500/20';
        return 'bg-brand-blue border-transparent text-white shadow-lg shadow-brand-blue/20';
    }
    return 'bg-white border-gray-100 text-gray-500 hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] shadow-sm';
};

const getIconColorClass = (id: string, isActive: boolean) => {
    if (isActive) return 'text-white';
    if (id === 'all') return 'text-brand-blue';
    if (id === 'online') return 'text-green-600';
    if (id === 'blocked') return 'text-red-600';
    if (id.startsWith('branch:')) return 'text-orange-600';
    return 'text-brand-blue';
};

export const UserStats: React.FC<UserStatsProps> = ({ 
    filterOptions, 
    selectedFilters, 
    onFilterToggle,
    onlineMinutes,
    onMinutesChange
}) => {
    return (
        <div className="flex flex-wrap items-center gap-2 px-1">
            {Object.entries(filterOptions).map(([id, count]) => {
                const isActive = selectedFilters.includes(id);
                const styles = getFilterStyles(id, isActive);
                const iconColor = getIconColorClass(id, isActive);
                
                return (
                    <div key={id} className="flex items-center gap-2">
                        <button
                            onClick={() => onFilterToggle(id)}
                            className={`
                                flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 border group
                                ${styles}
                            `}
                        >
                            <span className={`${iconColor} transition-colors duration-300`}>
                                {getFilterIcon(id)}
                            </span>
                            
                            <div className="flex items-center gap-2.5">
                                <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                    {getFilterLabel(id)}
                                </span>
                                
                                <div className={`
                                    flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-lg text-[10px] font-black
                                    ${isActive 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-gray-100 text-gray-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue'
                                    }
                                    transition-all duration-300
                                `}>
                                    {count}
                                </div>
                            </div>
                        </button>

                        {id === 'online' && isActive && (
                            <select
                                value={onlineMinutes}
                                onChange={(e) => onMinutesChange(parseInt(e.target.value))}
                                className="bg-green-50 text-green-700 text-[10px] font-black uppercase px-2 py-1.5 rounded-xl border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all animate-in fade-in zoom-in duration-300"
                            >
                                <option value={5}>5m</option>
                                <option value={15}>15m</option>
                                <option value={60}>1h</option>
                                <option value={1440}>Hoy</option>
                            </select>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
