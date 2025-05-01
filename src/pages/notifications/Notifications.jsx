import { useEffect } from 'react'
import { IoIosBusiness, IoIosSettings } from 'react-icons/io'
import { MdBusinessCenter } from 'react-icons/md'
import { notificationApi } from '../../api/index.api'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const { info } = useSelector((state) => state.user)

  useEffect(() => {
    notificationApi.getAllByUserId(info.id).then((res) => {
      const { notifications } = res.data
      setNotifications(notifications)
    })
  }, [])

  return (
    <main className="lg:w-[700px] mx-auto h-screen w-full bg-white mt-2 border border-gray-200 rounded-lg lg:px-0 ">
      {/* Notificaciones */}
      {notifications.map((noti) => (
        <article
          className="p-5 flex flex-row items-start gap-2 border border-gray-200"
          key={noti.id}
        >
          <div className="relative w-[50px] h-[50px] rounded-full bg-[#fd6c01] flex justify-center items-center">
            <img
              src="/public/mascota-clean.png"
              alt=""
              className="w-[40px]  object-cover rounded-full"
            />

            <div className="absolute -bottom-1 right-1 bg-white rounded-full w-[20px] h-[20px] flex justify-center items-center border border-gray-200">
              {noti.type === 'message' ? (
                <IoIosSettings size={12} />
              ) : (
                <IoIosBusiness size={12} />
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-bold">{noti.Branch.name}</h2>
            <h3 className="text-sm font-light text-gray-500">{noti.message}</h3>
          </div>
        </article>
      ))}

      {/* <article className="p-5 flex flex-row items-start gap-2 border border-gray-200">
        <div className="relative w-[50px] h-[50px] rounded-full bg-[#fd6c01] flex justify-center items-center">
          <img
            src="/public/mascota-clean.png"
            alt=""
            className="w-[40px]  object-cover rounded-full"
          />
          <div className="absolute -bottom-1 right-1 bg-white rounded-full w-[20px] h-[20px] flex justify-center items-center border border-gray-200">
            <MdBusinessCenter size={12} />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-lg font-bold">Sucursal Quito</h2>
          <h3 className="text-sm font-light text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Ratione optio
            rerum incidunt! Quo minus id voluptatibus inventore ab nisi illo
            similique. Necessitatibus aperiam veniam dolores molestiae eos, eum
            iure temporibus ipsa nulla distinctio voluptatum dolore reiciendis
            in sed quod neque. Aliquid sequi deserunt non reprehenderit itaque
            deleniti cum quas architecto.
          </h3>
        </div>
      </article>

      <article className="p-5 flex flex-row items-start gap-2 border border-gray-200">
        <div className="relative w-[50px] h-[50px] rounded-full bg-[#fd6c01] flex justify-center items-center">
          <img
            src="/public/mascota-clean.png"
            alt=""
            className="w-[40px]  object-cover rounded-full"
          />
          <div className="absolute -bottom-1 right-1 bg-white rounded-full w-[20px] h-[20px] flex justify-center items-center border border-gray-200">
            <IoIosSettings size={12} />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-lg font-bold">Sucursal Quito</h2>
          <h3 className="text-sm font-light text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Ratione optio
            rerum incidunt! Quo minus id voluptatibus inventore ab nisi illo
            similique. Necessitatibus aperiam veniam dolores molestiae eos, eum
            iure temporibus ipsa nulla distinctio voluptatum dolore reiciendis
            in sed quod neque. Aliquid sequi deserunt non reprehenderit itaque
            deleniti cum quas architecto.
          </h3>
        </div>
      </article> */}
    </main>
  )
}

export default Notifications
