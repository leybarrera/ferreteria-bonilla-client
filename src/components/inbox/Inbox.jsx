import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { messageApi } from '../../api/index.api'
import { useState } from 'react'
import { dateUtil } from '../../utils/index.utils'

const Inbox = ({ showInbox }) => {
  const { info } = useSelector((state) => state.user)
  const [messagesArr, setMessagesArr] = useState([])

  const groupMessagesByUser = (messages, currentUserId) => {
    const grouped = {}

    messages.forEach((msg) => {
      const isIncoming = msg.ReceiverId === currentUserId
      const otherUser =
        msg.SenderId === currentUserId ? msg.Receiver : msg.Sender

      if (!grouped[otherUser.id]) {
        grouped[otherUser.id] = {
          user: otherUser,
          lastMessage: msg,
          unreadCount: 0,
        }
      }

      // Contar si es un mensaje entrante no leído
      if (isIncoming && !msg.isRead) {
        grouped[otherUser.id].unreadCount += 1
      }

      // Actualizar último mensaje si es más reciente
      const existingTime = new Date(grouped[otherUser.id].lastMessage.senderAt)
      const newTime = new Date(msg.senderAt)
      if (newTime > existingTime) {
        grouped[otherUser.id].lastMessage = msg
      }
    })

    return Object.values(grouped)
  }

  useEffect(() => {
    messageApi.getMyMessages(info.id).then((res) => {
      const { conversations } = res.data
      const grouped = groupMessagesByUser(conversations, info.id)
      console.log(grouped)
      setMessagesArr(grouped)
    })
  }, [])

  return (
    <div
      className={`absolute top-full right-0 min-h-[500px] h-fit bg-gray-100 border border-gray-200 w-[400px]  z-50 rounded-xl mt-1 flex flex-col ${
        showInbox ? 'block' : 'hidden'
      } transition-all duration-300`}
    >
      {/* Sections Header */}
      <section className="px-5 py-3 flex flex-row items-center">
        <h3 className="text-xl font-bold text-[#fd6c01]">Mensajes</h3>
      </section>

      {/* Section Messages */}
      <section className="flex flex-col px-2 gap-2 flex-1">
        {messagesArr && messagesArr.length > 0 ? (
          messagesArr.map((message) => (
            <article
              className="px-5 py-3 rounded-lg flex flex-row gap-2 items-center hover:bg-gray-200 cursor-pointer transition-all duration-300"
              key={message.id}
            >
              {/* Foto de perfil */}
              <img
                src={
                  message.user.profilePicture
                    ? message.user.profilePicture
                    : '/user.png'
                }
                alt="Foto de perfil del usuario"
                className="w-[56px] h-[56px] rounded-full"
              />

              {/* Nombre mensaje */}

              <div className="flex-1 flex-col max-w-[220px] min-w-[220px]">
                <h3 className="text-sm font-bold">{message.user.fullName}</h3>
                <h5 className="text-xs truncate w-full overflow-hidden whitespace-nowrap">
                  {message.lastMessage.text}
                </h5>
                <span className="text-xs font-bold">
                  {dateUtil.formatedDate(message.lastMessage.senderAt)}
                </span>
              </div>

              <div className="flex-1 flex justify-center items-center">
                <span className="text-xs font-bold text-[#FD6C01] bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center">
                  {message.unreadCount}
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center flex-1">
            <h2>No tienes mensajes</h2>
          </div>
        )}
      </section>
      {messagesArr && messagesArr.length > 0 && (
        <div
          className="absolute bottom-0 left-0 w-full h-[50px] flex flex-row items-center
      justify-center bg-gray-200/30 border-t border-gray-200"
        >
          <NavLink
            to={'/messages'}
            className="text-[#FD6C01] font-bold hover:text-[#ff850b] transition-all duration-300"
          >
            Ver todos los mensajes
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Inbox
