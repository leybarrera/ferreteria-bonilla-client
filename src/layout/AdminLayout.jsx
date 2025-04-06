import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { AdminAside } from '../components/index.components'
import { GiHamburgerMenu } from 'react-icons/gi'

const AdminLayout = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu((prev) => !prev)
  }
  return (
    <>
      <AdminAside showMenu={showMenu} toggleMenu={toggleMenu} />
      <button
        className="fixed top-5 left-5 lg:hidden"
        type="button"
        onClick={toggleMenu}
      >
        <GiHamburgerMenu size={30} color="#fd6c01" />
      </button>
      <main className="lg:pl-[300px] pl-0 pb-10 pr-0">
        <Outlet />
      </main>
    </>
  )
}

export default AdminLayout
