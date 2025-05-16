import { FaIdCard } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const References = ({ userReferences, isOwner }) => {
  const navigate = useNavigate()

  const goToSettings = () => {
    navigate('/settings', {
      state: {
        tab: 'referencia',
      },
    })
  }

  const ownerMessage =
    '¡Agrega tus referencias profesionales para mejorar tu perfil y darle más confianza a los demás!'
  const defaultMessage =
    'Este usuario aún no ha completado su sección de referencias. ¡Vuelve más tarde para conocer más sobre sus contactos profesionales!'

  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Referencias</h2>

        {isOwner && (
          <button
            className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
            onClick={goToSettings}
          >
            <AiFillEdit size={20} />
          </button>
        )}
      </div>

      {userReferences && userReferences.length > 0 ? (
        <section className="flex flex-col mt-3 gap-2">
          {userReferences.map((reference, index) => (
            <article
              key={index}
              className="flex flex-row items-start gap-3 border-b border-gray-200 py-3"
            >
              {/* Icono */}
              <div>
                <FaIdCard size={50} />
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{reference.name}</h3>
                <h5 className="text-sm font-light text-black">
                  {reference.relationship}
                </h5>
                <h5 className="text-sm font-light text-black">
                  {reference.email} - {reference.phone}
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

export default References
