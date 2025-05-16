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
  Activation,
  VerificationAccount,
  BranchesPage,
  JobOffers,
  Recovery,
} from './pages/index.pages'
import HomeLayout from './layout/HomeLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Branches from './pages/dashboard/branches/Branches'
import Offers from './pages/dashboard/offers/Offers'
import Postulations from './pages/dashboard/postulations/Postulations'
import Users from './pages/dashboard/users/Users'
import Employees from './pages/dashboard/employees/Employees'
import ProtectedLayout from './layout/ProtectedLayout'
import Config from './pages/config/Config'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:id" element={<Applications />} />

        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/perfil/:id" element={<Profile />} />
        <Route path="/activation" element={<Activation />} />
        <Route path="/recuperacion" element={<Recovery />} />

        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/branches/:id" element={<BranchesPage />} />
        <Route path="/offers" element={<JobOffers />} />
        <Route path="/offers/:id" element={<JobOffers />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:senderId/:receiverId" element={<Messages />} />

        <Route
          path="/verification-account/:id"
          element={<VerificationAccount />}
        />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/sucursales" element={<Branches />} />
        <Route path="/dashboard/ofertas" element={<Offers />} />
        <Route path="/dashboard/postulaciones" element={<Postulations />} />
        <Route path="/dashboard/usuarios" element={<Users />} />
        <Route path="/dashboard/empleados" element={<Employees />} />
        <Route path="/dashboard/configuracion" element={<Config />} />
      </Route>

      <Route path="/inicio-sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
    </Routes>
  )
}

export default AppRouter
