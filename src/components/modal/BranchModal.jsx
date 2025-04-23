import { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { provinces } from '../../data/data'
import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { branchApi } from '../../api/index.api'
import { storageUtil } from '../../utils/index.utils'
import { AxiosError } from 'axios'
import Swal from 'sweetalert2'

const BranchModal = ({ showModal, toggleModal, branchId }) => {
  const initialState = {
    name: '',
    address: '',
    phone: '',
    province: '',
    city: '',
    email: '',
    isMain: false,
  }
  const [branch, setBranch] = useState(initialState)
  const [province, setProvince] = useState('')
  const [cities, setCities] = useState([])

  const handleClose = () => {
    setBranch(initialState)
    setProvince('')
    setCities([])
    toggleModal()
  }

  const handleProvince = (e) => {
    const { value } = e.target
    setProvince(value)
    setCities(provinces[value])
    setBranch((prev) => ({
      ...prev,
      province: value,
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBranch((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    const { token } = storageUtil.getData('session')
    e.preventDefault()
    if (Object.values(branch).some((data) => data === '')) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    if (!branchId) {
      branchApi
        .save(token, branch)
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          setBranch({
            name: '',
            address: '',
            email: '',
            phone: '',
            province: '',
            city: '',
            isMain: false,
          })
          setProvince('')
          setCities([])

          setTimeout(() => {
            toggleModal()
          }, 2500)
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response.data.message)
          } else {
            toast.error('Error desconocido. Intente más tarde.')
          }
        })
    } else {
      branchApi
        .update(token, branch, branchId)
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          setTimeout(() => {
            toggleModal()
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
  }

  const handleMain = (e) => {
    const { checked } = e.target
    setBranch((prev) => ({
      ...prev,
      isMain: checked,
    }))
  }

  useEffect(() => {
    if (branchId) {
      const { token } = storageUtil.getData('session')
      branchApi
        .getById(token, branchId)
        .then((res) => {
          const { branch } = res.data
          setBranch(branch)
          setProvince(branch.province)
          setCities(provinces[branch.province])
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response.data.message)
          } else {
            toast.error('Error desconocido. Intente más tarde.')
          }
        })
    } else {
      setBranch(initialState)
    }
  }, [branchId])

  return (
    <div
      className={`${
        showModal ? 'block' : 'hidden'
      } absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center lg:px-0 px-5`}
    >
      <div className="lg:w-[800px] w-full h-fit bg-white border border-gray-200 rounded-lg overflow-hidden z-50">
        <header className="flex flex-row items-center justify-between border-b border-gray-200 p-5 bg-gray-200">
          <h2 className="text-xl font-bold">Nueva Sucursal</h2>
          <button
            className="w-[30px] h-[30px] rounded-full bg-red-600 flex justify-center items-center cursor-pointer"
            onClick={handleClose}
          >
            <RiCloseLine color="white" />
          </button>
        </header>
        <div className="flex flex-row">
          {/* Formulario */}
          <div className="p-5 flex-1">
            <form>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="" className="font-semibold">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={branch.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-lg h-[50px] border border-gray-300 px-5 outline-none"
                />
              </div>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={branch.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded-lg h-[50px] border border-gray-300 px-5 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={branch.email}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded-lg h-[50px] border border-gray-300 px-5 outline-none"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Provincia
                  </label>
                  <select
                    id="province"
                    name="province"
                    onChange={handleProvince}
                    className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
                  >
                    <option selected={branch.province === ''}>
                      Elija la provincia
                    </option>
                    {Object.keys(provinces).map((province) => (
                      <option
                        value={province}
                        selected={branch.province === province}
                      >
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Ciudad
                  </label>
                  <select
                    disabled={province === ''}
                    id="city"
                    name="city"
                    onChange={handleChange}
                    className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300 disabled:cursor-not-allowed"
                  >
                    <option selected={branch.city === ''}>
                      Elija el cantón
                    </option>
                    {cities.map((city) => (
                      <option value={city} selected={branch.city === city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="" className="font-semibold">
                  Dirección
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={branch.address}
                  name="address"
                  className="w-full bg-gray-100 rounded-lg h-[50px] border border-gray-300 px-5 outline-none"
                />
              </div>

              <label class="inline-flex items-center mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  value={branch.isMain}
                  class="sr-only peer"
                  checked={branch.isMain}
                  onChange={handleMain}
                />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Sucursal principal
                </span>
              </label>

              <div className="flex flex-row items-center gap-2 justify-between mb-5">
                <button className="flex-1 h-[50px] bg-gray-600 text-white rounded-xl text-lg font-bold border border-gray-600 hover:bg-gray-700 transition-all duration-300 cursor-pointer">
                  Limpiar
                </button>
                <button
                  className="flex-1 h-[50px] bg-blue-700 text-white rounded-xl text-lg font-bold border border-blue-600 hover:bg-blue-800 transition-all duration-300 cursor-pointer"
                  onClick={handleSubmit}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  )
}

export default BranchModal
