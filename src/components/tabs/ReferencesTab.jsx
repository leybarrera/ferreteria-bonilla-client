import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import { referencesApi } from '../../api/index.api'
import { AxiosError } from 'axios'
import { MdDelete } from 'react-icons/md'

const ReferencesTab = () => {
  const { info } = useSelector((state) => state.user)
  const initialData = {
    name: '',
    email: '',
    phone: '',
    relationship: '',
  }

  const [reference, setReference] = useState(initialData)
  const [references, setReferences] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReference((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSave = () => {
    if (Object.values(reference).some((educ) => educ === '')) {
      toast.error('Todos los datos son obligatorios')
      return
    }

    referencesApi
      .save({
        ...reference,
        UserId: info.id,
      })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
        setReference(initialData)
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
  }

  const getAllData = () => {
    referencesApi
      .getByUserId(info.id)
      .then((res) => {
        const { userReferences } = res.data
        setReferences(userReferences)
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
  }

  const deleteReference = (id) => {
    referencesApi
      .delete(id)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
  }

  useEffect(() => {
    getAllData()
  }, [])
  return (
    <main className="flex flex-col">
      <div className="w-full max-w-[1000px] flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex lg:flex-row flex-col lg:items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={reference.name}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={reference.email}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
          </div>
          <div className="flex lg:flex-row lg:items-center flex-col gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={reference.phone}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Relación
              </label>
              <input
                type="text"
                name="relationship"
                onChange={handleChange}
                value={reference.relationship}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
          </div>

          <button
            className="mt-3 py-3 bg-[#fd6c01] text-lg text-white font-bold rounded-lg hover:bg-[#cb4d03] transition-colors cursor-pointer duration-300"
            onClick={handleSave}
          >
            Agregar
          </button>
        </div>
        {references.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#fd6c01]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teléfono
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Relación
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {references.map((ref) => (
                  <tr
                    className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                    key={ref.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-gray-500"
                    >
                      {ref.name}
                    </th>
                    <td className="px-6 py-4">{ref.phone}</td>
                    <td className="px-6 py-4">{ref.email}</td>
                    <td className="px-6 py-4">{ref.relationship}</td>

                    <td className="px-6 py-4 text-right">
                      <button
                        className="cursor-pointer text-red-800 hover:text-red-700 transition-all duration-300"
                        onClick={() => deleteReference(ref.id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Toaster richColors position="bottom-right" />
    </main>
  )
}

export default ReferencesTab
