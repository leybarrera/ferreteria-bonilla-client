import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { storageUtil } from '../../../utils/index.utils'
import { hfAPI, postulationApi } from '../../../api/index.api'
import { IoFilter } from 'react-icons/io5'
import { RiEdit2Fill, RiEyeFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import {
  OfferModal,
  PostulationModal,
} from '../../../components/index.components'

const Postulations = () => {
  const { info } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [jobOffer, setJobOffer] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [currentPostulation, setCurrentPostulation] = useState({})
  const [showPostulationModal, setShowPostulationModal] = useState(false)
  const [groupedPostulations, setGroupedPostulations] = useState([])
  const [message, setMessage] = useState(null)

  const togglePostulationModal = () => {
    setShowPostulationModal((prev) => !prev)
  }

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const handleViewPostulation = (postulation) => {
    setCurrentPostulation(postulation)
    togglePostulationModal()
  }

  const viewJobOffer = (jobOffer) => {
    setJobOffer(jobOffer)
    toggleModal()
  }

  const groupApplications = (applications) => {
    const groupedByBranch = applications.reduce((acc, app) => {
      const branchName = app.JobOffer.Branch.name
      if (!acc[branchName]) acc[branchName] = []
      acc[branchName].push(app)
      return acc
    }, {})

    return Object.entries(groupedByBranch).map(([branchName, apps]) => {
      const groupedByJobOffer = apps.reduce((acc, app) => {
        const jobOfferId = app.JobOfferId
        if (!acc[jobOfferId]) acc[jobOfferId] = []
        acc[jobOfferId].push(app)
        return acc
      }, {})

      const offers = Object.entries(groupedByJobOffer).map(
        ([jobOfferId, apps]) => ({
          jobOfferId,
          applications: apps,
        })
      )

      return {
        branchName,
        applications: offers,
      }
    })
  }

  const filterWithIA = async (jobOffers, branchName, jobOfferId) => {
    const { token } = storageUtil.getData('session')
    const description = jobOffers[0].JobOffer.description
    const requirements = jobOffers[0].JobOffer.requirements

    const applicants = jobOffers.map((offer) => ({
      id: offer.UserId,
      cv: offer.User.Resumes[0].parsedResume,
    }))

    const data = {
      description,
      requirements,
      applicants,
    }

    setLoading(true)

    try {
      const res = await hfAPI.evaluateApplicants(data, token)
      const { filterApplicants } = res.data

      if (filterApplicants.length > 0) {
        setMessage(
          `Luego de aplicar el proceso de filtrado mediante inteligencia artificial, se ha determinado que ${
            filterApplicants.length
          } ${
            filterApplicants.length === 1 ? 'postulante' : 'postulantes'
          } presentan un alto grado de compatibilidad con la propuesta de empleo. Por lo tanto, podrían avanzar a la siguiente etapa del proceso de selección para una evaluación más detallada.`
        )
        const filteredIds = filterApplicants.map((app) => app.id)

        const filteredJobOffers = jobOffers.filter((offer) =>
          filteredIds.includes(offer.UserId)
        )

        const updatedGroupedPostulations = groupedPostulations.map((group) => {
          if (group.branchName !== branchName) return group

          const updatedApplications = group.applications.map((application) => {
            if (application.jobOfferId !== jobOfferId) return application

            return {
              ...application,
              applications: filteredJobOffers,
            }
          })

          return {
            ...group,
            applications: updatedApplications,
          }
        })

        setGroupedPostulations(updatedGroupedPostulations)
      }
    } catch (err) {
      console.error('Error al filtrar con IA:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const { token } = storageUtil.getData('session')

    if (info.role === 'Administrador') {
      postulationApi
        .getAll(token)
        .then((res) => {
          const { jobApplications } = res.data
          const grouped = groupApplications(jobApplications)
          setGroupedPostulations(grouped)
        })
        .catch((err) => {
          console.error('Error al obtener postulaciones:', err)
        })
    }
  }, [info])

  return (
    <main className="w-full h-full flex py-20 flex-col lg:px-10 md:px-5 px-2">
      {groupedPostulations.map((pst) => (
        <div
          key={pst.branchName}
          className="flex flex-col py-10 border-b border-gray-300"
        >
          <h2 className="text-3xl font-bold">{pst.branchName}</h2>

          {pst.applications.length > 0 ? (
            <div className="mt-5 flex flex-col w-full items-start pb-10">
              {pst.applications.map((app) => {
                const jobOfferTitle = app.applications[0]?.JobOffer.title

                return (
                  <div
                    key={app.jobOfferId}
                    className="flex flex-col gap-2 w-full"
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <h2 className="font-bold text-xl text-center">Oferta</h2>
                      <h3 className="font-mono text-lg text-gray-700 mt-3">
                        {jobOfferTitle}
                      </h3>
                    </div>

                    <button
                      className="flex flex-row items-center gap-2 bg-[#fd6c01] text-white px-5 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 cursor-pointer w-fit"
                      onClick={() =>
                        filterWithIA(
                          app.applications,
                          pst.branchName,
                          app.applications[0].JobOfferId
                        )
                      }
                    >
                      <IoFilter />
                      <span>Filtrar candidatos</span>
                    </button>

                    <div className="flex flex-row gap-3 justify-evenly mt-10 flex-wrap w-full">
                      {app.applications.map((apps) => (
                        <article
                          key={apps.id}
                          className="flex flex-col gap-2 px-5 py-10 border border-gray-200 bg-white rounded-lg w-[400px] justify-center items-center relative"
                        >
                          <button
                            className="absolute top-2 left-2 px-2 py-1 rounded-lg text-[#fd6c01] text-sm cursor-pointer hover:text-[#cb4d03] transition-all duration-300 hover:scale-110"
                            onClick={() => handleViewPostulation(apps)}
                          >
                            <RiEdit2Fill size={20} />
                          </button>

                          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-[#fd6c01] text-white text-sm">
                            {apps.status}
                          </span>

                          <img
                            src={apps.User.profilePicture || '/user.png'}
                            alt="Foto de perfil"
                            className="w-[100px] h-[100px] rounded-full"
                          />

                          <h2 className="text-lg font-bold">
                            {apps.User.fullName}
                          </h2>

                          <div className="flex flex-row items-center gap-1 w-full">
                            {apps.User.Resumes.length > 0 && (
                              <NavLink
                                to={apps.User.Resumes[0].url}
                                target="_blank"
                                className="flex-1 bg-[#fd6c01] text-white px-3 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 text-center"
                              >
                                Ver CV
                              </NavLink>
                            )}
                            <NavLink
                              to={`/perfil/${apps.User.id}`}
                              target="_blank"
                              className="flex-1 bg-[#fd6c01] text-white px-3 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 text-center"
                            >
                              Ver perfil
                            </NavLink>
                          </div>

                          <button
                            className="flex flex-row items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-black/80 transition-all duration-300 cursor-pointer w-full text-center justify-center"
                            onClick={() => viewJobOffer(apps.JobOffer)}
                          >
                            <span>Ver oferta</span>
                            <RiEyeFill />
                          </button>
                        </article>
                      ))}
                    </div>

                    {message && (
                      <div className="px-10">
                        <div className="h-fit bg-black  rounded-xl border border-gray-200 flex justify-center items-center px-5 py-10">
                          <h2 className="text-lg font-mono text-white text-center">
                            {message}
                          </h2>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-10 w-full h-fit py-10 flex flex-col justify-center items-center bg-white px-5 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200">
              <img
                src="/no-data.png"
                alt="Imagen de vacío"
                className="w-[100px]"
              />
              <h2 className="text-2xl mt-2 font-bold">
                Esta sucursal no tiene postulaciones
              </h2>
            </div>
          )}
        </div>
      ))}

      <OfferModal
        showModal={showModal}
        toggleModal={toggleModal}
        jobOffer={jobOffer}
      />

      {showPostulationModal && (
        <PostulationModal
          currentPostulation={currentPostulation}
          togglePostulation={togglePostulationModal}
        />
      )}

      {loading && (
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center gap-2 z-50 overflow-hidden bg-black/80">
          <div className="w-[30px] h-[30px] rounded-full border-4 border-white border-t-[#fd6c01] animate-spin"></div>
          <h2 className="text-lg font-semibold text-white mt-3">
            Filtrando postulaciones. Por favor espere...
          </h2>
        </div>
      )}
    </main>
  )
}

export default Postulations
