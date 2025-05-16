import { useEffect } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Skills = ({ userSkills, isOwner }) => {
  const navigate = useNavigate()

  const goToSettings = () => {
    navigate('/settings', {
      state: {
        tab: 'habilidades',
      },
    })
  }

  useEffect(() => {
    console.log(userSkills)
  }, [])

  const ownerMessage =
    '¡Agrega tus habilidades para que otros vean lo que puedes ofrecer! Completa tu lista de habilidades para mejorar tu perfil.'
  const defaultMessage =
    'Este usuario aún no ha completado su lista de habilidades. ¡Vuelve más tarde para conocer más sobre sus capacidades!'

  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg ">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Habilidades</h2>

        {isOwner && (
          <button
            className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
            onClick={goToSettings}
          >
            <AiFillEdit size={20} />
          </button>
        )}
      </div>

      {userSkills && userSkills.length > 0 ? (
        // Mostrar tabla si hay habilidades
        <div className="relative overflow-x-auto mt-5 w-full rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-[15px] text-white uppercase bg-[#cb4d03]">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Habilidad
                </th>
                <th scope="col" className="px-6 py-5">
                  Experiencia
                </th>
              </tr>
            </thead>
            <tbody>
              {userSkills.map((skill, index) => (
                <tr key={index} className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {skill.skill}
                  </th>
                  <td className="px-6 py-4">{skill.proficiencyLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Mensaje si no hay habilidades registradas
        <p className="text-[15px] text-justify mt-2 text-black font-light">
          {isOwner ? ownerMessage : defaultMessage}
        </p>
      )}
    </div>
  )
}

export default Skills
