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
    if (filterId === 'online') return 'Actividad';
    if (filterId === 'blocked') return 'Sin Acceso';
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

const FilterDropdown: React.FC<{
    label: string;
    icon: React.ReactNode;
    options: [string, number][];
    selectedFilters: string[];
    onToggle: (id: string) => void;
    activeColor: string;
}> = ({ label, icon, options, selectedFilters, onToggle, activeColor }) => {
    const activeCount = options.filter(([id]) => selectedFilters.includes(id)).length;
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-300
                    ${activeCount > 0 
                        ? `${activeColor} border-transparent text-white shadow-sm` 
                        : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                    }
                `}
            >
                {icon}
                <span>{label}</span>
                {activeCount > 0 && (
                    <span className="flex items-center justify-center w-4 h-4 rounded-md bg-white/20 text-[9px]">
                        {activeCount}
                    </span>
                )}
                <ChevronRight size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 min-w-[180px] bg-white rounded-2xl border border-gray-100 shadow-xl z-50 p-2 animate-in fade-in zoom-in duration-200">
                    <div className="space-y-1 max-h-[250px] overflow-y-auto custom-scrollbar">
                        {options.map(([id, count]) => {
                            const isActive = selectedFilters.includes(id);
                            return (
                                <button
                                    key={id}
                                    onClick={() => onToggle(id)}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-2 rounded-lg text-[10px] font-bold transition-all
                                        ${isActive 
                                            ? 'bg-brand-blue/10 text-brand-blue' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <span>{getFilterLabel(id)}</span>
                                    <span className="text-[9px] opacity-50 px-1.5 py-0.5 rounded-md bg-gray-100">
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export const UserStats: React.FC<UserStatsProps> = ({ 
    filterOptions, 
    selectedFilters, 
    onFilterToggle,
    onlineMinutes,
    onMinutesChange
}) => {
    const statusOptions = Object.entries(filterOptions).filter(([id]) => ['all', 'online', 'blocked'].includes(id));
    const roleOptions = Object.entries(filterOptions).filter(([id]) => id.startsWith('role:'));
    const branchOptions = Object.entries(filterOptions).filter(([id]) => id.startsWith('branch:'));

    return (
        <div className="flex flex-wrap items-center gap-4">
            {/* Estados de forma rápida */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {statusOptions.map(([id, count]) => {
                    const isActive = selectedFilters.includes(id);
                    const styles = getFilterStyles(id, isActive);
                    const iconColor = getIconColorClass(id, isActive);
                    
                    return (
                        <div key={id} className="flex items-center gap-1">
                            <button
                                onClick={() => onFilterToggle(id)}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 border
                                    ${styles}
                                `}
                            >
                                <span className={`${iconColor} transition-colors duration-300`}>
                                    {getFilterIcon(id)}
                                </span>
                                <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                    {getFilterLabel(id)}
                                </span>
                                <div className={`
                                    flex items-center justify-center min-w-[16px] h-3.5 px-1 rounded-md text-[8px] font-black
                                    ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}
                                `}>
                                    {count}
                                </div>
                            </button>
                            {id === 'online' && isActive && (
                                <div className="flex items-center gap-1 ml-1 pl-2 border-l border-green-200/50 animate-in slide-in-from-left-2 duration-300">
                                    {[
                                        { val: 5, label: '5m' },
                                        { val: 15, label: '15m' },
                                        { val: 60, label: '1h' },
                                        { val: 1440, label: 'Día' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onMinutesChange(opt.val);
                                            }}
                                            className={`
                                                px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase transition-all
                                                ${onlineMinutes === opt.val 
                                                    ? 'bg-green-600 text-white shadow-sm' 
                                                    : 'text-green-700 hover:bg-green-100'
                                                }
                                            `}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            {/* Dropdowns para lo más pesado */}
            <div className="flex items-center gap-2">
                <FilterDropdown 
                    label="Roles"
                    icon={<Shield size={12} />}
                    options={roleOptions}
                    selectedFilters={selectedFilters}
                    onToggle={onFilterToggle}
                    activeColor="bg-brand-blue"
                />
                
                <FilterDropdown 
                    label="Sucursales"
                    icon={<MapPin size={12} />}
                    options={branchOptions}
                    selectedFilters={selectedFilters}
                    onToggle={onFilterToggle}
                    activeColor="bg-orange-500"
                />
            </div>
        </div>
    );
};
