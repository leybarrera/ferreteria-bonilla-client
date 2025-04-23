import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Languages = ({ userLanguages, isOwner }) => {
  const navigate = useNavigate()

  const goToSettings = () => {
    navigate('/settings', {
      state: {
        tab: 'idiomas',
      },
    })
  }

  const ownerMessage =
    '¡Agrega tus idiomas y niveles para mostrar tus habilidades lingüísticas y mejorar tu perfil!'
  const defaultMessage =
    'Este usuario aún no ha completado su sección de idiomas. ¡Vuelve más tarde para conocer más sobre sus habilidades lingüísticas!'

  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Idiomas</h2>

        {isOwner && (
          <button
            className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
            onClick={goToSettings}
          >
            <AiFillEdit size={20} />
          </button>
        )}
      </div>

      {userLanguages && userLanguages.length > 0 ? (
        <section className="flex flex-col mt-3 gap-2">
          {userLanguages.map((language, index) => (
            <article
              key={index}
              className="flex flex-col border-b border-gray-200 py-3"
            >
              <h3 className="text-lg font-semibold ">{language.name}</h3>
              <h5 className="text-sm font-light text-black">
                Nivel: {language.level}
              </h5>
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

export default Languages
