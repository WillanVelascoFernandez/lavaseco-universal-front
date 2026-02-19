import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { BranchesProvider } from './pages/Branches/BranchesContext'
import { WashersProvider } from './pages/Washers/WashersContext'
import { DryersProvider } from './pages/Dryers/DryersContext'
import { UsersProvider } from './pages/Users/UsersContext'
import { LoginProvider, useLogin } from './pages/Login/LoginContext'
import DashboardLayout from './views/layouts/DashboardLayout'
import Home from './pages/Home'
import Washers from './pages/Washers'
import Dryers from './pages/Dryers'
import Branches from './pages/Branches'
import Reports from './pages/Reports'
import Users from './pages/Users'
import Roles from './pages/Roles'
import { RolesProvider } from './pages/Roles/RolesContext'
import { ReportsProvider } from './pages/Reports/ReportsContext'
import { HomeProvider } from './pages/Home/HomeContext'
import Login from './pages/Login'

const ProtectedRoute = () => {
    const { isAuthenticated } = useLogin();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <LoginProvider>
            <BranchesProvider>
                <WashersProvider>
                    <DryersProvider>
                        <RolesProvider>
                            <ReportsProvider>
                                <HomeProvider>
                                    <UsersProvider>
                                        <Router>
                                            <Routes>
                                                <Route path="/login" element={<Login />} />
                                                <Route element={<ProtectedRoute />}>
                                                    <Route path="/" element={<DashboardLayout />}>
                                                        <Route index element={<Home />} />
                                                        <Route path="branches" element={<Branches />} />
                                                        <Route path="washers" element={<Washers />} />
                                                        <Route path="dryers" element={<Dryers />} />
                                                        <Route path="reports" element={<Reports />} />
                                                        <Route path="users" element={<Users />} />
                                                        <Route path="roles" element={<Roles />} />
                                                    </Route>
                                                </Route>
                                            </Routes>
                                        </Router>
                                    </UsersProvider>
                                </HomeProvider>
                            </ReportsProvider>
                        </RolesProvider>
                    </DryersProvider>
                </WashersProvider>
            </BranchesProvider>
        </LoginProvider>
    )
}

export default App
