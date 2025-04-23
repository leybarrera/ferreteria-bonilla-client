import { useEffect } from 'react'
import { FaIdCard } from 'react-icons/fa'
import { IoBusinessSharp, IoQrCode } from 'react-icons/io5'
import { LiaUniversitySolid } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import {
  General,
  References,
  About,
  Skills,
  Education,
  WorkExperience,
  Languages,
  QRComponent,
} from '../../components/index.components'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Loading } from '../index.pages'
import { userApi } from '../../api/index.api'
import { AxiosError } from 'axios'
import { toast, Toaster } from 'sonner'
import { PiEmptyBold } from 'react-icons/pi'

/******  1c7439e3-a1fa-4f13-bbce-21f1d2b8e9df  *******/
const Profile = () => {
  const [showQR, setShowQR] = useState(false)

  const { id } = useParams()
  const { info } = useSelector((state) => state.user)
  const [infoUser, setInfoUser] = useState(null)
  const [about, setAbout] = useState(null)
  const [userSkills, setUserSkills] = useState([])
  const [userEducations, setUserEducations] = useState([])
  const [userLanguages, setUserLanguages] = useState([])
  const [userReferences, setUserReferences] = useState([])
  const [userExperiences, setuserExperiences] = useState([])

  const [loading, setLoading] = useState(true)

  const [isMyProfile, setIsMyProfile] = useState(false)

  const toggleShowQR = () => {
    setShowQR((prev) => !prev)
  }

  const getAllUserData = async () => {
    // Get Data User
    userApi
      .getById(id)
      .then((res) => {
        const { user } = res.data
        const {
          About,
          UserSkills,
          UserEducation,
          UserExperience,
          UserReference,
          UserLanguage,
        } = user

        setInfoUser(user)
        setUserSkills(UserSkills)
        setUserEducations(UserEducation)
        setuserExperiences(UserExperience)
        setUserReferences(UserReference)
        setUserLanguages(UserLanguage)
        setAbout(About)
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          console.log(err)
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAllUserData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return !infoUser && !loading ? (
    <main className="absolute top-0 left-0 h-screen w-full flex flex-col justify-center items-center gap-2">
      <PiEmptyBold size={50} color="#99a1af" />
      <h2 className="text-2xl font-bold text-gray-400">Perfil no encontrado</h2>
    </main>
  ) : showQR ? (
    <QRComponent toggleShowQR={toggleShowQR} UserId={id} />
  ) : (
    <main className="lg:w-[1400px] h-full w-full mx-auto flex flex-col pb-20">
      {/* Header */}
      <header className="w-full  flex flex-col border-b border-gray-300 pb-5">
        {/* Portada */}
        <div className="w-full lg:h-[450px] h-[250px] lg:rounded-bl-xl lg:rounded-br-xl relative">
          <img
            src="/public/portada.jpg"
            alt="Portada"
            className="absolute w-full h-full object-cover lg:rounded-bl-xl lg:rounded-br-xl"
          />

          {/* Imagen de perfil */}
          <img
            src={infoUser?.profilePicture || '/user.png'}
            alt="Imagen de perfil del usuario"
            className="lg:w-[200px] lg:h-[200px] w-[100px] h-[100px] rounded-full z-10 absolute left-1/2 transform not-lg:-translate-x-1/2 lg:left-8 lg:-bottom-24 -bottom-10 border-3 border-gray-700"
          />
        </div>

        {/* Informacion */}
        <div className="flex flex-col lg:flex-row items-center justify-between not-lg:mt-10 lg:pr-10">
          <div className="py-5 flex flex-col not-lg:justify-center not-lg:items-center w-full pl-[240px] not-lg:pl-0">
            <h2 className="text-3xl font-bold">{infoUser?.fullName}</h2>
            <h3 className="text-lg font-medium text-gray-400">
              {infoUser?.email}
            </h3>
          </div>

          {infoUser?.isDataValidated && (
            <button
              type="button"
              className="cursor-pointer"
              onClick={toggleShowQR}
            >
              <IoQrCode size={30} />
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <section className="flex flex-col gap-2 mt-2 lg:px-0 px-2">
        {/* Informacion personal */}
        <General infoUser={infoUser} isOwner={info.id === infoUser.id} />
        <About about={about} isOwner={info.id === infoUser.id} />
        <Skills userSkills={userSkills} isOwner={info.id === infoUser.id} />
        <Education
          userEducations={userEducations}
          isOwner={info.id === infoUser.id}
        />
        <WorkExperience
          userExperiences={userExperiences}
          isOwner={info.id === infoUser.id}
        />
        <Languages
          userLanguages={userLanguages}
          isOwner={info.id === infoUser.id}
        />
        <References
          userReferences={userReferences}
          isOwner={info.id === infoUser.id}
        />
      </section>

      <Toaster richColors position="bottom-right" />
    </main>
  )
}

export default Profile
