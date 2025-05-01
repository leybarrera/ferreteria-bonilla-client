import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { jobOffersApi, postulationApi } from '../../api/index.api'
import { dateUtil, storageUtil } from '../../utils/index.utils'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { setPostulations } from '../../redux/slices/app.slice'

const JobOffers = () => {
  const { info } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [postulationsArr, setPostulationsArr] = useState([])
  const [offer, setOffer] = useState(null)
  const [offers, setOffers] = useState([])
  const { id } = useParams()

  const isUserPostulated = (offerId) => {
    return postulationsArr.some(
      (postulation) => postulation.JobOfferId === offerId
    )
  }

  const getUserPostulation = (offerId) => {
    return postulationsArr.find(
      (postulation) =>
        postulation.JobOfferId === offerId && postulation.UserId === info.id
    )
  }

  const getPostulations = () => {
    postulationApi.getByUserId(info.id).then((res) => {
      const { jobApplications } = res.data
      setPostulationsArr(jobApplications)
      dispatch(setPostulations(jobApplications))
    })
  }

  const applyJob = (JobOfferId) => {
    const { token } = storageUtil.getData('session')
    postulationApi
      .applyJob(token, {
        UserId: info.id,
        JobOfferId,
      })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getPostulations()
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
  }

  const cancelApplyJob = (id) => {
    const { token } = storageUtil.getData('session')
    postulationApi
      .cancelApplyJob(token, id)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getPostulations()
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente más tarde.')
        }
      })
  }

  useEffect(() => {
    const { token } = storageUtil.getData('session')

    getPostulations()

    if (id) {
      // Obtener oferta por el ida
      jobOffersApi.geById(token, id).then((res) => {
        const { jobOffer } = res.data
        setOffer(jobOffer)
        console.log(jobOffer)
      })
    } else {
      jobOffersApi.getAll(token).then((res) => {
        const { jobOffers } = res.data
        setOffers(jobOffers)
        console.log(jobOffers)
      })
    }
  }, [id])
  return offer ? (
    <div className="lg:w-[800px] mx-auto w-full flex flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      <article className="flex flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300">
        <header className="flex flex-row gap-3 px-5">
          <div className="w-[50px] h-[50px]  rounded-full border-2 border-gray-400 bg-[#F4F2EE] flex justify-center items-center">
            <img
              src="/mascota-clean.png"
              alt="Foto de la empresa"
              className="w-[40px] h-[40px]"
            />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-lg text-[#000000E6] font-semibold">
              {offer.Branch.name}
            </h2>
            <h3 className="text-xs text-[#00000099]">
              {offer.Branch.province}, {offer.Branch.city}
            </h3>
            <h5 className="text-xs font-light text-[#00000099]">
              {dateUtil.formatedDate(offer.createdAt)}
            </h5>
          </div>
        </header>

        <main className="px-5 mt-2">
          <p className="text-justify text-[15px] text-black font-medium mb-3">
            {offer.description}
          </p>
          <h3 className="text-xs text-[#00000099]">
            {offer.type}, {offer.contractType}
          </h3>
          <h3 className="text-xs text-[#00000099] mt-2">${offer.salary}</h3>

          {isUserPostulated(offer.id) ? (
            <button
              className="w-full py-2 mt-3 bg-gray-800 text-white text-lg font-bold rounded-xl hover:bg-gray-700 transition"
              onClick={() => cancelApplyJob(getUserPostulation(offer.id).id)}
            >
              Cancelar aplicación
            </button>
          ) : (
            <button
              className="w-full py-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl hover:bg-[#fd6c01] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => applyJob(offer.id)}
              disabled={!info?.isDataValidated}
            >
              {info?.isDataValidated
                ? 'Aplicar'
                : 'Completa tu perfil para aplicar'}
            </button>
          )}
        </main>
      </article>
    </div>
  ) : (
    <div className="lg:w-[800px] mx-auto w-full flex  flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      <div className="flex flex-col gap-5">
        {offers.length > 0 ? (
          offers.map((offer) => {
            const isPostulated = postulationsArr.some(
              (postulation) => postulation.JobOfferId === offer.id
            )
            const postulationFound = postulationsArr.find(
              (postulation) =>
                postulation.JobOfferId === offer.id &&
                postulation.UserId === info.id
            )
            return (
              <article
                className="flex  flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300 "
                key={offer.id}
              >
                {/* Header */}
                <header className="flex flex-row gap-3 px-5">
                  <div className="w-[50px] h-[50px]  rounded-full border-2 border-gray-400 bg-[#F4F2EE] flex justify-center items-center">
                    <img
                      src="/mascota-clean.png"
                      alt="Foto de la empresa"
                      className="w-[40px] h-[40px] "
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h2 className="text-lg text-[#000000E6] font-semibold">
                      {offer.Branch.name}
                    </h2>
                    <h3 className="text-xs text-[#00000099]">
                      {offer.Branch.province}, {offer.Branch.city}
                    </h3>
                    <h5 className="text-xs font-light text-[#00000099]">
                      {dateUtil.formatedDate(offer.createdAt)}
                    </h5>
                  </div>
                </header>

                <main className="px-5 mt-2">
                  <p className="text-justify text-[15px] text-black font-medium mb-3">
                    {offer.description}
                  </p>

                  <h3 className="text-xs text-[#00000099]">
                    {offer.type}, {offer.contractType}
                  </h3>
                  <h3 className="text-xs text-[#00000099] mt-2">
                    $ {offer.salary}
                  </h3>

                  {isPostulated ? (
                    <button
                      className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-gray-800 text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                      onClick={() => cancelApplyJob(postulationFound.id)}
                    >
                      Cancelar aplicación
                    </button>
                  ) : (
                    <button
                      className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-[#fd6c01] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      onClick={() => applyJob(offer.id)}
                      disabled={!info?.isDataValidated}
                    >
                      {info?.isDataValidated
                        ? 'Aplicar'
                        : 'Completa tu perfil para aplicar'}
                    </button>
                  )}
                </main>
              </article>
            )
          })
        ) : (
          <div>
            <h2>No hay sucursales registradas</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobOffers
