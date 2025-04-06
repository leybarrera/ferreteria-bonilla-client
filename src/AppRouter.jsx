import { Route, Routes } from 'react-router-dom'
import {
  Login,
  Register,
  Home,
  Applications,
  Messages,
  Notifications,
  Settings,
  Profile,
} from './pages/index.pages'
import HomeLayout from './layout/HomeLayout'
import Dashboard from './pages/dashboard/Dashboard'
import AdminLayout from './layout/AdminLayout'
import Branches from './pages/dashboard/branches/Branches'
import Offers from './pages/dashboard/offers/Offers'
import Postulations from './pages/dashboard/postulations/Postulations'
import Users from './pages/dashboard/users/Users'
import Employees from './pages/dashboard/employees/Employees'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/perfil/:id" element={<Profile />} />
      </Route>

      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/sucursales" element={<Branches />} />
        <Route path="/dashboard/ofertas" element={<Offers />} />
        <Route path="/dashboard/postulaciones" element={<Postulations />} />
        <Route path="/dashboard/usuarios" element={<Users />} />
        <Route path="/dashboard/empleados" element={<Employees />} />
      </Route>
      <Route path="/inicio-sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
    </Routes>
  )
}

export default AppRouter
