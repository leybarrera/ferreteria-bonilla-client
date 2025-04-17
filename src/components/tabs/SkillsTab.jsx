import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { skillApi } from '../../api/index.api'
import { useSelector } from 'react-redux'
import { proficiencies, skills } from '../../data/data'
import { MdDelete } from 'react-icons/md'
import { AxiosError } from 'axios'
const SkillsTab = () => {
  const { info } = useSelector((state) => state.user)
  const [userSkill, setUserSkill] = useState({
    skill: null,
    proficiencyLevel: null,
  })
  const [userSkills, setUserSkills] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserSkill((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const deleteUserSkill = (id) => {
    skillApi
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
    if (!userSkill.skill || !userSkill.proficiencyLevel) {
      toast.error('Todos los campos son obligatorios')
      return
    }
    skillApi
      .save({
        ...userSkill,
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
    skillApi
      .getByUserId(info.id)
      .then((res) => {
        const { userSkills } = res.data
        setUserSkills(userSkills)
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
                Habilidades
              </label>
              <select
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
                name="skill"
                onChange={handleChange}
              >
                <option selected>Seleccione una habilidad</option>
                {skills.map((skill) => (
                  <option value={skill} key={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Experiencia
              </label>
              <select
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
                name="proficiencyLevel"
                onChange={handleChange}
              >
                <option selected>Seleccione el nivel</option>
                {proficiencies.map((prof) => (
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
        {userSkills.length > 0 && (
          <div
            className="flex flex-col mt-10 border border-gray-200 rounded-lg bg-white overflow-hidden
        "
          >
            {/* Header */}
            <div className="w-full grid grid-cols-3 bg-[#fd6c01] h-[50px] border-b border-gray-200">
              <div className="flex justify-center items-center border-r border-gray-200">
                <span className="text-lg text-white font-bold">Habilidad</span>
              </div>
              <div className="flex justify-center items-center border-r border-gray-200">
                <span className="text-lg text-white font-bold">
                  Experiencia
                </span>
              </div>
              <div />
            </div>

            {/* Body */}
            <div className="flex flex-col">
              {/* tr */}
              {userSkills.map((usk) => (
                <div
                  className="grid grid-cols-3 border-b border-gray-200 h-[45px] hover:bg-gray-100 transition-all duration-300"
                  key={usk.id}
                >
                  <div className="flex justify-center items-center border-r border-gray-200">
                    <span className="text-sm text-wrap text-gray-500">
                      {usk.skill}
                    </span>
                  </div>
                  <div className="flex justify-center items-center border-r border-gray-200">
                    <span className="text-sm text-wrap text-gray-500">
                      {usk.proficiencyLevel}
                    </span>
                  </div>

                  <div className="flex justify-center items-center border-r border-gray-200">
                    <button
                      className="cursor-pointer text-red-800 hover:text-red-600 transition-all duration-300"
                      onClick={() => deleteUserSkill(usk.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Toaster richColors />
    </main>
  )
}

export default SkillsTab
