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
} from '../../components/index.components'

/******  1c7439e3-a1fa-4f13-bbce-21f1d2b8e9df  *******/
const Profile = () => {
  const { id } = useParams()
  useEffect(() => {
    console.log(id)
  }, [])

  return (
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
            src="/public/user.png"
            alt="Imagen de perfil del usuario"
            className="lg:w-[200px] lg:h-[200px] w-[100px] h-[100px] rounded-full z-10 absolute left-1/2 transform not-lg:-translate-x-1/2 lg:left-8 lg:-bottom-24 -bottom-10 border-3 border-gray-700"
          />
        </div>

        {/* Informacion */}
        <div className="flex flex-col lg:flex-row items-center justify-between not-lg:mt-10 lg:pr-10">
          <div className="py-5 flex flex-col not-lg:justify-center not-lg:items-center w-full pl-[240px] not-lg:pl-0">
            <h2 className="text-3xl font-bold">Cristhian Rodríguez</h2>
            <h3 className="text-lg font-medium text-gray-400">
              crisrodam1996@gmail.com
            </h3>
          </div>

          <button type="button" className="cursor-pointer">
            <IoQrCode size={30} />
          </button>
        </div>
      </header>

      {/* Body */}
      <section className="flex flex-col gap-2 mt-2 lg:px-0 px-2">
        {/* Informacion personal */}
        <General />
        <About />
        <Skills />
        <Education />
        <WorkExperience />
        <Languages />
        <References />
      </section>
    </main>
  )
}

export default Profile
