import { BiLogOutCircle } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { FaBuildingUser, FaUsersBetweenLines } from 'react-icons/fa6'
import { IoIosStats } from 'react-icons/io'
import { IoBusiness } from 'react-icons/io5'
import { RiUserSettingsFill } from 'react-icons/ri'
import { SiElectronbuilder } from 'react-icons/si'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Aside = ({ showMenu, toggleMenu }) => {
  const { info } = useSelector((state) => state.user)
  return (
    <>
      <aside
        className={`fixed lg:w-[300px] md:w-[40vw] w-[70vw] h-full bg-[#121212] border-r border-gray-500/20 transition-all duration-300 ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-50`}
      >
        {/* Secciones */}
        {/* Header Section */}
        <section className="flex flex-col border-b border-gray-500/20 p-5 items-center justify-center">
          <h2 className="text-white font-bold text-lg">{info?.fullName}</h2>
          <h3 className="text-white font-bold text-sm">{info?.role}</h3>
        </section>

        {/* Menu Section */}

        <section className="flex flex-col">
          <NavLink
            to={'/dashboard'}
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
            }
          >
            <IoIosStats size={20} color="white" />
            <span className="text-white font-bold text-lg">General</span>
          </NavLink>
          {info.role === 'Administrador' && (
            <NavLink
              to={'/dashboard/sucursales'}
              className={({ isActive }) =>
                isActive
                  ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                  : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
              }
            >
              <IoBusiness size={20} color="white" />
              <span className="text-white font-bold text-lg">Sucursales</span>
            </NavLink>
          )}

          <NavLink
            to={'/dashboard/ofertas'}
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
            }
          >
            <SiElectronbuilder size={20} color="white" />
            <span className="text-white font-bold text-lg">
              Ofertas Laborales
            </span>
          </NavLink>

          <NavLink
            to={'/dashboard/postulaciones'}
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
            }
          >
            <FaBuildingUser size={20} color="white" />
            <span className="text-white font-bold text-lg">Postulaciones</span>
          </NavLink>

          <NavLink
            to={'/dashboard/usuarios'}
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
            }
          >
            <FaUsers size={20} color="white" />
            <span className="text-white font-bold text-lg">Usuarios</span>
          </NavLink>

          {info.role === 'Administrador' && (
            <NavLink
              to={'/dashboard/empleados'}
              className={({ isActive }) =>
                isActive
                  ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                  : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
              }
            >
              <FaUsersBetweenLines size={20} color="white" />
              <span className="text-white font-bold text-lg">Empleados</span>
            </NavLink>
          )}

          <NavLink
            to={'/dashboard/configuracion'}
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
            }
          >
            <RiUserSettingsFill size={20} color="white" />
            <span className="text-white font-bold text-lg">Configuración</span>
          </NavLink>

          <NavLink
            to={'/logout'}
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-500/20  text-white bg-gray-500/10 transition-all duration-300`
                : `px-8 py-5 text-gray-500 flex items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300`
            }
          >
            <BiLogOutCircle size={20} color="white" />
            <span className="text-white font-bold text-lg">Cerrar sesión</span>
          </NavLink>
        </section>
      </aside>
      <div
        className={`fixed w-full h-full bg-black/50 z-40 transition-all duration-300 lg:hidden ${
          showMenu ? 'block' : 'hidden'
        }`}
        onClick={toggleMenu}
      />
    </>
  )
}

export default Aside
