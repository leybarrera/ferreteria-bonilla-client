import { BiLogOutCircle, BiMicrophone } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { FaBuildingUser, FaUsersBetweenLines } from 'react-icons/fa6'
import { IoIosStats } from 'react-icons/io'
import { IoBusiness } from 'react-icons/io5'
import { RiUserSettingsFill } from 'react-icons/ri'
import { SiElectronbuilder } from 'react-icons/si'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { storageUtil } from '../../utils/index.utils'
import { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'

const Aside = ({ showMenu, toggleMenu }) => {
  const { info } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const closeSession = () => {
    storageUtil.removeData('session')
    navigate('/inicio-sesion')
  }

  const [isListening, setIsListening] = useState(false)

  const recognition = useMemo(
    () => new (window.SpeechRecognition || window.webkitSpeechRecognition)(),
    []
  )

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase()

      if (
        (transcript === 'sucursales' || transcript === 'mis sucursales') &&
        info.role === 'Administrador'
      ) {
        navigate('/dashboard/sucursales')
        return
      }

      if (
        transcript === 'ofertas' ||
        transcript === 'publicaciones' ||
        transcript === 'mis ofertas'
      ) {
        navigate('/dashboard/ofertas')
        return
      }

      if (
        transcript === 'notificaciones' ||
        transcript === 'mis notificaciones'
      ) {
        navigate('/notifications')
        return
      }

      if (
        transcript === 'candidatos' ||
        transcript === 'postulantes' ||
        transcript === 'ofertantes'
      ) {
        navigate(`/dashboard/postulaciones`)
        return
      }

      if (transcript === 'usuarios' || transcript === 'mis usuarios') {
        navigate(`/dashboard/usuarios`)
        return
      }

      if (
        (transcript === 'empleados' || transcript === 'mis empleados') &&
        info.role === 'Administrador'
      ) {
        navigate(`/dashboard/empleados`)
        return
      }

      if (
        transcript === 'configuracion' ||
        transcript === 'configuraciones' ||
        transcript === 'configurar'
      ) {
        navigate(`/dashboard/configuracion`)
        return
      }

      if (
        transcript === 'inicio' ||
        transcript === 'principal' ||
        transcript === 'home'
      ) {
        navigate(`/dashboard`)
        return
      }

      if (
        transcript === 'salir' ||
        transcript === 'cerrar sesion' ||
        transcript === 'abandonar'
      ) {
        closeSession()
      }
    }
  }, [recognition])

  const toggleListening = () => {
    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
    }

    setIsListening(!isListening)
  }

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

          <button
            className={`px-8 py-5 text-gray-500  flex flex-row items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300 cursor-pointer`}
            onClick={toggleListening}
            type="button"
          >
            <BiMicrophone size={20} color="white" />
            <span className="text-white font-bold text-lg">Comandos</span>
          </button>

          <button
            className={`px-8 py-5 text-gray-500  flex flex-row items-center gap-2 border-b border-gray-500/20  hover:text-white hover:bg-gray-500/10 transition-all duration-300 cursor-pointer`}
            onClick={closeSession}
            type="button"
          >
            <BiLogOutCircle size={20} color="white" />
            <span className="text-white font-bold text-lg">Cerrar sesión</span>
          </button>
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
