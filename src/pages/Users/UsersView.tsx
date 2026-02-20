import React, { useState } from 'react';
import { Users, UserPlus, Search } from 'lucide-react';
import { Card } from '@/views/components/Card';
import { Button } from '@/views/components/Button';
import { User } from '../../types/user';
import { useUsers } from './UsersContext';
import { useLogin } from '../Login/LoginContext';
import { UserStats } from './components/UserStats';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';

interface UsersViewProps {
    users: User[];
    filterOptions: Record<string, number>;
    selectedFilters: string[];
    toggleFilter: (filterId: string) => void;
    onlineMinutes: number;
    setOnlineMinutes: (minutes: number) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
    handleSort: (key: string) => void;
}

export const UsersView: React.FC<UsersViewProps> = ({ 
    users, 
    filterOptions, 
    selectedFilters, 
    toggleFilter,
    onlineMinutes,
    setOnlineMinutes,
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort
}) => {
    const { addUser, updateUser, deleteUser } = useUsers();
    const { hasPermission } = useLogin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const activeFiltersCount = selectedFilters.filter(f => f !== 'all').length;

    const handleAddClick = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = async (userData: any) => {
        if (selectedUser) {
            await updateUser(selectedUser.id, userData);
        } else {
            await addUser(userData);
        }
        setIsModalOpen(false);
    };

    const handleDeleteUser = async (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            await deleteUser(id);
        }
    };


    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-blue text-white rounded-lg shadow-lg shadow-brand-blue/20">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark leading-none mb-1">Gestión de Usuarios</h2>
                        <p className="text-xs text-gray-400 font-medium">Administración de cuentas y niveles de acceso del personal.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar usuario..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border border-gray-100 pl-11 pr-4 py-2.5 rounded-2xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all shadow-sm"
                        />
                    </div>

                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all duration-300 font-bold text-xs uppercase tracking-widest
                            ${showFilters || activeFiltersCount > 0
                                ? 'bg-brand-blue/5 border-brand-blue/20 text-brand-blue shadow-sm' 
                                : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                            }
                        `}
                    >
                        <div className="relative">
                            <Users size={16} className={showFilters ? 'animate-pulse' : ''} />
                            {activeFiltersCount > 0 && !showFilters && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-blue text-white text-[8px] flex items-center justify-center rounded-full animate-in zoom-in">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </div>
                        {showFilters ? 'Ocultar Filtros' : 'Filtros'}
                    </button>

                    {hasPermission('users_create') && (
                        <Button onClick={handleAddClick} className="gap-2 px-6 rounded-2xl shadow-xl shadow-brand-blue/10">
                            <UserPlus size={20} />
                            Agregar Usuario
                        </Button>
                    )}
                </div>
            </div>

            {showFilters && (
                <div className="p-4 bg-gray-50/50 rounded-[2rem] border border-gray-100/50 animate-in slide-in-from-top-4 duration-300">
                    <UserStats 
                        filterOptions={filterOptions} 
                        selectedFilters={selectedFilters} 
                        onFilterToggle={toggleFilter}
                        onlineMinutes={onlineMinutes}
                        onMinutesChange={setOnlineMinutes}
                    />
                </div>
            )}

            <Card overflowVisible className="border-none shadow-xl shadow-gray-200/50 rounded-[2rem] mt-2">
                <UserTable
                    users={users}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    onEdit={hasPermission('users_edit') ? handleEditClick : undefined}
                    onDelete={hasPermission('users_delete') ? handleDeleteUser : undefined}
                />
            </Card>

            <UserModal
                isOpen={isModalOpen}
                user={selectedUser}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
            />
        </div>
    );
};
