import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userApi } from '../../api/index.api'

const VerificationAccount = () => {
  const [infoUser, setInfoUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    userApi
      .getById(id)
      .then((res) => {
        const { user } = res.data
        setInfoUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  return (
    <div className="absolute z-50 top-0 left-0 w-full h-screen overflow-hidden bg-[#f4f4f4] flex justify-center items-center flex-col p-4">
      <div className="lg:max-w-[700px] w-full bg-white p-8 rounded-xl shadow-lg flex flex-col justify-center items-center">
        {/* Título Principal */}
        <h2 className="text-4xl font-bold text-[#fd6c01] text-center mb-5">
          Información validada
        </h2>

        {/* Imagen de perfil */}
        <img
          src={infoUser?.profilePicture || '/user.png'}
          alt="Foto de perfil"
          className="w-[150px] h-[150px] rounded-full mt-5 mb-6"
        />

        {/* Mensaje de Verificación */}
        <h3 className="text-xl text-center text-gray-800 mb-4">
          El perfil de{' '}
          <span className="font-semibold">{infoUser?.fullName}</span> ha sido
          revisado cuidadosamente por el equipo de Mega Ferretería Bonilla.
        </h3>

        {/* Detalle de validación */}
        <p className="text-lg text-gray-600 mb-6">
          Después de una exhaustiva revisión de la información personal, podemos
          confirmar que cumple con todos los requisitos establecidos por nuestra
          plataforma. Este perfil es apto para ser considerado en los procesos
          de selección.
        </p>

        {/* Mensaje de Confirmación */}
        <p className="text-lg text-gray-600 text-center">
          El candidato está listo para avanzar al siguiente paso en el proceso
          de selección. ¡Gracias por confiar en Mega Ferretería Bonilla!
        </p>
      </div>
    </div>
  )
}

export default VerificationAccount
