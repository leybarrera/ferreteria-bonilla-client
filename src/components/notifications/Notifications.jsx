import { useEffect } from 'react'
import { GoDotFill } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Notifications = ({ showNotifications }) => {
  const { notifications } = useSelector((state) => state.app)

  useEffect(() => {
    console.log(notifications)
  }, [])
  return (
    <div
      className={`absolute top-full right-0 min-h-[500px] h-fit max-h-[776px] bg-gray-100 border border-gray-200 w-[400px]  z-50 rounded-xl mt-1 flex flex-col ${
        showNotifications ? 'block' : 'hidden'
      } transition-all duration-300`}
    >
      {/* Sections Header */}
      <section className="px-5 py-3 flex flex-row items-center">
        <h3 className="text-xl font-bold text-[#fd6c01]">Notificaciones</h3>
      </section>

      {/* Section Messages */}
      <section className="flex flex-col px-2 gap-2 flex-1">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <article
              className="px-5 py-3 rounded-lg flex flex-row gap-2 items-center"
              key={notification.id}
            >
              {/* Foto de perfil */}
              <img
                src="/public/user.png"
                alt="Foto de perfil del usuario"
                className="w-[56px] h-[56px] rounded-full"
              />

              {/* Nombre mensaje */}

              <div className="flex-1 flex-col max-w-[220px]">
                <h3 className="text-sm font-bold">Cristhian Rodríguez</h3>
                <h5 className="text-xs truncate w-full overflow-hidden whitespace-nowrap">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Provident, adipisci.
                </h5>
                <span className="text-xs font-bold">1 min</span>
              </div>

              <div className="flex flex-col  justify-center items-center w-full h-full">
                <GoDotFill size={20} color="fd6c01" />
              </div>
            </article>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center flex-1">
            <h2>No tienes notificaciones</h2>
          </div>
        )}
      </section>
      {notifications && notifications.length > 0 && (
        <div
          className="absolute bottom-0 left-0 w-full h-[50px] flex flex-row items-center
  justify-center bg-gray-200/30 border-t border-gray-200"
        >
          <NavLink
            to={'/notifications'}
            className="text-[#FD6C01] font-bold hover:text-[#ff850b] transition-all duration-300"
          >
            Ver todas las Notificaciones
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Notifications
