import { useEffect } from 'react'
import { IoIosBusiness, IoIosSettings } from 'react-icons/io'
import { MdBusinessCenter } from 'react-icons/md'
import { notificationApi } from '../../api/index.api'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storageUtil } from '../../utils/index.utils'
import { useDispatch } from 'react-redux'
import { setNotifications } from '../../redux/slices/app.slice'

const Notifications = () => {
  const navigate = useNavigate()
  const [notificationsArr, setNotificationsArr] = useState([])
  const dispatch = useDispatch()

  const { info } = useSelector((state) => state.user)

  const markReadNotification = (id, type, relationId) => {
    const { token } = storageUtil.getData('session')
    notificationApi
      .markAsRead(id, token)
      .then((res) => {
        console.log(res.data)
        setNotificationsArr((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        )
        dispatch(
          setNotifications(
            notificationsArr.map((n) =>
              n.id === id ? { ...n, isRead: true } : n
            )
          )
        )
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        if (type === 'Offer') {
          navigate(`/offers/${relationId}`)
        }
      })
  }

  useEffect(() => {
    notificationApi.getAllByUserId(info.id).then((res) => {
      const { notifications } = res.data
      setNotificationsArr(notifications)
    })
  }, [])

  return (
    <main className="lg:w-[700px] mx-auto h-screen w-full bg-white mt-2 border border-gray-200 rounded-lg lg:px-0 ">
      {/* Notificaciones */}
      {notificationsArr.map((noti) => (
        <article
          className="p-5 flex flex-row items-start gap-2 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-300"
          key={noti.id}
          onClick={() =>
            markReadNotification(
              noti.id,
              noti.notificationType,
              noti.relationId
            )
          }
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
    </main>
  )
}

export default Notifications
