import { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoArrowForwardOutline, IoQrCode } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import {
  branchApi,
  interestApi,
  jobOffersApi,
  messageApi,
  notificationApi,
  postulationApi,
} from "../../api/index.api";
import {
  setBranches,
  setMessages,
  setNotifications,
  setOffers,
} from "../../redux/slices/app.slice";
import {
  CoverLetterModal,
  QRComponent,
} from "../../components/index.components.js";
import { useDispatch } from "react-redux";
import { dateUtil, storageUtil } from "../../utils/index.utils.js";
import { AxiosError } from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { filteredOffers: jobOffers } = useSelector((state) => state.app);
  const [showQR, setShowQR] = useState(false);
  // const [jobOffers, setJobOffers] = useState([]);
  const [jobOfferId, setJobOfferId] = useState(null);
  const [messagesArr, setMessagesArr] = useState([]);
  const [coverLetter, setCoverLetter] = useState(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const toggleShowCoverLetter = () => {
    setShowCoverLetter((prev) => !prev);
  };

  const [postulations, setPostulations] = useState([]);
  const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);
  const { branches } = useSelector((state) => state.app);

  const toggleShowQR = () => {
    setShowQR((prev) => !prev);
  };

  const getPostulations = () => {
    postulationApi.getByUserId(info.id).then((res) => {
      const { jobApplications } = res.data;
      setPostulations(jobApplications);
      dispatch(setPostulations(jobApplications));
    });
  };

  const getInterests = async () => {
    const { token } = storageUtil.getData("session");
    interestApi
      .getByUserId(token, info.id)
      .then((res) => {
        const { interests } = res.data;
        setInterests(interests);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  const followBranch = (id) => {
    const { token } = storageUtil.getData("session");
    interestApi
      .follow(token, info.id, id)
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
        getInterests();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  const groupMessagesByUser = (messages, currentUserId) => {
    const grouped = {};

    messages.forEach((msg) => {
      const isIncoming = msg.ReceiverId === currentUserId;
      const otherUser =
        msg.SenderId === currentUserId ? msg.Receiver : msg.Sender;

      if (!grouped[otherUser.id]) {
        grouped[otherUser.id] = {
          user: otherUser,
          lastMessage: msg,
          unreadCount: 0,
        };
      }

      // Contar si es un mensaje entrante no leído
      if (isIncoming && !msg.isRead) {
        grouped[otherUser.id].unreadCount += 1;
      }

      // Actualizar último mensaje si es más reciente
      const existingTime = new Date(grouped[otherUser.id].lastMessage.senderAt);
      const newTime = new Date(msg.senderAt);
      if (newTime > existingTime) {
        grouped[otherUser.id].lastMessage = msg;
      }
    });

    return Object.values(grouped);
  };

  const unFollowBranch = (id) => {
    const interest = interests.find(
      (interest) => interest.BranchId === id && interest.UserId === info.id
    );

    const { token } = storageUtil.getData("session");
    interestApi
      .unFollow(token, interest.id)
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
        getInterests();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  // useEffect(() => {
  //   toast.warning(
  //     'Completa tu perfil para poder usar los servicios de la plataforma'
  //   )
  // }, [profileCompleted])

  const handleConfirmApplyJob = () => {
    const { token } = storageUtil.getData("session");
    toggleShowCoverLetter();
    postulationApi
      .applyJob(token, {
        UserId: info.id,
        JobOfferId: jobOfferId,
        coverLetter,
      })
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
        getPostulations();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  const applyJob = (JobOfferId) => {
    toggleShowCoverLetter();
    setJobOfferId(JobOfferId);
  };

  const cancelApplyJob = (id) => {
    const { token } = storageUtil.getData("session");
    postulationApi
      .cancelApplyJob(token, id)
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
        getPostulations();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  useEffect(() => {
    const session = storageUtil.getData("session");
    if (!session) {
      navigate("/inicio-sesion");
      return;
    }

    const { token } = session;

    // Get sucursales
    branchApi
      .getAll()
      .then((res) => {
        const { branches } = res.data;
        dispatch(setBranches(branches));
      })
      .catch((err) => {
        console.log(err);
      });

    // Get Ofertas
    jobOffersApi.getAll(token).then((res) => {
      const { jobOffers } = res.data;
      // setJobOffers(jobOffers);
      dispatch(setOffers(jobOffers));
    });
    // Get Mensajes
    messageApi.getMyMessages(info.id).then((res) => {
      const { conversations } = res.data;
      const grouped = groupMessagesByUser(conversations, info.id);
      setMessagesArr(grouped);
      dispatch(setMessages(grouped));
    });
    // Get notificaciones
    notificationApi.getAllByUserId(info.id).then((res) => {
      const { notifications } = res.data;
      dispatch(setNotifications(notifications));
    });
    // Get Postulaciones
    getPostulations();

    // Get Intereses
    interestApi.getByUserId(token, info.id).then((res) => {
      const { interests } = res.data;
      setInterests(interests);
    });
  }, []);

  return (
    <main className="lg:w-[1400px] mx-auto w-full flex lg:flex-row flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      {/* Info */}
      <section className="lg:w-[250px] w-full border border-gray-200 rounded-xl bg-white h-fit pb-10 flex flex-col items-center gap-1 overflow-hidden">
        {/* header */}
        <div className="relative w-full lg:h-[58px] md:h-[150px] h-[80px]">
          <img
            src="/portada.jpg"
            alt=""
            className="absolute w-full h-full object-cover"
          />
          {/* Imagen de perfil */}
          <img
            src={info?.profilePicture || "/user.png"}
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
            <button>
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
        {jobOffers && jobOffers.length > 0 ? (
          jobOffers.map((offer) => {
            const isPostulated = postulations.some(
              (postulation) => postulation.JobOfferId === offer.id
            );
            const postulationFound = postulations.find(
              (postulation) =>
                postulation.JobOfferId === offer.id &&
                postulation.UserId === info.id
            );

            return (
              <article
                className="flex flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300"
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

                  {/* Botones y estados de postulación */}
                  {!postulationFound && (
                    <button
                      className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-[#fd6c01] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      onClick={() => applyJob(offer.id)}
                      disabled={!info?.isDataValidated}
                    >
                      {info?.isDataValidated
                        ? "Aplicar"
                        : "Completa tu perfil para aplicar"}
                    </button>
                  )}

                  {postulationFound?.status === "Pendiente" && (
                    <button
                      className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-gray-800 text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                      onClick={() => cancelApplyJob(postulationFound.id)}
                    >
                      Cancelar aplicación
                    </button>
                  )}

                  {postulationFound?.status === "Aceptada" && (
                    <h3 className="text-sm font-semibold text-green-600 mt-2">
                      Ya has sido aceptado para esta oferta.
                    </h3>
                  )}

                  {postulationFound?.status === "Rechazada" && (
                    <h3 className="text-sm font-semibold text-red-600 mt-2">
                      Tu postulación fue rechazada. Gracias por tu interés.
                    </h3>
                  )}
                </main>
              </article>
            );
          })
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
            branches.map((branch) => {
              const isFollowing = interests.some(
                (inter) => inter.BranchId === branch.id
              );
              return (
                <article className="flex flex-row gap-3" key={branch.id}>
                  {/* Foto de la sucursal */}
                  <img
                    src=""
                    alt=""
                    className="w-[50px] h-[50px] rounded-full bg-red-300"
                  />

                  <div className="flex flex-col">
                    <NavLink
                      to={`/branches/${branch.id}`}
                      className="cursor-pointer text-[14px] font-bold"
                    >
                      {branch.name}
                    </NavLink>
                    <h5 className="text-xs font-light text-gray-500">
                      {branch.city}, {branch.province}
                    </h5>

                    {isFollowing ? (
                      <button
                        className="w-full flex flex-row gap-1 items-center justify-center py-1 border border-red-500 rounded-full mt-2 cursor-pointer hover:bg-red-500/10 px-5 bg-red-500/20"
                        onClick={() => unFollowBranch(branch.id)}
                      >
                        <FaPlus size={14} color="red" />
                        <span className="font-bold text-red-600 text-[16px]">
                          Dejar de seguir
                        </span>
                      </button>
                    ) : (
                      <button
                        className="w-full flex flex-row gap-1 items-center justify-center py-1 border border-black rounded-full mt-2 cursor-pointer hover:bg-black/20 px-5 bg-black/10"
                        onClick={() => followBranch(branch.id)}
                      >
                        <FaPlus size={14} />
                        <span className="font-bold text-[#000000BF] text-[16px]">
                          Seguir
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          ) : (
            <div className="w-full px-5 py-10 flex justify-center items-center">
              <h2 className="text-[16px] text-[#000000BF] font-semibold">
                No hay sucursales publicadas
              </h2>
            </div>
          )}
          {branches && branches.length > 0 && (
            <NavLink
              to={"/branches"}
              className="flex flex-row items-center gap-2 "
            >
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
      {showCoverLetter && (
        <CoverLetterModal
          toggleShowCoverLetter={toggleShowCoverLetter}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          handleConfirmApplyJob={handleConfirmApplyJob}
        />
      )}

      {showQR && <QRComponent toggleShowQR={toggleShowQR} />}
    </main>
  );
};

export default Home;
