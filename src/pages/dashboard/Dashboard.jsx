import { FaUsers } from 'react-icons/fa'
import { FaBuildingUser, FaUsersBetweenLines } from 'react-icons/fa6'
import { IoIosStats } from 'react-icons/io'
import { IoBusiness } from 'react-icons/io5'
import { SiElectronbuilder } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import CountUp from 'react-countup'
import { useState } from 'react'
const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(100)
  const [totalBranches, setTotalBranches] = useState(5)
  const [totalOffers, setTotalOffers] = useState(10)
  const [totalApplications, setTotalApplications] = useState(10)

  const navigate = useNavigate()
  const goTo = (path) => {
    navigate(`/dashboard/${path}`)
  }
  return (
    <main className="w-full h-full flex lg:px-10 py-20 px-2">
      {/* Tarjetas */}
      <section className="flex flex-row gap-10 justify-evenly flex-wrap">
        <article
          className="lg:w-[400px] h-[300px] w-[90%]  rounded-xl border border-gray-200 bg-[#ffa233] flex flex-col justify-center items-center px-5 hover:scale-110 transition-all duration-500 cursor-pointer hover:bg-[#ff850b] relative"
          onClick={() => goTo('sucursales')}
        >
          <IoIosStats
            className="absolute top-3 left-3"
            size={30}
            color="white"
          />
          <IoBusiness
            className="absolute top-3 right-3"
            size={30}
            color="white"
          />
          <CountUp
            className="text-8xl font-bold text-white"
            start={0}
            end={totalBranches}
            duration={2}
            useEasing={true}
          />
          <h2 className="text-4xl font-bold text-gray-200 mt-5">Sucursales</h2>
        </article>

        <article
          className="lg:w-[400px] h-[300px] w-[90%] rounded-xl border border-gray-200 bg-[#00b809] flex flex-col justify-center items-center px-5 hover:scale-110 transition-all duration-500 cursor-pointer hover:bg-[#008b07] relative"
          onClick={() => goTo('ofertas')}
        >
          <IoIosStats
            className="absolute top-3 left-3"
            size={30}
            color="white"
          />
          <SiElectronbuilder
            className="absolute top-3 right-3"
            size={30}
            color="white"
          />
          <CountUp
            className="text-8xl font-bold text-white"
            start={0}
            end={totalOffers}
            duration={2}
            useEasing={true}
          />
          <h2 className="text-4xl font-bold text-gray-200 mt-5">
            Ofertas Laborales
          </h2>
        </article>

        <article
          className="lg:w-[400px] h-[300px] w-[90%] rounded-xl border border-gray-200 bg-[#ffa233] flex flex-col justify-center items-center px-5 hover:scale-110 transition-all duration-500 cursor-pointer hover:bg-[#ff850b] relative"
          onClick={() => goTo('postulaciones')}
        >
          <IoIosStats
            className="absolute top-3 left-3"
            size={30}
            color="white"
          />
          <FaBuildingUser
            className="absolute top-3 right-3"
            size={30}
            color="white"
          />
          <CountUp
            className="text-8xl font-bold text-white"
            start={0}
            end={totalApplications}
            duration={2}
            useEasing={true}
          />
          <h2 className="text-4xl font-bold text-gray-200 mt-5">
            Postulaciones
          </h2>
        </article>

        <article
          className="lg:w-[400px] h-[300px] w-[90%] rounded-xl border border-gray-200 bg-[#00b809] flex flex-col justify-center items-center px-5 hover:scale-110 transition-all duration-500 cursor-pointer hover:bg-[#008b07] relative"
          onClick={() => goTo('usuarios')}
        >
          <IoIosStats
            className="absolute top-3 left-3"
            size={30}
            color="white"
          />
          <FaUsers className="absolute top-3 right-3" size={30} color="white" />
          <CountUp
            className="text-8xl font-bold text-white"
            start={0}
            end={totalUsers}
            duration={2}
            useEasing={true}
          />
          <h2 className="text-4xl font-bold text-gray-200 mt-5">Usuarios</h2>
        </article>

        <article
          className="lg:w-[400px] h-[300px] w-[90%] rounded-xl border border-gray-200 bg-[#00b809] flex flex-col justify-center items-center px-5 hover:scale-110 transition-all duration-500 cursor-pointer hover:bg-[#008b07] relative"
          onClick={() => goTo('empleados')}
        >
          <IoIosStats
            className="absolute top-3 left-3"
            size={30}
            color="white"
          />
          <FaUsersBetweenLines
            className="absolute top-3 right-3"
            size={30}
            color="white"
          />
          <CountUp
            className="text-8xl font-bold text-white"
            start={0}
            end={totalUsers}
            duration={2}
            useEasing={true}
          />
          <h2 className="text-4xl font-bold text-gray-200 mt-5">Empleados</h2>
        </article>
      </section>
    </main>
  )
}

export default Dashboard
