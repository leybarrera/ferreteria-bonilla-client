import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail, MdLock } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { clientId } from '../../config/index.config'
import { authApi } from '../../api/index.api'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'
import { storageUtil } from '../../utils/index.utils'
import { setInfo } from '../../redux/slices/user.slice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Login = () => {
  const { info } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  const handleChange = (e) => {
    const { name, value } = e.target

    setCredentials((credential) => ({
      ...credential,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentialsExists = Object.values(credentials).every(
      (data) => data !== ''
    )
    if (!credentialsExists) {
      toast.error('Todos los datos son obligatorios')
      return
    }

    authApi
      .loginWithCredentials(credentials)
      .then((res) => {
        const { user } = res.data
        storageUtil.saveData('session', res.data)
        toast.success(`Bienvenido ${user.fullName}`)

        setTimeout(() => {
          if (user.role === 'Candidato') {
            dispatch(setInfo(user))
            navigate('/')
          } else {
            dispatch(setInfo(user))
            navigate('/dashboard')
          }
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

  const handleGoogleSuccess = (response) => {
    const decoded = jwtDecode(response.credential)
    const { sub } = decoded
    authApi
      .loginWithGoogle(sub)
      .then((res) => {
        const { user } = res.data
        dispatch(setInfo(user))
        storageUtil.saveData('session', res.data)
        toast.success(`Bienvenido ${user.fullName}`)

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

  useEffect(() => {
    const session = storageUtil.getData('session')

    if (session) {
      if (info.role === 'Administrador' || info.role === 'Reclutador') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }
  }, [])
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main className="w-full h-screen overflow-hidden flex flex-row">
        <section className="flex- w-[600px] mx-auto md:[400px] px-5 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img src="/public/mascota.png" alt="" className="w-32 h-32" />
            <img src="/public/encabezado.png" alt="" />
          </div>
          <form
            action=""
            className="w-full flex flex-col gap-y-5 mt-12"
            onSubmit={handleSubmit}
          >
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

            <div className="flex justify-end opacity-80 text-[15px]">
              <NavLink
                to={'/recuperacion'}
                className="hover:opacity-60 transition"
              >
                ¿Olvidaste tu contraseña?
              </NavLink>
            </div>

            <button
              type="submit"
              className="w-full bg-[#fd6c01] text-lg uppercase font-bold text-white py-4 flex justify-center items-center rounded-lg hover:bg-[#cb4d03] transition-colors cursor-pointer"
            >
              Iniciar sesión
            </button>

            <div className="flex items-center justify-center mt-5">
              <p>
                ¿Aún no tienes una cuenta?. Registrate{' '}
                <NavLink
                  to="/registro"
                  className="text-[#fd6c01] font-bold hover:text-[#cb4d03] transition"
                >
                  aquí
                </NavLink>
                .
              </p>
            </div>
          </form>
          <div className="mt-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        </section>

        <Toaster richColors position="bottom-right" />
      </main>
    </GoogleOAuthProvider>
  )
}

export default Login
