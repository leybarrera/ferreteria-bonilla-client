import { IoBusinessSharp } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const WorkExperience = ({ userExperiences, isOwner }) => {
  const navigate = useNavigate()

  const goToSettings = () => {
    navigate('/settings', {
      state: {
        tab: 'experiencia',
      },
    })
  }

  const ownerMessage =
    '¡Agrega tu experiencia laboral para que otros vean tu trayectoria profesional y habilidades!'
  const defaultMessage =
    'Este usuario aún no ha completado su sección de experiencia laboral. ¡Vuelve más tarde para conocer más sobre su trayectoria profesional!'

  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Experiencia</h2>

        {isOwner && (
          <button
            className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
            onClick={goToSettings}
          >
            <AiFillEdit size={20} />
          </button>
        )}
      </div>

      {userExperiences && userExperiences.length > 0 ? (
        <section className="flex flex-col mt-3">
          {userExperiences.map((experience, index) => (
            <article
              key={index}
              className="flex flex-row items-start gap-3 border-b border-gray-200 py-3"
            >
              {/* Icono */}
              <div>
                <IoBusinessSharp size={50} />
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold ">
                  {experience.jobTitle}
                </h3>
                <h5 className="text-sm font-light text-black">
                  {experience.companyName}
                </h5>
                <h5 className="text-sm font-light text-black">
                  {experience.startDate} - {experience.endDate} /{' '}
                  {experience.endDate - experience.startDate} años
                </h5>
                {/* <h5 className="text-sm font-light text-black">
                  {experience.location} - {experience.workMode}
                </h5> */}

                <p className="mt-2 text-[15px] text-black font-light text-wrap">
                  {experience.responsibilities}
                </p>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <p className="text-[15px] text-justify mt-2 text-black font-light">
          {isOwner ? ownerMessage : defaultMessage}
        </p>
      )}
    </div>
  )
}

export default WorkExperience
