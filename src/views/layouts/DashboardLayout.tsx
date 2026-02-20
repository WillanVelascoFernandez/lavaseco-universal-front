import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLogin } from '@/pages/Login/LoginContext';
import {
    LayoutDashboard,
    MapPin,
    Waves,
    Wind,
    BarChart3,
    Users,
    LogOut,
    Menu,
    X,
    Bell,
    Shield,
    LucideIcon
} from 'lucide-react';

interface SidebarLinkProps {
    to: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-brand-accent text-white shadow-md'
                : 'text-blue-100 hover:bg-brand-blue-light/50 hover:text-white'
            }`
        }
    >
        <Icon size={20} />
        <span className="font-medium">{children}</span>
    </NavLink>
);


const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { logout, user, hasPermission } = useLogin();

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-brand-blue transition-all duration-300 ease-in-out flex flex-col fixed h-full z-50`}
            >
                <div className="p-6 flex items-center gap-3">
                    <img
                        src="https://www.lavasecouniversal.com.bo/wp-content/uploads/2017/05/logo-small-slim.png"
                        alt="Logo"
                        className={`h-8 transition-all ${!isSidebarOpen && 'scale-0'}`}
                    />
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-white lg:hidden"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-3 space-y-2 mt-4">
                    <SidebarLink to="/" icon={LayoutDashboard}>Home</SidebarLink>
                    {hasPermission('branches_view') && (
                        <SidebarLink to="/branches" icon={MapPin}>Sucursales</SidebarLink>
                    )}
                    {hasPermission('washers_view') && (
                        <SidebarLink to="/washers" icon={Waves}>Lavadoras</SidebarLink>
                    )}
                    {hasPermission('dryers_view') && (
                        <SidebarLink to="/dryers" icon={Wind}>Secadoras</SidebarLink>
                    )}
                    {hasPermission('reports_view') && (
                        <SidebarLink to="/reports" icon={BarChart3}>Reportes</SidebarLink>
                    )}
                    {hasPermission('users_view') && (
                        <SidebarLink to="/users" icon={Users}>Usuarios</SidebarLink>
                    )}
                    {hasPermission('roles_view') && (
                        <SidebarLink to="/roles" icon={Shield}>Roles</SidebarLink>
                    )}
                </nav>

                <div className="p-4 mt-auto border-t border-brand-blue-dark">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-blue-100 hover:bg-red-500/20 hover:text-white rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span className={!isSidebarOpen ? 'hidden' : ''}>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Navbar */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button onClick={() => setIsSidebarOpen(true)} className="text-brand-blue">
                                <Menu size={24} />
                            </button>
                        )}
                        <h1 className="text-xl font-bold text-brand-dark">Dashboard de Gestión</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-brand-dark">{user?.name || 'Invitado'}</p>
                                <p className="text-xs text-brand-accent">{user?.role || 'Administrador'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white overflow-hidden shadow-inner font-bold uppercase">
                                {user?.name?.substring(0, 2) || 'AD'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
