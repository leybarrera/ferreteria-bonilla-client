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
      <Route path="/inicio-sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
    </Routes>
  )
}

export default AppRouter
