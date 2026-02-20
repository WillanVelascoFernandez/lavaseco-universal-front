import { useEffect, useState, useMemo } from 'react';
import { useUsers } from './UsersContext';

export const useUsersController = () => {
    const { users, loading, refreshUsers } = useUsers();
    const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
    const [onlineMinutes, setOnlineMinutes] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    useEffect(() => {
        refreshUsers();
    }, [refreshUsers]);

    const toggleFilter = (filterId: string) => {
        setSelectedFilters(prev => {
            if (filterId === 'all') return ['all'];
            
            let newFilters = prev.filter(f => f !== 'all');
            if (newFilters.includes(filterId)) {
                newFilters = newFilters.filter(f => f !== filterId);
                return newFilters.length === 0 ? ['all'] : newFilters;
            } else {
                return [...newFilters, filterId];
            }
        });
    };

    const handleSort = (key: string) => {
        setSortConfig(prev => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const filterOptions = useMemo(() => {
        const now = new Date().getTime();
        const rangeMs = onlineMinutes * 60 * 1000;

        const counts: Record<string, number> = {
            all: users.length,
            online: users.filter(u => {
                if (!u.lastActiveRaw) return false;
                const lastSeen = new Date(u.lastActiveRaw).getTime();
                if (onlineMinutes === 1440) {
                    const startOfToday = new Date().setHours(0, 0, 0, 0);
                    return lastSeen >= startOfToday;
                }
                return (now - lastSeen) < rangeMs;
            }).length,
            blocked: users.filter(u => u.status === 'inactive').length,
        };

        // Unique Roles count
        users.forEach(user => {
            const roleKey = `role:${user.role}`;
            counts[roleKey] = (counts[roleKey] || 0) + 1;
            
            // Unique Branches count
            user.branches?.forEach(branch => {
                const branchKey = `branch:${branch.name}`;
                counts[branchKey] = (counts[branchKey] || 0) + 1;
            });
        });

        return counts;
    }, [users, onlineMinutes]);

    const filteredAndSortedUsers = useMemo(() => {
        let result = [...users];

        // 1. Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(u => 
                u.name.toLowerCase().includes(query) ||
                u.email.toLowerCase().includes(query) ||
                u.role.toLowerCase().includes(query) ||
                u.branches.some(b => b.name.toLowerCase().includes(query))
            );
        }

        // 2. Filter by Selected Filters (Role, Branch, Status)
        if (!selectedFilters.includes('all')) {
            result = result.filter(user => {
                const roleFilters = selectedFilters.filter(f => f.startsWith('role:'));
                const branchFilters = selectedFilters.filter(f => f.startsWith('branch:'));
                const statusFilters = selectedFilters.filter(f => f === 'online' || f === 'blocked');

                // Role logic (OR)
                const matchesRole = roleFilters.length === 0 || 
                    roleFilters.some(f => f.replace('role:', '') === user.role);

                // Branch logic (OR)
                const matchesBranch = branchFilters.length === 0 || 
                    branchFilters.some(f => user.branches?.some(b => b.name === f.replace('branch:', '')));

                // Status logic (AND)
                let matchesStatus = true;
                if (statusFilters.includes('online')) {
                    const now = new Date().getTime();
                    if (!user.lastActiveRaw) matchesStatus = false;
                    else {
                        const lastSeen = new Date(user.lastActiveRaw).getTime();
                        if (onlineMinutes === 1440) {
                            const startOfToday = new Date().setHours(0, 0, 0, 0);
                            matchesStatus = matchesStatus && (lastSeen >= startOfToday);
                        } else {
                            matchesStatus = matchesStatus && (now - lastSeen < onlineMinutes * 60 * 1000);
                        }
                    }
                }
                if (statusFilters.includes('blocked')) {
                    matchesStatus = matchesStatus && (user.status === 'inactive');
                }

                return matchesRole && matchesBranch && matchesStatus;
            });
        }

        // 3. Apply Sorting
        if (sortConfig) {
            result.sort((a, b) => {
                let aValue: any = (a as any)[sortConfig.key];
                let bValue: any = (b as any)[sortConfig.key];

                // Special case for role (if it's not a primitive, though here it's string)
                if (sortConfig.key === 'role') {
                    aValue = a.role || '';
                    bValue = b.role || '';
                }

                // Special case for Last Activity (Dates/Timestamps)
                if (sortConfig.key === 'lastActiveRaw') {
                    aValue = a.lastActiveRaw ? new Date(a.lastActiveRaw).getTime() : 0;
                    bValue = b.lastActiveRaw ? new Date(b.lastActiveRaw).getTime() : 0;
                }

                // Default null handling
                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [users, searchQuery, selectedFilters, onlineMinutes, sortConfig]);

    return {
        users: filteredAndSortedUsers,
        loading,
        filterOptions,
        selectedFilters,
        toggleFilter,
        onlineMinutes,
        setOnlineMinutes,
        searchQuery,
        setSearchQuery,
        sortConfig,
        handleSort
    };
};
