import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { postulationApi } from '../../api/index.api'
import { dateUtil, storageUtil } from '../../utils/index.utils'
import { AxiosError } from 'axios'
import { toast, Toaster } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'

const Applications = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [postulations, setPostulations] = useState([])
  const [postulation, setPostulation] = useState(null)
  const { info } = useSelector((state) => state.user)

  const deletePostulation = async (id) => {
    const { token } = storageUtil.getData('session')
    postulationApi
      .deletePostulation(token, id)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        if (id === postulation.id) {
          setPostulation(null)
          navigate('/applications')
        } else {
          const newPostulations = postulations.filter(
            (postulation) => postulation.id !== id
          )
          setPostulations(newPostulations)
        }
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente mas tarde.')
        }
      })
  }

  const cancelApplication = async (id) => {
    const { token } = storageUtil.getData('session')
    postulationApi
      .cancelApplyJob(token, id)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        const newPostulations = postulations.filter(
          (postulation) => postulation.id !== id
        )
        setPostulations(newPostulations)
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente mas tarde.')
        }
      })
  }

  const getStatusPill = (status) => {
    switch (status) {
      case 'Pendiente':
        return (
          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-[#fd6c01] text-white">
            Pendiente
          </span>
        )
      case 'Aceptada':
        return (
          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-green-600 text-white">
            Aceptada
          </span>
        )
      case 'Rechazada':
        return (
          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-600 text-white">
            Rechazada
          </span>
        )
    }
  }

  useEffect(() => {
    const { token } = storageUtil.getData('session')

    if (!id) {
      postulationApi.getByUserId(info.id).then((res) => {
        const { jobApplications } = res.data
        console.log(jobApplications)
        setPostulations(jobApplications)
      })
    } else {
      postulationApi.getById(token, id).then((res) => {
        const { jobApplication } = res.data
        setPostulation(jobApplication)
      })
    }
  }, [])

  return (
    <main className="lg:w-[1400px] mx-auto h-full w-full lg:px-0 px-5 py-10">
      {postulation && id ? (
        <article
          className="h-fit w-full rounded-lg bg-white border border-gray-200 cursor-pointer transition-all duration-500 flex flex-col   px-5 relative py-10"
          key={postulation.id}
        >
          {getStatusPill(postulation.status)}
          <h2 className="font-bold text-2xl text-wrap ">
            {postulation.JobOffer.title}
          </h2>
          <h4 className="text-gray-600 text-lg font-bold">
            {postulation.JobOffer.Branch.name} -{' '}
            {postulation.JobOffer.Branch.city}
          </h4>
          <h3 className="text-gray-400 text-[15px]">
            {dateUtil.formatedDate(postulation.appliedAt)}
          </h3>
          <div className="flex flex-col mt-3">
            <h4 className="font-bold">Carta de presentación</h4>
            <div className="w-full h-[200px] bg-gray-200 rounded-lg mt-3 py-2 px-3">
              <span className="text-sm text-wrap text-gray-600">
                {postulation.coverLetter}
              </span>
            </div>
          </div>
          {postulation.observations && (
            <div className="flex flex-col mt-3">
              <h4 className="font-bold">Observaciones</h4>
              <div className="w-full h-[200px] bg-gray-200 rounded-lg mt-3 py-2 px-3">
                <span className="text-sm text-wrap text-gray-600">
                  {postulation.observations}
                </span>
              </div>
            </div>
          )}
          {postulation.status === 'Rechazada' && (
            <button
              className="mt-3 px-5 py-2 rounded-lg bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all duration-300 font-bold"
              onClick={() => deletePostulation(postulation.id)}
            >
              Eliminar postulación
            </button>
          )}

          {postulation.status === 'Pendiente' && (
            <button
              className="mt-3 px-5 py-2 rounded-lg bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all duration-300 font-bold"
              onClick={() => cancelApplication(postulation.id)}
            >
              Cancelar postulación
            </button>
          )}

          {postulation.status === 'Aceptada' && (
            <span className="mt-3 px-5 py-2 rounded-lg bg-green-700 text-white cursor-pointer hover:bg-green-800 transition-all duration-300 font-bold">
              Tú postulación ha sido aceptada. En breve te contactaremos para la
              entrevista
            </span>
          )}
        </article>
      ) : postulations && postulations.length > 0 ? (
        <>
          {/* Barra de busqueda */}
          <div className="bg-white rounded-lg flex flex-row h-[50px] ">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Buscar postulaciones"
              className="flex-1 h-full outline-none px-5 text-gray-400"
            />
            <div className="w-[70px] h-full flex justify-center items-center">
              <IoSearch size={25} color="#d1d5dc" />
            </div>
          </div>

          {/* POstulaciones */}
          <section className="flex flex-row justify-evenly flex-wrap gap-5 mt-10">
            {postulations.map((postulation) => {
              return (
                <article
                  className="h-fit w-full rounded-lg bg-white border border-gray-200 cursor-pointer transition-all duration-500 flex flex-col   px-5 relative py-10"
                  key={postulation.id}
                >
                  {getStatusPill(postulation.status)}
                  <h2 className="font-bold text-2xl text-wrap ">
                    {postulation.JobOffer.title}
                  </h2>
                  <h4 className="text-gray-600 text-lg font-bold">
                    {postulation.JobOffer.Branch.name} -{' '}
                    {postulation.JobOffer.Branch.city}
                  </h4>
                  <h3 className="text-gray-400 text-[15px]">
                    {dateUtil.formatedDate(postulation.appliedAt)}
                  </h3>
                  <div className="flex flex-col mt-3">
                    <h4 className="font-bold">Carta de presentación</h4>
                    <div className="w-full h-[200px] bg-gray-200 rounded-lg mt-3 py-2 px-3">
                      <span className="text-sm text-wrap text-gray-600">
                        {postulation.coverLetter}
                      </span>
                    </div>
                  </div>
                  {postulation.observations && (
                    <div className="flex flex-col mt-3">
                      <h4 className="font-bold">Observaciones</h4>
                      <div className="w-full h-[200px] bg-gray-200 rounded-lg mt-3 py-2 px-3">
                        <span className="text-sm text-wrap text-gray-600">
                          {postulation.observations}
                        </span>
                      </div>
                    </div>
                  )}
                  {postulation.status === 'Rechazada' && (
                    <button
                      className="mt-3 px-5 py-2 rounded-lg bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all duration-300 font-bold"
                      onClick={() => cancelApplication(postulation.id)}
                    >
                      Eliminar postulación
                    </button>
                  )}

                  {postulation.status === 'Pendiente' && (
                    <button
                      className="mt-3 px-5 py-2 rounded-lg bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all duration-300 font-bold"
                      onClick={() => cancelApplication(postulation.id)}
                    >
                      Cancelar postulación
                    </button>
                  )}

                  {postulation.status === 'Aceptada' && (
                    <span className="mt-3 px-5 py-2 rounded-lg bg-green-700 text-white cursor-pointer hover:bg-green-800 transition-all duration-300 font-bold">
                      Tú postulación ha sido aceptada. En breve te contactaremos
                      para la entrevista
                    </span>
                  )}
                </article>
              )
            })}
          </section>
        </>
      ) : (
        <div className="mt-5 flex flex-col justify-center items-center gap-2">
          <img src="/no-data.png" alt="No Data" className="w-[100px] mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-500">
            No hay postulaciones registradas
          </h2>
        </div>
      )}

      <Toaster richColors position="bottom-right" />
    </main>
  )
}

export default Applications
