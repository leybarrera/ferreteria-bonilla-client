import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const About = ({ about, isOwner }) => {
  const navigate = useNavigate()

  const goToSettings = () => {
    navigate('/settings', {
      state: {
        tab: 'about',
      },
    })
  }
  const ownerMessage =
    '¡Completa tu sección *Acerca de* para que otros te conozcan mejor y personalices tu perfil!'
  const defaultMessage =
    'Este usuario aún no ha completado su sección *Acerca de*. ¡Vuelve más tarde para conocer más acerca de él!'

  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Acerca de</h2>

        {isOwner && (
          <button
            className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
            onClick={goToSettings}
          >
            <AiFillEdit size={20} />
          </button>
        )}
      </div>

      <p className="text-[15px] text-justify mt-2 text-black font-light">
        {about ? about.text : isOwner ? ownerMessage : defaultMessage}
      </p>
    </div>
  )
}

export default About
