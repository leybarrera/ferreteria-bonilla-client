import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { codeApi } from '../../api/index.api'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'

const Activation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [expirationTime, setExpirationTime] = useState(null) // Guardaremos la hora de expiración
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(0) // Tiempo restante en segundos
  const input1Ref = useRef(null)
  const input2Ref = useRef(null)
  const input3Ref = useRef(null)
  const input4Ref = useRef(null)
  const input5Ref = useRef(null)
  const input6Ref = useRef(null)

  // Manejo de la entrada de cada dígito
  const handleChange = (text, index) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    const validCode = newCode.every((data) => data !== '')
    setIsValid(validCode)

    if (text.length === 1 && index < 5) {
      const refs = [input2Ref, input3Ref, input4Ref, input5Ref, input6Ref]
      refs[index]?.current?.focus()
    }
  }

  // Función para validar la cuenta con el código
  const validateAccount = () => {
    const codeString = code.join('')
    codeApi
      .validateAccount(email, codeString)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setTimeout(() => {
          navigate('/inicio-sesion')
        }, 2500)
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
  }

  // Función para reenviar el código
  const resendCode = () => {
    codeApi
      .resendCode(email, 'Activación')
      .then((res) => {
        const { expirationTime } = res.data
        setExpirationTime(expirationTime)
        toast.success('Nuevo código enviado a tu correo electrónico')
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
  }

  // Al montar el componente, extraemos email y expirationTime desde el estado de la URL
  useEffect(() => {
    if (location.state) {
      const { email, expirationTime } = location.state
      console.log((new Date(expirationTime).getTime() - new Date()) / 1000)
      setEmail(email)
      setExpirationTime(expirationTime)
    }
  }, [location])

  // Lógica para actualizar el temporizador
  useEffect(() => {
    if (expirationTime) {
      const timerInterval = setInterval(() => {
        const currentTime = Date.now()
        const remainingTime = Math.max(
          0,
          Math.floor((new Date(expirationTime).getTime() - currentTime) / 1000)
        ) // El tiempo restante en segundos

        if (remainingTime === 0) {
          clearInterval(timerInterval) // Detener el temporizador si se llegó a 0
        }

        setTimeLeft(remainingTime) // Actualizar el estado con el tiempo restante
      }, 1000)

      return () => clearInterval(timerInterval) // Limpiar el interval al desmontar el componente
    }
  }, [expirationTime])

  // Formatear el tiempo restante en minutos:segundos
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="absolute w-full h-screen top-0 left-0 bg-gray-100 overflow-hidden z-50 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold text-[#fd6c01] lg:px-0 px-5">
        Gracias por registrarte en nuestra plataforma
      </h2>
      <h3 className="text-center mt-5 text-lg font-medium text-gray-600 lg:px-0 px-5">
        Para confirmar que realmente usaste tus datos personales, debes activar
        tu cuenta. Para ello, enviamos un código de activación a tu correo
        electrónico.
      </h3>
      <h5 className="text-center mt-5 text-lg font-medium text-gray-600 lg:px-0 px-5">
        Por favor, revisa tu bandeja de entrada, no olvides revisar la carpeta
        de SPAM.
      </h5>

      {/* div de código */}
      <div className="lg:w-[700px] lg:h-[150px] md:h-[150px] h-[100px] mt-5 flex flex-row justify-between lg:gap-2 gap-1 lg:px-0 px-3">
        {[input1Ref, input2Ref, input3Ref, input4Ref, input5Ref, input6Ref].map(
          (ref, index) => (
            <input
              key={index}
              type="text"
              className="w-full h-full bg-white border border-gray-200 rounded-2xl text-center text-6xl"
              maxLength={1}
              pattern="[0-9]"
              ref={ref}
              onChange={(e) => {
                const { value } = e.target
                if (isNaN(value)) {
                  e.target.value = ''
                  return
                }
                handleChange(value, index)
              }}
            />
          )
        )}
      </div>

      <button
        type="button"
        className="mt-5 bg-[#fd6c01] text-white lg:w-[700px] h-[60px] w-[90%] rounded-lg font-bold cursor-pointer hover:bg-[#cb4d03] transition-all duration-300 text-2xl disabled:bg-gray-500"
        disabled={!isValid}
        onClick={validateAccount}
      >
        Activar cuenta
      </button>

      {/* Temporizador */}
      <div className="mt-4 text-lg font-medium text-gray-600">
        {timeLeft > 0 ? (
          <p>Puedes solicitar un nuevo código en {formatTime(timeLeft)}.</p>
        ) : (
          <button className="text-[#fd6c01] font-bold" onClick={resendCode}>
            Solicitar un nuevo código
          </button>
        )}
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  )
}

export default Activation
