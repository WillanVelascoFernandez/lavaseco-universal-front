import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { BranchProvider } from './models/BranchContext'
import { WasherProvider } from './models/WasherContext'
import { DryerProvider } from './models/DryerContext'
import { UserProvider } from './models/UserContext'
import { AuthProvider, useAuth } from './models/AuthContext'
import DashboardLayout from './views/layouts/DashboardLayout'
import Home from './pages/Home'
import Lavadoras from './pages/Lavadoras'
import Secadoras from './pages/Secadoras'
import Sucursales from './pages/Sucursales'
import Reportes from './pages/Reportes'
import Usuarios from './pages/Usuarios'
import Roles from './pages/Roles'
import { RoleProvider } from './models/RoleContext'
import Login from './pages/Login'

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <BranchProvider>
                <WasherProvider>
                    <DryerProvider>
                        <RoleProvider>
                            <UserProvider>
                                <Router>
                                    <Routes>
                                        <Route path="/login" element={<Login />} />
                                        <Route element={<ProtectedRoute />}>
                                            <Route path="/" element={<DashboardLayout />}>
                                                <Route index element={<Home />} />
                                                <Route path="sucursales" element={<Sucursales />} />
                                                <Route path="lavadoras" element={<Lavadoras />} />
                                                <Route path="secadoras" element={<Secadoras />} />
                                                <Route path="reportes" element={<Reportes />} />
                                                <Route path="usuarios" element={<Usuarios />} />
                                                <Route path="roles" element={<Roles />} />
                                            </Route>
                                        </Route>
                                    </Routes>
                                </Router>
                            </UserProvider>
                        </RoleProvider>
                    </DryerProvider>
                </WasherProvider>
            </BranchProvider>
        </AuthProvider>
    )
}

export default App
