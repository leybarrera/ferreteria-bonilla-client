import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const General = ({ infoUser, isOwner }) => {
  const navigate = useNavigate()

  const goToSettings = () => {
    navigate('/settings', {
      state: {
        tab: 'general',
      },
    })
  }

  return (
    <div className="flex flex-col p-5  border-gray-200 bg-white rounded-lg border ">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Informacion personal</h2>
        {isOwner && (
          <button
            className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
            onClick={goToSettings}
          >
            <AiFillEdit size={20} />
          </button>
        )}
      </div>

      <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Nombres</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={infoUser?.fullName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Correo electrónico</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={infoUser?.email}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Cédula</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={infoUser?.dni}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Teléfono</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={infoUser?.phone}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Género</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={infoUser?.gender}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Residencia</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={infoUser?.residence || 'N/A'}
          />
        </div>
      </div>
    </div>
  )
}

export default General
