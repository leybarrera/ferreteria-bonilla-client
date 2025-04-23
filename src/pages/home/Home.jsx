import { useEffect } from 'react'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoArrowForwardOutline, IoQrCode } from 'react-icons/io5'
import { TbMapPinFilled } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import {
  branchApi,
  jobOffersApi,
  messageApi,
  notificationApi,
  postulationApi,
} from '../../api/index.api'
import {
  setBranches,
  setMessages,
  setNotifications,
  setOffers,
  setPostulations,
} from '../../redux/slices/app.slice'
import { QRComponent } from '../../components/index.components.js'
import { useDispatch } from 'react-redux'

const Home = () => {
  const [showQR, setShowQR] = useState(false)
  const [allBranches, setAllBranches] = useState([])
  const dispatch = useDispatch()
  const [profileCompleted, setPorfileCompleted] = useState(false)
  const { info, offers } = useSelector((state) => state.user)
  const { branches } = useSelector((state) => state.app)

  const toggleShowQR = () => {
    setShowQR((prev) => !prev)
  }

  // useEffect(() => {
  //   toast.warning(
  //     'Completa tu perfil para poder usar los servicios de la plataforma'
  //   )
  // }, [profileCompleted])

  useEffect(() => {
    const infoUserCompleted = Object.values(info).every((data) => data !== null)
    setPorfileCompleted(infoUserCompleted)

    // Get sucursales
    branchApi
      .getAll()
      .then((res) => {
        const { branches } = res.data
        dispatch(setBranches(branches))
      })
      .catch((err) => {
        console.log(err)
      })

    // Get Ofertas
    jobOffersApi.getAll().then((res) => {
      const { jobOffers } = res.data
      dispatch(setOffers(jobOffers))
    })
    // Get Mensajes
    messageApi.getMyMessages(info.id).then((res) => {
      const { conversations } = res.data
      dispatch(setMessages(conversations))
    })
    // Get notificaciones
    notificationApi.getAllByUserId(info.id).then((res) => {
      const { notifications } = res.data
      dispatch(setNotifications(notifications))
    })
    // Get Postulaciones

    postulationApi.getByUserId(info.id).then((res) => {
      const { postulations } = res.data
      dispatch(setPostulations(postulations))
    })
  }, [])

  useEffect(() => {
    console.log('Info:', info)
  }, [])
  return (
    <main className="lg:w-[1400px] mx-auto w-full flex lg:flex-row flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      {/* Info */}
      <section className="lg:w-[250px] w-full border border-gray-200 rounded-xl bg-white h-fit pb-10 flex flex-col items-center gap-1 overflow-hidden">
        {/* header */}
        <div className="relative w-full lg:h-[58px] md:h-[150px] h-[80px]">
          <img
            src="/public/portada.jpg"
            alt=""
            className="absolute w-full h-full object-cover"
          />
          {/* Imagen de perfil */}
          <img
            src={info?.profilePicture || '/public/user.png'}
            alt="Imagen de perfil del usuario"
            className="absolute lg:w-[72px] lg:h-[72px] md:w-[100px] md:h-[100px] h-[80px] w-[80px]  border-2 border-gray-400 rounded-full left-5 lg:-bottom-1/2 md:-bottom-10 -bottom-1/2"
          />
        </div>

        <div className="mt-10 px-5 flex flex-col w-full">
          {/* Nombre del usuario */}
          <h2 className="text-[20px] font-bold opacity-80">{info?.fullName}</h2>
          <h3 className="font-semibold text-[13px] text-gray-500">
            {info?.email}
          </h3>
          {info?.address && (
            <h3 className="font-light text-[12px] text-gray-500">
              {info?.address}
            </h3>
          )}
        </div>

        {/* Qr section */}
        {info?.isDataValidated ? (
          <div className="px-5 pt-5 flex flex-col w-full border-t border-gray-200 justify-center gap-2 items-center">
            <button onClick={toggleShowQR}>
              <IoQrCode size={30} />
            </button>
            <span className="text-center text-sm opacity-75">
              Escanea tu QR de verificación
            </span>
          </div>
        ) : (
          <div className="px-5 pt-5 flex flex-col w-full border-t border-gray-200 justify-center gap-2 items-center">
            <button onClick={toggleShowQR}>
              <IoQrCode size={30} />
            </button>
            <span className="text-center text-sm opacity-75">
              Completa tu perfil para obtener tu QR de verificación
            </span>
          </div>
        )}
      </section>

      {/* Ofertas */}
      <section className="flex-1 h-fit pb-5 flex flex-col gap-3">
        {offers && offers.length > 0 ? (
          offers.map((offer) => (
            <article
              className="flex flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300"
              key={offer.id}
            >
              {/* Header */}
              <header className="flex flex-row gap-3 px-5">
                <img
                  src="/public/user.png"
                  alt="Foto de la empresa"
                  className="w-[60px] h-[60px] rounded-full border-2 border-gray-400"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg text-[#000000E6] font-semibold">
                    Nombre de la empresa
                  </h2>
                  <h3 className="text-xs text-[#00000099]">
                    La Maná, Cotopaxi
                  </h3>
                  <h5 className="text-xs font-light text-[#00000099]">
                    5 días
                  </h5>
                </div>
              </header>

              <main className="px-5 mt-2">
                <p className="text-justify text-[16px] text-[#000000E6]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat voluptatem eum, vel minus quibusdam sapiente
                  accusantium dolores dolorem dignissimos quas beatae aperiam
                  earum? Dolor ex quae quidem, at aperiam, quo dolorum
                  blanditiis hic, enim atque ipsa inventore! Quod hic voluptate
                  expedita repudiandae officia laborum maiores minus velit rem,
                  magnam mollitia, voluptatum voluptates ipsa? Repellat, vero
                  voluptates doloribus nesciunt at totam alias corrupti.
                  Recusandae nobis odio repellendus est fuga adipisci unde,
                  repellat, praesentium minus enim alias quas voluptatem
                  voluptates architecto maxime in labore. Neque earum inventore
                  dignissimos facilis architecto, nostrum dolorem ad, maxime,
                  corrupti labore deleniti quae mollitia voluptatum ea ratione.
                </p>

                <button className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-[#fd6c01] transition-colors duration-300">
                  Aplicar
                </button>
              </main>
            </article>
          ))
        ) : (
          <div className="w-full lg:h-[200px] h-[500px] flex flex-col justify-center items-center bg-[#fff9ec] border border-[#fff9ec] rounded-lg">
            <h2 className="text-2xl font-bold text-[#ff850b]">
              No hay ofertas disponibles
            </h2>
          </div>
        )}
      </section>
      {/* Sucursales */}
      <section className="lg:w-[350px] lg:flex hidden w-full border border-gray-200 rounded-xl bg-white h-fit py-5 px-5 lg:flex-col lg:gap-3 shadow-2xl shadow-gray-200">
        {/* Heaader */}
        <div className="flex flex-row items-center">
          <h2 className="text-xl font-semibold">Sucursales</h2>
        </div>
        {/* Lista de secursales */}

        <div className="flex flex-col gap-5">
          {branches && branches.length > 0 ? (
            branches.map((branch) => (
              <article className="flex flex-row gap-3" key={branch.id}>
                {/* Foto de la sucursal */}
                <img
                  src=""
                  alt=""
                  className="w-[50px] h-[50px] rounded-full bg-red-300"
                />

                <div className="flex flex-col">
                  <h3 className="text-[14px] font-bold">{branch.name}</h3>
                  <h5 className="text-xs font-light text-gray-500">
                    {branch.city}, {branch.province}
                  </h5>
                  <button className="w-full flex flex-row gap-1 items-center justify-center py-1 border border-[#000000BF] rounded-full mt-2 ">
                    <FaPlus size={14} />
                    <span className="font-bold text-[#000000BF] text-[16px]">
                      Seguir
                    </span>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="w-full px-5 py-10 flex justify-center items-center">
              <h2 className="text-[16px] text-[#000000BF] font-semibold">
                No hay sucursales publicadas
              </h2>
            </div>
          )}
          {branches && branches.length > 0 && (
            <NavLink to={'/'} className="flex flex-row items-center gap-2 ">
              <span className="text-[16px] text-[#000000BF] hover:text-gray-900 transition-all duration-300">
                Ver todas las sucursales
              </span>
              <IoArrowForwardOutline color="#000000BF" size={18} />
            </NavLink>
          )}
        </div>
      </section>
      <Toaster
        richColors
        position="bottom-right"
        closeButton
        duration={1000000}
      />

      {showQR && <QRComponent toggleShowQR={toggleShowQR} />}
    </main>
  )
}

export default Home
