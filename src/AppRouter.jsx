import { Route, Routes } from 'react-router-dom'
import {
  Login,
  Register,
  Home,
  Offers,
  Messages,
  Notifications,
  Settings,
} from './pages/index.pages'
import HomeLayout from './layout/HomeLayout'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/inicio-sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
    </Routes>
  )
}

export default AppRouter
