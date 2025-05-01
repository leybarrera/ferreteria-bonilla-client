import { useEffect } from 'react'
import { IoFilter, IoSearch } from 'react-icons/io5'
import { RiEyeFill } from 'react-icons/ri'
import { storageUtil } from '../../../utils/index.utils'
import { postulationApi } from '../../../api/index.api'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { OfferModal } from '../../../components/index.components'

const Postulations = () => {
  const [jobOffer, setJobOffer] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [jobApplications, setJobApplications] = useState([])

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const viewJobOffer = (jobOffer) => {
    console.log(jobOffer)
    setJobOffer(jobOffer)
    toggleModal()
  }

  useEffect(() => {
    const session = storageUtil.getData('session')
    const { token } = session

    postulationApi.getAll(token).then((res) => {
      const { jobApplications } = res.data

      const filteredJobApplications = jobApplications.reduce((acc, app) => {
        const branchName = app.JobOffer.Branch.name

        if (!acc[branchName]) {
          acc[branchName] = []
        }

        acc[branchName].push(app)
        return acc
      }, {})

      // Convertir el objeto agrupado en un array para poder mapearlo
      const groupedArray = Object.entries(filteredJobApplications).map(
        ([branchName, applications]) => ({
          branchName,
          applications,
        })
      )

      console.log(groupedArray)

      setJobApplications(groupedArray)
    })
  }, [])
  return (
    <main className="w-full h-full flex py-20 flex-col">
      {jobApplications && jobApplications.length > 0 ? (
        jobApplications.map((joba) => (
          <div>
            <h2 className="text-3xl font-bold lg:px-10 md:px-5 px-2">
              {joba.branchName}
            </h2>

            <section className="w-full flex flex-col mt-10 items-start  border-b border-gray-200 pb-10 lg:px-10 md:px-5 px-2">
              {joba.applications.length > 0 ? (
                <>
                  <div className="flex flex-row items-center justify-between w-full">
                    <button className="flex flex-row items-center gap-2 bg-[#fd6c01] text-white px-5 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 cursor-pointer">
                      <span>Filtrar candidatos</span>
                      <IoFilter />
                    </button>
                  </div>

                  <div className="flex flex-row gap-3 justify-evenly mt-10 flex-wrap">
                    {joba.applications.map((job) => (
                      <article
                        className="flex flex-col gap-2 px-5 py-10 border border-gray-200 bg-white rounded-lg w-[400px] justify-center items-center relative"
                        key={job.id}
                      >
                        <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-[#fd6c01] text-white text-sm">
                          {job.status}
                        </span>
                        {/* Foto */}
                        <img
                          src={
                            job.User.profilePicture
                              ? job.User.profilePicture
                              : '/user.png'
                          }
                          alt="Foto de perfil del usuario"
                          className="w-[100px] h-[100px] rounded-full"
                        />
                        <h2 className="text-lg font-bold">
                          {job.User.fullName}
                        </h2>

                        <div className="flex flex-row items-center gap-1 w-full">
                          {job.User.Resumes.length > 0 && (
                            <NavLink
                              to={job.User.Resumes[0].url}
                              target="_blank"
                              className="flex-1 bg-[#fd6c01] text-white px-3 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 text-center"
                            >
                              Ver CV
                            </NavLink>
                          )}
                          <NavLink
                            to={`/perfil/${job.User.id}`}
                            target="_blank"
                            className="flex-1 bg-[#fd6c01] text-white px-3 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 text-center"
                          >
                            Ver perfil
                          </NavLink>
                        </div>
                        <button
                          className="flex flex-row items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-black/80 transition-all duration-300 cursor-pointer w-full text-center justify-center"
                          onClick={() => viewJobOffer(job.JobOffer)}
                        >
                          <span>Ver oferta</span>
                          <RiEyeFill />
                        </button>
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-3 text-xl font-semibold text-gray-400 flex justify-center items-center ">
                  <h2 className="text-center">No hay postulaciones</h2>
                </div>
              )}

              {/* Nota de la IA */}
              {/* <div className="w-full px-3 py-5 bg-green-600 rounded-lg text-white mt-5">
          <span>
            Después de revisar los perfiles de los candidatos, podemos confirmar
            que un total de 3 personas cumplen con los requisitos establecidos
            en la oferta laboral que nos has proporcionado. Estos candidatos han
            demostrado contar con las habilidades, experiencia y cualidades
            necesarias que coinciden con los requerimientos del puesto ofrecido.
            <br />
            <br />
            Los perfiles seleccionados cumplen con los siguientes aspectos clave
            de la oferta:
            <ul>
              <li>
                Experiencia específica en el área solicitada, alineada con las
                responsabilidades del puesto.
              </li>
              <li>
                Competencias técnicas requeridas para el desempeño exitoso en el
                rol.
              </li>
              <li>
                Actitudes y valores que coinciden con la cultura y los objetivos
                de la empresa.
              </li>
            </ul>
            Estos tres candidatos son altamente adecuados para el puesto y
            tienen el potencial de contribuir de manera significativa a los
            objetivos de la empresa.
          </span>
        </div> */}

              {/* <div className="w-full px-3 py-5 bg-red-700 rounded-lg text-white mt-5">
          <span>
            Tras revisar los perfiles de los candidatos, lamentablemente no se
            han encontrado personas que cumplan con los requisitos establecidos
            en la oferta laboral. Ninguno de los candidatos tiene las
            habilidades, experiencia o competencias necesarias para el puesto
            solicitado en esta ocasión.
            <br />
            <br />
            Esto puede deberse a una desalineación en los perfiles con los
            requisitos específicos de la oferta. Se recomienda revisar
            nuevamente los detalles del puesto o realizar un ajuste en los
            criterios de selección para asegurar que los futuros candidatos sean
            más acordes a las necesidades de la empresa.
          </span>
        </div> */}
            </section>
          </div>
        ))
      ) : (
        <div>
          <h2>No hay postulaciones</h2>
        </div>
      )}

      <OfferModal
        showModal={showModal}
        toggleModal={toggleModal}
        jobOffer={jobOffer}
      />
    </main>
  )
}

export default Postulations
