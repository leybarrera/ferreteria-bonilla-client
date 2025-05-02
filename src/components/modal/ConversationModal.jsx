import { useEffect } from 'react'
import { useState } from 'react'
import { RiCloseFill, RiRefreshFill, RiRefreshLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { messageApi } from '../../api/index.api'
import { storageUtil } from '../../utils/index.utils'
import { useRef } from 'react'

const ConversationModal = ({
  showConversation,
  toggleConversation,
  ReceiverId,
}) => {
  const { info } = useSelector((state) => state.admin)
  const [conversation, setConversation] = useState([])
  const messagesEndRef = useRef(null)

  const [text, setText] = useState('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e) => {
    const { value } = e.target
    setText(value)
  }

  const getConversation = () => {
    const { token } = storageUtil.getData('session')
    messageApi
      .getConversation(token, info.id, ReceiverId)
      .then((res) => {
        const { conversations } = res.data
        setConversation(conversations)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const reloadMessages = () => getConversation()

  const handleKeyDown = (e) => {
    const { token } = storageUtil.getData('session')
    if (e.key === 'Enter' && text.length > 0) {
      e.preventDefault()
      const newMessage = {
        SenderId: info.id,
        ReceiverId: ReceiverId,
        text: text,
      }
      setConversation((prev) => [...prev, newMessage])
      messageApi
        .sendMessage(token, newMessage)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      setText('')
      // toggleConversation()
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  useEffect(() => {
    // OBTENER MENSAJES
    getConversation()
  }, [showConversation, ReceiverId])

  return (
    <div
      className={`${
        showConversation ? 'flex' : 'hidden'
      } absolute w-full bg-black/50 top-0 left-0 z-50 justify-center items-center h-screen`}
    >
      <section
        className="lg:w-[800px] w-full h-[700px] bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden
      "
      >
        {/* Header */}
        <header className="w-full border-b border-gray-200 px-5 py-3 flex flex-row items-center justify-between bg-gray-800">
          <div className="flex flex-row gap-3">
            <img src="/user.png" alt="" className="w-[40px] rounded-full" />
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-white">
                Cristhian Rodríguez
              </h3>
              <h5 className="text-xs text-gray-400">Director de Desarrollo</h5>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <button
              className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
              onClick={reloadMessages}
            >
              <RiRefreshLine size={25} />
            </button>
            <button
              className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
              onClick={toggleConversation}
            >
              <RiCloseFill size={25} />
            </button>
          </div>
        </header>

        {/* Mensajes */}
        <main className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-5">
          {/* Simulando algunos mensajes */}
          {conversation.map((msg) => {
            return msg.ReceiverId !== info.id ? (
              <div className="flex flex-row gap-3 items-center justify-end">
                <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
                  <span>{msg.text}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-3 items-center justify-start">
                <img
                  src="/public/user.png"
                  alt="Foto de perfil"
                  className="w-[56px] h-[56px] rounded-full"
                />
                <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
                  <span className="text-sm">{msg.text}</span>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </main>

        {/* Input */}
        <footer className="w-full h-[100px] bg-white border-t border-gray-200 px-10 py-5">
          <textarea
            type="text"
            name="text"
            id="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={text}
            placeholder="Escribe un mensaje"
            className="w-full h-full outline-none border border-gray-300 rounded-lg px-5 py-3 resize-none bg-gray-100"
          />
        </footer>
      </section>
    </div>
  )
}

export default ConversationModal
