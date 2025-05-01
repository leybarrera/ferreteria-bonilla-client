const OfferModal = ({ showModal, toggleModal, jobOffer }) => {
  return (
    <div
      className={`${
        showModal ? 'block' : 'hidden'
      } absolute w-full h-screen bg-black/50 top-0 left-0 z-50 flex justify-center items-center
    `}
    >
      <div className="lg:w-[900px] h-fit bg-white rounded-lg px-5 py-10 relative">
        {jobOffer?.isActive ? (
          <span className="absolute top-3 right-5 px-5 py-1 rounded-full text-white bg-green-400 text-sm">
            Activa
          </span>
        ) : (
          <span className="absolute top-3 right-5 px-5 py-1 rounded-full text-white bg-red-700 text-sm">
            Inactiva
          </span>
        )}

        <div className="flex flex-col gap-2 mb-5">
          <h2 className="font-bold text-lg">Oferta publicada por</h2>
          <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
            <span className="font-bold text-sm text-gray-400">
              {jobOffer?.Branch?.name}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="font-bold text-lg">Descripción de la oferta</h2>
          <div className="w-full h-[100px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2">
            <span className="font-bold text-sm text-gray-400 text-justify">
              {jobOffer?.description}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 justify-between mb-5">
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-bold text-lg">Salario</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                {jobOffer?.salary}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-bold text-lg">Contrato</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                {jobOffer?.contractType}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 justify-between mb-5">
          <div className="flex flex-1 flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Ubicación</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                {jobOffer?.Branch?.province} / {jobOffer?.Branch?.city}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Tipo</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                {jobOffer?.type}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <h2 className="font-bold text-lg">Requerimientos</h2>
          <div className="w-full h-[100px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2">
            <span className="font-bold text-sm text-gray-400 text-justify">
              {jobOffer?.requirements}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 justify-between mb-5">
          <div className="flex flex-1 flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Publicada el</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                {jobOffer?.createdAt?.split('T')[0]}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Expira el</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                {jobOffer?.expirationDate
                  ? jobOffer?.expirationDate?.split('T')[0]
                  : 'Sin fecha de expiración'}
              </span>
            </div>
          </div>
        </div>

        <button
          className="bg-red-800 text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-red-900 transition-all duration-300 w-full"
          onClick={toggleModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default OfferModal
