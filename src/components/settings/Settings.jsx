import { FaBook } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { LuChevronRight } from 'react-icons/lu'
import { RiLogoutCircleFill, RiSettings3Fill } from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'

const Settings = ({ showSettings, toggleShowSettings }) => {
  const navigate = useNavigate()

  const goToProfile = () => {
    toggleShowSettings()
    navigate('/perfil/12345678')
  }
  return (
    <div
      className={`absolute top-full right-0 h-auto bg-gray-100 border border-gray-200 w-[400px]  z-50 rounded-xl mt-1 flex flex-col ${
        showSettings ? 'block' : 'hidden'
      } transition-all duration-300 pb-5`}
    >
      {/* Header */}
      <section className="px-8 py-5 flex flex-row items-center gap-2 border-b border-gray-200">
        <button
          type="button"
          className="flex flex-row items-center gap-2 cursor-pointer"
          onClick={goToProfile}
        >
          <img
            src="/public/user.png"
            alt="Profile Image"
            className="w-[50px] h-[50px] rounded-full"
          />
          <h2 className="font-bold text-gray-900 text-lg">
            Cristhian Rodríguez
          </h2>
        </button>
      </section>

      {/* Options */}
      <section className="px-3 flex flex-col mt-2">
        <NavLink
          className="py-5 px-2 gap-2 flex flex-row items-center justify-between hover:bg-gray-200 rounded-lg transition-all duration-300"
          to={'/settings'}
          onClick={toggleShowSettings}
        >
          <RiSettings3Fill size={20} />
          <h3 className="flex-1 text-lg font-normal">Configuración</h3>
          <LuChevronRight size={20} />
        </NavLink>
        <NavLink className="py-5 px-2 gap-2 flex flex-row items-center justify-between hover:bg-gray-200 rounded-lg transition-all duration-300">
          <FaBook size={20} />
          <h3 className="flex-1 text-lg font-normal">Términos y condiciones</h3>
          <LuChevronRight size={20} />
        </NavLink>

        <NavLink className="py-5 px-2 gap-2 flex flex-row items-center justify-between hover:bg-gray-200 rounded-lg transition-all duration-300">
          <RiLogoutCircleFill size={20} />
          <h3 className="flex-1 text-lg font-normal">Cerrar sesión</h3>
        </NavLink>
      </section>
    </div>
  )
}

export default Settings
