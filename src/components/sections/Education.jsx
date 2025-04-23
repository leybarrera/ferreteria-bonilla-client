import { LiaUniversitySolid } from 'react-icons/lia'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Education = ({ userEducations, isOwner }) => {
  const navigate = useNavigate()

  const goToSettings = () => {
    navigate('/settings', {
      state: {
        tab: 'educacion',
      },
    })
  }

  const ownerMessage =
    '¡Completa tu sección de educación para que otros vean tu formación académica y logros!'
  const defaultMessage =
    'Este usuario aún no ha completado su sección de educación. ¡Vuelve más tarde para conocer más sobre su formación académica!'

  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Educación</h2>

        {isOwner && (
          <button
            className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
            onClick={goToSettings}
          >
            <AiFillEdit size={20} />
          </button>
        )}
      </div>

      {userEducations && userEducations.length > 0 ? (
        <section className="flex flex-col mt-3">
          {userEducations.map((education, index) => (
            <article
              key={index}
              className="flex flex-row items-start gap-3 border-b border-gray-200 py-3"
            >
              {/* Icono */}
              <LiaUniversitySolid size={50} />

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold ">
                  {education.institution}
                </h3>
                <h5 className="text-sm font-light text-black">
                  {education.degree}
                </h5>
                <h5 className="text-sm font-light text-black">
                  {education.startDate} - {education.endDate}
                </h5>
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

export default Education
