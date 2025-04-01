import { useState } from 'react'
import { FaEye, FaEyeSlash, FaIdCard, FaUser } from 'react-icons/fa'
import { MdEmail, MdLock, MdPhone } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { clientId } from '../../config/index.config'
import { userApi } from '../../api/index.api'
import { AxiosError } from 'axios'
import { storageUtil } from '../../utils/index.utils'

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    full_name: null,
    email: null,
    password: null,
    phone: null,
    dni: null,
    profile_picture: null,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword((prev) => !prev)
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev)

  const handleChange = (e) => {
    const { name, value } = e.target

    setUser((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentialsExists = Object.values(user).every((data) => data !== '')
    if (!credentialsExists) {
      toast.error('Todos los datos son obligatorios')
    }
  }

  const handleGoogleSuccess = (response) => {
    const decoded = jwtDecode(response.credential)
    const { email, sub, name, picture } = decoded
    const dataUser = {
      email,
      fullName: name,
      profilePicture: picture,
      sub,
    }
    setUser((prev) => ({
      ...prev,
      fullName: name,
      profilePicture: picture,
      sub,
      email,
    }))

    userApi
      .registerWithGoogle(dataUser)
      .then((res) => {
        toast.success(`${res.data.message}. Bienvenido.`)
        storageUtil.saveData('user-session', {
          'user-info': res.data.user,
          token: res.data.token,
        })
        setTimeout(() => {
          navigate('/')
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

  const handleGoogleFailure = () => {
    toast.error('Error al autenticar con Google')
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main className="w-full h-full flex flex-row py-10">
        <section className="flex- w-[1200px] mx-auto md:[400px] px-5 flex flex-col  items-center ">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img src="/public/mascota.png" alt="" className="w-32 h-32" />
            <img src="/public/encabezado.png" alt="" />
          </div>
          <form
            action=""
            className="w-full flex flex-col gap-y-5 mt-12"
            onSubmit={handleSubmit}
          >
            <div className="grid lg:grid-cols-2 lg:gap-x-2 gap-y-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Nombres
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <FaUser size={25} color="white" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Cédula
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <FaIdCard size={25} color="white" />
                  </div>
                  <input
                    type="text"
                    name="dni"
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 lg:gap-x-2 gap-y-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Correo electrónico
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdEmail size={30} color="white" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Teléfono
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdPhone size={30} color="white" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-x-2 gap-y-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Contraseña
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdLock size={30} color="white" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                  <button
                    type="button"
                    className="w-[70px] h-full flex justify-center items-center cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <FaEye size={25} color="#bdbdbd" />
                    ) : (
                      <FaEyeSlash size={25} color="#bdbdbd" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Confirmar contraseña
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdLock size={30} color="white" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm-password"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                  <button
                    type="button"
                    className="w-[70px] h-full flex justify-center items-center cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <FaEye size={25} color="#bdbdbd" />
                    ) : (
                      <FaEyeSlash size={25} color="#bdbdbd" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end opacity-80 text-[15px]">
              <p className="flex flex-row items-center gap-1">
                ¿Ya tienes una cuenta?.
                <NavLink
                  to="/inicio-sesion"
                  className="text-[#fd6c01] font-bold hover:text-[#cb4d03] transition"
                >
                  Iniciar sesión
                </NavLink>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#fd6c01] text-lg uppercase font-bold text-white py-4 flex justify-center items-center rounded-lg hover:bg-[#cb4d03] transition-colors cursor-pointer"
            >
              Registrarme
            </button>
          </form>

          <div className="mt-10">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              text="signup_with"
            />
          </div>
        </section>

        <Toaster richColors position="bottom-right" />
      </main>
    </GoogleOAuthProvider>
  )
}

export default Register
