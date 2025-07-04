import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { jobOffersApi } from "../../../api/index.api";
import { storageUtil } from "../../../utils/index.utils";
import { useState } from "react";
import { AxiosError } from "axios";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import { NewOfferModal } from "../../../components/index.components.js";
import { useSelector } from "react-redux";

const Offers = () => {
  const { info } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const [offers, setOffers] = useState([]);

  const deleteOffer = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        const { token } = storageUtil.getData("session");

        jobOffersApi
          .delete(token, id)
          .then((res) => {
            const { message } = res.data;
            toast.success(message);
            setOffers((prev) => prev.filter((offer) => offer.id !== id));
          })
          .catch((err) => {
            if (err instanceof AxiosError) {
              toast.error(err.response.data.message);
            } else {
              toast.error("Error desconocido. Intente más tarde.");
            }
          });
      }
    });
  };

  const getOffers = () => {
    const { token } = storageUtil.getData("session");
    if (info.role === "Administrador") {
      jobOffersApi.getAll(token).then((res) => {
        const { jobOffers } = res.data;
        setOffers(jobOffers);
      });
    } else {
      jobOffersApi.getByEmployeeId(token, info.id).then((res) => {
        const { jobOffers } = res.data;
        setOffers(jobOffers);
      });
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 esto hace scroll al top suavemente
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpieza por si acaso
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    if (success) {
      getOffers();
      setSuccess(false);
    }
  }, [success]);

  useEffect(() => {
    getOffers();
  }, []);
  return (
    <main
      className={`w-full  flex lg:px-10   md:px-5 px-2 flex-col ${
        showModal
          ? "lg:py-0 overflow-y-hidden h-screen"
          : "py-20 lg:py-10 h-full"
      }`}
    >
      <h2 className="text-3xl font-bold">Ofertas Laborales</h2>
      {/* Seccion busqueda y agregar */}
      <section className="w-full flex flex-row items-center justify-end mt-5">
        {/* Busqueda */}

        <button
          className="bg-[#fd6c01] text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-[#cb4d03] transition-all duration-300"
          type="button"
          onClick={toggleModal}
        >
          Crear oferta
        </button>
      </section>
      {/* Tabla de sucursales */}
      {offers && offers.length > 0 ? (
        <section className="mt-5 grid lg:grid-cols-2 grid-cols-1 gap-2 ">
          {offers.map((offer) => (
            <article
              className="w-full h-fit bg-white rounded-lg px-5 py-10 relative"
              key={offer.id}
            >
              {offer.isActive ? (
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
                    {offer.Branch.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold text-lg">Descripción de la oferta</h2>
                <div className="w-full h-[200px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2">
                  <span className="font-bold text-sm text-gray-400 text-justify">
                    {offer.description}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 justify-between mb-5">
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-bold text-lg">Salario</h2>
                  <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                    <span className="font-bold text-sm text-gray-400">
                      {offer.salary}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-bold text-lg">Contrato</h2>
                  <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                    <span className="font-bold text-sm text-gray-400">
                      {offer.contractType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2 justify-between mb-5">
                <div className="flex flex-1 flex-col gap-2 mb-5">
                  <h2 className="font-bold text-lg">Ubicación</h2>
                  <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                    <span className="font-bold text-sm text-gray-400">
                      {offer.Branch.province} / {offer.Branch.city}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 mb-5">
                  <h2 className="font-bold text-lg">Tipo</h2>
                  <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                    <span className="font-bold text-sm text-gray-400">
                      {offer.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold text-lg">Requerimientos</h2>
                <div className="w-full h-[200px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2">
                  <span className="font-bold text-sm text-gray-400 text-justify">
                    {offer.requirements}
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2 justify-between mb-5">
                <div className="flex flex-1 flex-col gap-2 mb-5">
                  <h2 className="font-bold text-lg">Publicada el</h2>
                  <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                    <span className="font-bold text-sm text-gray-400">
                      {offer.createdAt.split("T")[0]}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 mb-5">
                  <h2 className="font-bold text-lg">Expira el</h2>
                  <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                    <span className="font-bold text-sm text-gray-400">
                      {offer.expirationDate
                        ? offer.expirationDate.split("T")[0]
                        : "Sin fecha de expiración"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="bg-red-800 text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-red-900 transition-all duration-300 w-full"
                onClick={() => deleteOffer(offer.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </section>
      ) : (
        <div className="mt-5 flex flex-col justify-center items-center gap-2">
          <img src="/no-data.png" alt="No Data" className="w-[100px] mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-500">
            No hay ofertas publicadas
          </h2>
        </div>
      )}

      <Toaster richColors position="bottom-right" />
      <NewOfferModal
        showModal={showModal}
        toggleModal={toggleModal}
        setSuccess={setSuccess}
      />
    </main>
  );
};

export default Offers;
