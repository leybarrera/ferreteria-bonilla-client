import React, { useState, useRef, useEffect } from 'react'
import { GrClose } from 'react-icons/gr'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TbMessageChatbot } from 'react-icons/tb'
import { responses, rules } from '../../data/data'
import { useLocation } from 'react-router-dom'

const Chatbot = () => {
  const location = useLocation()
  const [showInput, setShowInput] = useState(false)
  const [question, setQuestion] = useState('')
  const messagesEndRef = useRef(null) // Aquí se hace referencia al contenedor de los mensajes
  const toggleShowInput = () => setShowInput((prev) => !prev)

  const [messages, setMessages] = useState([
    {
      type: 'system',
      text: 'Hola Cristhian, ¿En qué puedo ayudarte el día de hoy?',
    },
  ])

  const normalizedText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  const responseToUser = (question) => {
    const normalizedInput = normalizedText(question)

    for (const [key, synonyms] of Object.entries(rules)) {
      if (
        synonyms.some((synonym) =>
          normalizedInput.includes(normalizedText(synonym))
        )
      ) {
        const arrResponse = responses[key]
        const response =
          arrResponse[Math.floor(Math.random() * arrResponse.length)]
        setMessages((prev) => [
          ...prev,
          {
            type: 'system',
            text: response,
          },
        ])
      }
    }
  }

  const handleChange = (e) => {
    const { value } = e.target
    setQuestion(value)
  }

  const handleSendMessage = () => {
    const auxQuestion = question
    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        text: question,
      },
    ])

    setQuestion('')
    setTimeout(() => {
      responseToUser(auxQuestion)
    }, 1500)
  }

  // Aquí se asegura que el scroll siempre se desplace hacia abajo al agregar un mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const renderMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  }

  useEffect(() => {
    console.log(location)
  }, [showInput])

  return (
    <>
      {/* Chatbot */}
      <div
        className={`lg:w-[400px] lg:h-[600px] h-full w-full bg-white fixed lg:bottom-24 not-lg:top-0 lg:right-14 not-lg:left-0 z-50 rounded-xl border border-gray-300 flex flex-col overflow-hidden ${
          showInput ? 'block' : 'hidden'
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="w-full h-[70px] bg-[#fd6c01] flex flex-row items-center justify-between px-5">
          <h2 className="text-lg font-bold text-white">ChatBot</h2>
          <button
            onClick={toggleShowInput}
            className="cursor-pointer"
            type="button"
          >
            <MdOutlineKeyboardArrowDown size={30} color="white" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-white py-5">
          {/* Contenedor del chat (con scroll automático hacia abajo) */}
          <div className="overflow-y-auto flex-1 px-3 flex flex-col gap-5">
            {messages.map((msg, index) => {
              return msg.type === 'system' ? (
                <div
                  key={index}
                  className="flex flex-row gap-3 items-center justify-start"
                >
                  <div className="w-[40px] h-[40px] rounded-full bg-[#FD6C01] flex justify-center items-center">
                    <TbMessageChatbot color="white" size={20} />
                  </div>
                  <div className="w-[250px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
                    {renderMessage(msg.text)}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex flex-row gap-3 items-center justify-end"
                >
                  <div className="w-[250px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
                    <span>{msg.text}</span>
                  </div>
                </div>
              )
            })}
            {/* Este es el contenedor de referencia para hacer scroll hacia abajo */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de texto */}
          <div className="px-3">
            <input
              type="text"
              name="msg"
              value={question}
              id="msg"
              className="h-[40px] rounded-full bg-white w-full px-4 py-2 border border-gray-300 mt-4 m"
              placeholder="Escribe tutorial para guiarte"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (question.trim() === 'tutorial') {
                    const auxQuestion = `tutorial - ${
                      location.pathname === '/'
                        ? 'home'
                        : location.pathname.split('/')[1]
                    }`

                    setMessages((prev) => [
                      ...prev,
                      {
                        type: 'user',
                        text: question,
                      },
                    ])

                    setQuestion('')
                    setTimeout(() => {
                      responseToUser(auxQuestion)
                    }, 1500)
                  } else {
                    handleSendMessage()
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Botón para abrir/cerrar el chatbot */}
      <button
        type="button"
        className="w-[70px] h-[70px] rounded-full flex bg-[#fd6c01] justify-center items-center fixed bottom-3 right-10 hover:bg-[#fd6c01bb] cursor-pointer transition-all duration-300 border-2 border-gray-300"
        onClick={toggleShowInput}
      >
        {showInput ? (
          <GrClose size={30} color="white" />
        ) : (
          <TbMessageChatbot color="#ffffff" size={50} />
        )}
      </button>
    </>
  )
}

export default Chatbot
