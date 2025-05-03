import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { messageApi } from '../../api/index.api'
import { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { IoIosSend } from 'react-icons/io'

import { IoSearch } from 'react-icons/io5'
import { dateUtil, storageUtil } from '../../utils/index.utils'
import { useRef } from 'react'
import { RiRefreshLine } from 'react-icons/ri'

const Messages = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const messagesEndRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [userConversation, setUserConversation] = useState({
    fullName: '',
    role: '',
  })
  const { senderId, receiverId } = useParams()
  const { info } = useSelector((state) => state.user)
  const [conversation, setConversation] = useState([])
  const [conversations, setConversations] = useState([])

  const [conversationsArr, setConversationsArr] = useState([])

  const toggleShowModal = () => setShowModal((prev) => !prev)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e) => {
    const { value } = e.target
    setText(value)
  }

  const sendMessage = () => {
    const { token } = storageUtil.getData('session')

    if (text.length > 0) {
      const newMessage = {
        SenderId: receiverId,
        ReceiverId: senderId,
        text: text,
      }

      const newConversation = [...conversation, newMessage]
      setConversation(newConversation)

      messageApi.sendMessage(token, newMessage).then((res) => {
        setText('')

        messageApi.getMyMessages(info.id).then((res) => {
          const { conversations } = res.data
          setConversations(conversations)
          const grouped = groupMessagesByUser(conversations, info.id)
          setConversationsArr(grouped)
        })
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const getConversations = () => {
    messageApi.getMyMessages(info.id).then((res) => {
      const { conversations } = res.data
      setConversations(conversations)
      const grouped = groupMessagesByUser(conversations, info.id)
      setConversationsArr(grouped)
    })
  }

  const reloadMessages = () => {
    getConversations()
  }

  const markAsRead = () => {
    const { token } = storageUtil.getData('session')
    messageApi.markAsRead(token, senderId, info.id).then((res) => {
      getConversations()
    })
  }

  const openConversation = (senderId, name, role) => {
    const { token } = storageUtil.getData('session')

    setUserConversation(() => ({
      fullName: name,
      role: role,
    }))

    messageApi.markAsRead(token, senderId, info.id).then((res) => {
      getConversations()
    })

    navigate(`/messages/${senderId}/${info.id}`)
    toggleShowModal()
  }

  // Agrupar mensaje
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
    if (senderId && receiverId) {
      const conversation = conversations.filter(
        (c) =>
          (c.SenderId === senderId && c.ReceiverId === receiverId) ||
          (c.SenderId === receiverId && c.ReceiverId === senderId)
      )
      setConversation(conversation)
    }
  }, [conversations])

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  useEffect(() => {
    messageApi.getMyMessages(info.id).then((res) => {
      const { conversations } = res.data
      setConversations(conversations)
      const grouped = groupMessagesByUser(conversations, info.id)
      setConversationsArr(grouped)
    })

    if (senderId && receiverId) {
      const conversation = conversations.filter(
        (c) =>
          (c.SenderId === senderId && c.ReceiverId === receiverId) ||
          (c.SenderId === receiverId && c.ReceiverId === senderId)
      )
      setConversation(conversation)
    }
  }, [senderId, receiverId])
  return (
    <>
      {' '}
      <main
        className={`lg:w-[1400px] h-full w-full mx-auto flex flex-col mt-2 bg-white rounded-lg border border-gray-200  `}
      >
        {/* Header */}
        <header className="w-full flex lg:flex-row flex-col lg:gap-5 items-center lg:px-10 px-5 lg:h-[70px] border border-gray-200 lg:py-0 py-5">
          <h2 className="text-lg font-bold">Mensajes</h2>
          {/* Buscador */}
          <div
            className="bg-gray-100 h-[40px] lg:w-[300px] w-full
         border border-gray-200 rounded-lg flex flex-row"
          >
            <div className="w-[40px] h-full flex justify-center items-center">
              <IoSearch size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar mensajes"
              className="w-full h-full outline-none px-2 text-sm"
            />
          </div>
        </header>

        {/* Filtros */}
        <div className="w-full h-[50px] border-b border-gray-200 flex flex-row items-center gap-2 px-10">
          <button className="h-[30px] px-5 rounded-full bg-[#fd6c01] text-white text-sm font-bold cursor-pointer hover:bg-[#cb4d03] transition-all duration-300">
            Todos
          </button>
          <button className="h-[30px] px-5 rounded-full text-sm font-bold border border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 cursor-pointer">
            No leídos
          </button>
        </div>

        {/* Inbox */}
        <section className="w-full flex flex-row lg:h-[700px]">
          <aside className="lg:w-[350px] w-full h-full bg-white flex flex-col border-r border-gray-200 overflow-y-auto">
            {/* Mensajes */}
            {conversationsArr.map((cnv) => (
              <article
                className={`border-b border-gray-200 relative flex flex-row gap-2 items-start px-5 py-5 cursor-pointer hover:bg-gray-100 transition-all duration-300 ${
                  cnv.unreadCount > 0 && 'bg-gray-100'
                }`}
                onClick={() =>
                  openConversation(
                    cnv.user.id,
                    cnv.user.fullName,
                    cnv.user.role
                  )
                }
              >
                {/* Foto de perfil */}
                <img
                  src={
                    cnv.user.profilePicture
                      ? cnv.user.profilePicture
                      : '/user.png'
                  }
                  alt="Foto de perfil"
                  className="w-[56px] h-[56px] rounded-full"
                />

                {/* Información */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold">{cnv.user.fullName}</h3>
                  {/* Mensaje de truncamiento */}
                  <p className="text-sm text-gray-600 truncate max-w-[200px]">
                    {cnv.lastMessage.Sender.id === info.id
                      ? 'Tú'
                      : cnv.lastMessage.Sender.fullName.split(' ')[0]}
                    : {cnv.lastMessage.text}
                  </p>

                  <span className="text-xs text-gray-400">
                    {dateUtil.formatedDate(cnv.lastMessage.senderAt)}
                  </span>
                </div>

                {cnv.unreadCount > 0 && (
                  <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#fd6c01] text-white text-xs w-[30px] h-[30px] flex justify-center items-center">
                    {cnv.unreadCount}
                  </span>
                )}
              </article>
            ))}
          </aside>
          {/* Mensaje */}
          {conversation.length > 0 && (
            <section
              className={`lg:flex-1 h-full bg-white relative lg:flex lg:flex-col hidden `}
            >
              {/* Header */}
              <header className="w-full border-b border-gray-200 px-5 py-3 flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold">
                    {userConversation.fullName}
                  </h3>
                  <h5 className="text-xs text-gray-400">
                    {userConversation.role}
                  </h5>
                </div>

                <button
                  className="text-[#fd6c01] hover:text-[#cb4d03] transition-all duration-300 cursor-pointer"
                  onClick={reloadMessages}
                >
                  <RiRefreshLine size={20} />
                </button>
              </header>

              {/* Mensajes */}
              <main className="w-full flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-5">
                {conversation.map((cnv) => {
                  if (cnv.SenderId === info.id) {
                    return (
                      <div className="flex flex-row gap-3 items-center justify-end">
                        <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
                          <span>{cnv.text}</span>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className="flex flex-row gap-3 items-center justify-start">
                        <img
                          src={
                            cnv.Sender.profilePicture
                              ? cnv.Sender.profilePicture
                              : '/user.png'
                          }
                          alt="Foto de perfil"
                          className="w-[56px] h-[56px] rounded-full"
                        />
                        <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
                          <span className="text-sm">{cnv.text}</span>
                        </div>
                      </div>
                    )
                  }
                })}

                <div ref={messagesEndRef} />
              </main>

              {/* input */}
              <footer className="w-full h-[150px] bg-white border-t border-gray-200 px-10 py-5">
                <textarea
                  name="text"
                  id="text"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={markAsRead}
                  value={text}
                  placeholder="Escriba su mensaje"
                  className="w-full h-full outline-none border border-gray-300 rounded-lg px-5 py-3 resize-none bg-gray-100"
                />
              </footer>
            </section>
          )}
        </section>
      </main>
      {showModal && (
        <div
          className={`lg:hidden absolute w-full h-screen top-0 left-0 bg-white z-50 ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } transition-all duration-300 flex flex-col`}
        >
          <header className="px-5 py-3 flex flex-row items-center gap-5 border border-gray-200">
            <button type="button" onClick={toggleShowModal}>
              <GoArrowLeft size={25} />
            </button>

            <h3 className="text-xl font-bold">{userConversation.fullName}</h3>
          </header>

          <main className="w-full flex-1 overflow-y-auto px-5 py-3 pb-24 flex flex-col gap-5">
            {conversation &&
              conversation.map((cnv) => {
                if (cnv.SenderId === info.id) {
                  return (
                    <div className="flex flex-row gap-3 items-center justify-end">
                      <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
                        <span>{cnv.text}</span>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <img
                        src={
                          cnv.Sender.profilePicture
                            ? cnv.Sender.profilePicture
                            : '/user.png'
                        }
                        alt="Foto de perfil"
                        className="w-[56px] h-[56px] rounded-full"
                      />
                      <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
                        <span className="text-sm">{cnv.text}</span>
                      </div>
                    </div>
                  )
                }
              })}
            <div ref={messagesEndRef} />
          </main>

          <footer className="absolute bottom-0 left-0 w-full h-[100px] border-t border-gray-200 px-5 py-3 flex flex-row items-center bg-white">
            <textarea
              name="text"
              id="text"
              placeholder="Escriba su mensaje"
              onFocus={markAsRead}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={text}
              className="w-full h-full outline-none border border-gray-300 rounded-lg px-5 py-3 resize-none bg-gray-100"
            />

            <button
              className="w-[60px] flex justify-center items-center cursor-pointer"
              onClick={sendMessage}
            >
              <IoIosSend size={25} />
            </button>
          </footer>
        </div>
      )}
    </>
  )
}

export default Messages
