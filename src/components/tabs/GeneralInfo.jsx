import { useState } from 'react'
import { RiCamera3Fill, RiLoader4Fill, RiSave2Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import { userApi } from '../../api/index.api'
import { AxiosError } from 'axios'
import { storageUtil } from '../../utils/index.utils'

const GeneralInfo = () => {
  const [data, setData] = useState({})
  const [updating, setUpdating] = useState(false)
  const { info } = useSelector((state) => state.user)

  const [image, setImage] = useState(null)
  const [imageUri, setImageUri] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const uri = URL.createObjectURL(file)
      setImageUri(uri)
      setImage(file)
    }
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

  return (
    <main className="w-[800px] py-5 flex flex-col lg:px-0 ">
      {/* Imagen de perfil */}
      <div className="w-[150px] h-[150px] rounded-full border-4 border-[#fd6c01] relative">
        <img
          src={imageUri || info?.profilePicture || '/user.png'}
          alt="Imagen de perfil del usuario"
          className="w-full h-full object-cover rounded-full"
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
          className="w-12 h-12 rounded-full bg-[#fd6c01] absolute bottom-1 right-2 border border-gray-200 flex justify-center items-center cursor-pointer"
        >
          <RiCamera3Fill size={21} color="#fff" />
        </label>
      </div>

      {/* Data */}

      <div className="mt-10 lg:w-full flex flex-col md:w-[600px] w-[400px] lg:px-0">
        <div className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center mb-5">
          {/* Nombres */}
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="fullName">Nombres</label>
            <input
              type="text"
              name="fullName"
              value={info?.fullName}
              onChange={handleChange}
              className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-5"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="fullName">Cédula</label>
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
            <label htmlFor="email">Teléfono</label>
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
            <label htmlFor="fullName">Género</label>
            <select
              name="gender"
              className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-2"
              onChange={handleChange}
            >
              <option selected={!info?.gender} disabled>
                Elije tu género
              </option>
              <option value="Masculino" selected={info?.gender === 'Masculino'}>
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
            <label htmlFor="email">Dirección</label>
            <input
              type="text"
              name="residence"
              placeholder="Ciudad/Provincia"
              value={info?.address}
              onChange={handleChange}
              className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-5"
            />
          </div>
        </div>
      </div>

      <button
        className="lg:w-full md:w-[600px] w-[400px] flex flex-row items-center justify-center gap-2 py-3 bg-[#fd6c01] rounded-lg hover:bg-[#cb4d03] transition-colors duration-300 mt-3"
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

      <Toaster richColors position="bottom-right" />
    </main>
  )
}

export default GeneralInfo
