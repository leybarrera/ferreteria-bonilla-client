import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdLock } from 'react-icons/md'
import { RiCamera3Fill, RiLoader4Fill, RiSave2Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { userApi } from '../../api/index.api'
import { storageUtil } from '../../utils/index.utils'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'

const Config = () => {
  const { info } = useSelector((state) => state.user)
  const [data, setData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordMatch, setPasswordMatch] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [updating, setUpdating] = useState(false)

  const [image, setImage] = useState(null)
  const [imageUri, setImageUri] = useState(null)

  const handlePassword = (e) => {
    const { value } = e.target
    setPassword(value)
  }

  const handleConfirmPassword = (e) => {
    const { value } = e.target
    const isValid = value === password
    setPasswordMatch(isValid)
    setConfirmPassword(value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const uri = URL.createObjectURL(file)
      setImageUri(uri)
      setImage(file)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    const formData = new FormData()

    if (Object.keys(data).length === 0 && image === null) {
      toast.error('No hay datos para actualizar')
      return
    }

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    if (image) {
      formData.append('profilePicture', image)
      userApi
        .updateWithImage(formData, info.id)
        .then((res) => {
          const { message, user } = res.data
          storageUtil.updateData('session', user)
          toast.success(message)
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            const { message } = err.response.data
            toast.error(message)
          } else {
            toast.error('Error desconocido. Intente más tarde.')
          }
        })
        .finally(() => {
          setData({})
        })
      // Actualizar con imaagen
    } else {
      // Actualizar sin imagen

      userApi
        .updateWithoutImage(formData, info.id)
        .then((res) => {
          const { message, user } = res.data
          storageUtil.updateData('session', user)
          toast.success(message)
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            const { message } = err.response.data
            toast.error(message)
          } else {
            toast.error('Error desconocido. Intente más tarde.')
          }
        })
        .finally(() => {
          setData({})
        })
    }
  }

  const handleUpdatePassword = () => {
    const { token } = storageUtil.getData('session')
    if (passwordMatch) {
      userApi.updatePassword(token, { password }, info.id).then((res) => {
        const { message } = res.data
        toast.success(message)
        setPassword('')
        setConfirmPassword('')
        setPasswordMatch(false)
      })
    } else {
      toast.error('Las contrasenas no coinciden')
    }
  }

  return (
    <main className="w-full h-full flex lg:px-10 py-20 md:px-5 px-2 flex-col">
      <h2 className="text-3xl font-bold">Configuración</h2>
      {/* Configuracion general */}
      <section className="flex flex-col gap-3 my-10">
        {/* Imagen de perfil */}
        <div className="w-[150px] h-[150px] rounded-full border-4 border-[#fd6c01] relative">
          <img
            src={imageUri || info?.profilePicture || '/user.png'}
            alt="Foto de perfil"
            className="h-full w-full object-cover rounded-full"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="imageUpload"
            onChange={handleImageChange}
          />

          <label
            htmlFor="imageUpload"
            className="w-12 h-12 rounded-full bg-[#fd6c01] absolute bottom-1 right-2 border-gray-200 flex justify-center items-center cursor-pointer"
          >
            <RiCamera3Fill size={21} color="#fff" />
          </label>
        </div>

        {/* Data */}
        <div className="mt-10 lg:w-[1200px] flex flex-col md:w-[600px] w-[400px] lg:px-0">
          <div className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center mb-5">
            {/* Nombres */}
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fullName" className="font-bold text-lg">
                Nombres
              </label>
              <input
                type="text"
                name="fullName"
                value={info?.fullName}
                onChange={handleChange}
                className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-5"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="email" className="font-bold text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={info?.email}
                disabled
                className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-5 disabled:bg-gray-300"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center mb-5">
            {/* Nombres */}
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fullName" className="font-bold text-lg">
                Cédula
              </label>
              <input
                type="text"
                pattern="[0-9]"
                name="dni"
                value={info?.dni}
                onChange={(e) => {
                  const { value } = e.target
                  if (isNaN(value)) {
                    e.target.value = ''
                    return
                  }
                  handleChange(e)
                }}
                disabled={info?.dni !== null}
                className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-5 disabled:bg-gray-300"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="email" className="font-bold text-lg">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={info?.phone}
                pattern="[0-9]"
                onChange={(e) => {
                  const { value } = e.target
                  if (isNaN(value)) {
                    e.target.value = ''
                    return
                  }
                  handleChange(e)
                }}
                className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-5"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center mb-5">
            {/* Nombres */}
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fullName" className="font-bold text-lg">
                Género
              </label>
              <select
                name="gender"
                className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-2"
                onChange={handleChange}
              >
                <option selected={!info?.gender} disabled>
                  Elije tu género
                </option>
                <option
                  value="Masculino"
                  selected={info?.gender === 'Masculino'}
                >
                  Masculino
                </option>
                <option value="Femenino" selected={info?.gender === 'Femenino'}>
                  Femenino
                </option>
                <option value="Otro" selected={info?.gender === 'Otro'}>
                  Otro
                </option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="email" className="font-bold text-lg">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                placeholder="Ingresa tu dirección"
                value={info?.address}
                onChange={handleChange}
                className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-5"
              />
            </div>
          </div>
        </div>
        <button
          className=" lg:w-[1200px] md:w-[600px] w-[400px] flex flex-row items-center justify-center gap-2 py-3 bg-[#fd6c01] rounded-lg hover:bg-[#cb4d03] transition-colors duration-300 mt-3"
          onClick={handleSubmit}
        >
          {updating ? (
            <>
              <RiLoader4Fill size={25} color="white" className="animate-spin" />
              <p className="text-white text-xl font-bold">Actualizando</p>
            </>
          ) : (
            <>
              <RiSave2Line size={25} color="white" />
              <p className="text-white text-xl font-bold">Actualizar</p>
            </>
          )}
        </button>
      </section>

      <h2 className="text-3xl font-bold">Seguridad</h2>
      <section className="flex flex-col gap-3 ">
        <div className="mt-10 lg:w-[1200px] flex flex-col md:w-[600px] w-[400px] lg:px-0">
          <div className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center mb-5">
            {/* Nombres */}
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fullName" className="font-bold text-lg">
                Nueva contraseña
              </label>
              <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                  <MdLock size={30} color="white" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handlePassword}
                  value={password}
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

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fullName" className="font-bold text-lg">
                Confirmar contraseña
              </label>
              <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                  <MdLock size={30} color="white" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
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

          {password.length > 0 && !passwordMatch && (
            <p className="text-sm text-red-500 font-bold">
              * Las contraseñas no coinciden. Por favor, intenta nuevamente.
            </p>
          )}

          <button
            className=" lg:w-[1200px] md:w-[600px] w-[400px] flex flex-row items-center justify-center gap-2 py-3 bg-[#fd6c01] rounded-lg hover:bg-[#cb4d03] transition-colors duration-300 mt-3 text-white font-bold text-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!passwordMatch}
            onClick={handleUpdatePassword}
          >
            Cambiar contraseña
          </button>
        </div>
      </section>

      <Toaster richColors position="bottom-right" />
    </main>
  )
}

export default Config
