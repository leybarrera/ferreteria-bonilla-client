import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import { userEducationApi } from '../../api/index.api'
import { MdDelete } from 'react-icons/md'
import { AxiosError } from 'axios'

const EducationTab = () => {
  const { info } = useSelector((state) => state.user)
  const initialData = {
    institution: null,
    degree: null,
    fieldOfStudy: null,
    startYear: null,
  }
  const [education, setEducation] = useState(initialData)
  const [educations, setEducations] = useState([])

  const getAllData = () => {
    userEducationApi.getByUserId(info.id).then((res) => {
      const { userEducations } = res.data
      setEducations(userEducations)
    })
  }

  const deleteEducation = (id) => {
    userEducationApi
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

  const handleDate = (e) => {
    const { name, value } = e.target
    const year = value.split('-')[0]
    setEducation((prev) => ({
      ...prev,
      [name]: year,
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    if (Object.values(education).some((educ) => !educ)) {
      toast.error('Todos los datos son obligatorios')
      return
    }

    userEducationApi
      .save({
        ...education,
        UserId: info.id,
      })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
        setEducation(initialData)
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
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Institución
              </label>
              <input
                type="text"
                name="institution"
                onChange={handleChange}
                value={education.institution}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Título
              </label>
              <input
                type="text"
                name="degree"
                value={education.degree}
                onChange={handleChange}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="" className="text-lg font-semibold">
              Campo de estudio
            </label>
            <input
              type="text"
              name="fieldOfStudy"
              value={education.fieldOfStudy}
              onChange={handleChange}
              className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="startYear"
                onChange={handleDate}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Fecha Fin
              </label>
              <input
                type="date"
                name="endYear"
                onChange={handleDate}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
          </div>

          <button
            className="mt-3 py-3 bg-[#fd6c01] text-lg text-white font-bold rounded-lg hover:bg-[#cb4d03] transition-colors"
            onClick={handleSave}
          >
            Agregar
          </button>
        </div>

        {educations.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#fd6c01]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Institución
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Título
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Campo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Inicio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Finalización
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {educations.map((edu) => (
                  <tr
                    className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                    key={edu.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-gray-500"
                    >
                      {edu.institution}
                    </th>
                    <td className="px-6 py-4">{edu.degree}</td>
                    <td className="px-6 py-4">{edu.fieldOfStudy}</td>
                    <td className="px-6 py-4">{edu.startYear}</td>
                    <td className="px-6 py-4">{edu.endDate || 'En curso'}</td>

                    <td className="px-6 py-4 text-right">
                      <button
                        className="cursor-pointer text-red-800 hover:text-red-700 transition-all duration-300"
                        onClick={() => deleteEducation(edu.id)}
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
      <Toaster richColors />
    </main>
  )
}

export default EducationTab
