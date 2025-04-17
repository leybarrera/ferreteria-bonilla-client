import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { languageApi } from '../../api/index.api'
import { useSelector } from 'react-redux'
import { languages, proficienciesLevels } from '../../data/data'
import { MdDelete } from 'react-icons/md'
import { AxiosError } from 'axios'
const LanguageTab = () => {
  const { info } = useSelector((state) => state.user)
  const [userLanguage, setUserLanguage] = useState({
    language: null,
    proficiencyLevel: null,
  })
  const [userLanguages, setUserLanguages] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserLanguage((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const deleteUserLanguage = (id) => {
    languageApi
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

  const handleSave = () => {
    console.log(userLanguage)
    if (!userLanguage.language || !userLanguage.proficiencyLevel) {
      toast.error('Todos los campos son obligatorios')
      return
    }
    languageApi
      .save({
        ...userLanguage,
        UserId: info.id,
      })
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

  const getAllData = () => {
    languageApi
      .getByUserId(info.id)
      .then((res) => {
        const { userLanguages } = res.data
        console.log(userLanguages)
        setUserLanguages(userLanguages)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getAllData()
  }, [])
  return (
    <main className="flex flex-col">
      <div className="w-full max-w-[1000px] flex flex-col">
        <div className="flex flex-col">
          <div className="flex lg:flex-row flex-col lg:items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Idiomas
              </label>
              <select
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
                name="language"
                onChange={handleChange}
              >
                <option selected>Seleccione un idioma</option>
                {languages.map((lng) => (
                  <option value={lng} key={lng}>
                    {lng}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Dominio
              </label>
              <select
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
                name="proficiencyLevel"
                onChange={handleChange}
              >
                <option selected>Seleccione el nivel</option>
                {proficienciesLevels.map((prof) => (
                  <option value={prof} key={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="mt-3 py-3 bg-[#fd6c01] text-lg text-white font-bold rounded-lg hover:bg-[#cb4d03] transition-colors"
            onClick={handleSave}
          >
            Agregar
          </button>
        </div>

        {userLanguages.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#fd6c01]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Idioma
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dominio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {userLanguages.map((usl) => (
                  <tr
                    className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                    key={usl.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-gray-500"
                    >
                      {usl.language}
                    </th>
                    <td className="px-6 py-4">{usl.proficiencyLevel}</td>

                    <td className="px-6 py-4 text-right">
                      <button
                        className="cursor-pointer text-red-800 hover:text-red-700 transition-all duration-300"
                        onClick={() => deleteUserLanguage(usl.id)}
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

export default LanguageTab
