import { IoArrowBackOutline } from 'react-icons/io5'
import { RiArrowLeftFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { authApi, codeApi } from '../../api/index.api'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const Recovery = () => {
  const [codeSending, setCodeSending] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({
    code: '',
    password: '',
  })
  const [email, setEmail] = useState('')
  const handleChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email.length === 0) {
      toast.error('El email es obligatorio')
      return
    }

    codeApi
      .recoveryPassword(email)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCodeSending(true)
      })
      .catch()
  }

  const changePassword = () => {
    if (data.code.length === 0 || data.password.length === 0) {
      toast.error('Todos los campos son obligatorios')
      return
    }
    authApi
      .changePassword({
        email,
        code: data.code,
        password: data.password,
      })
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
  return (
    <main className="absolute w-full h-screen top-0 left-0 bg-gray-100 overflow-hidden z-50 flex flex-col justify-center items-center px-10">
      <button
        className="absolute top-10 left-10 flex flex-row items-center gap-2 hover:text-[#fd6c01] transition-all duration-300 cursor-pointer"
        onClick={() => navigate('/inicio-sesion')}
      >
        <IoArrowBackOutline size={20} />
        <span className="text-lg font-bold">Volver</span>
      </button>

      {!codeSending ? (
        <div className="lg:w-[800px]  h-fit flex flex-col">
          <h2 className="text-center font-bold text-xl">
            Ingresa el correo asociado a tu cuenta para restablecer tu
            contraseña
          </h2>
          <div className="flex flex-col gap-2 lg:w-[500px] w-full mt-4  mx-auto">
            <input
              type="text"
              className="w-full  bg-gray-300 h-[60px] outline-none rounded-lg px-4"
              onChange={handleChange}
            />
            <button
              className="mt-3 w-full bg-[#fd6c01] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#fd6c01]/80 transition-all duration-300 cursor-pointer"
              onClick={handleSubmit}
              type="button"
            >
              Enviar código
            </button>
          </div>
        </div>
      ) : (
        <div className="lg:w-[800px]  h-fit flex flex-col">
          <h2 className="text-center font-bold text-xl">
            Ingresa el código enviado a tu correo electrónico y la nueva
            contraseña
          </h2>
          <div className="flex flex-col gap-2 lg:w-[500px] w-full mt-4  mx-auto">
            <input
              type="text"
              name="code"
              value={data.code}
              placeholder="Ingrese el codigo"
              className="w-full  bg-gray-300 h-[60px] outline-none rounded-lg px-4"
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Ingrese la nueva contraseña"
              className="w-full  bg-gray-300 h-[60px] outline-none rounded-lg px-4"
              onChange={handleInput}
            />
            <button
              className="mt-3 w-full bg-[#fd6c01] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#fd6c01]/80 transition-all duration-300 cursor-pointer"
              onClick={changePassword}
              type="button"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      )}

      <Toaster richColors position="bottom-right" />
    </main>
  )
}

export default Recovery
