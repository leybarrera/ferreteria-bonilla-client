import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  branchApi,
  hfAPI,
  jobOffersApi,
  postulationApi,
} from "../../../api/index.api";
import { storageUtil } from "../../../utils/index.utils";
import { IoFilter } from "react-icons/io5";
import { RiCloseFill, RiEdit2Fill, RiEyeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import {
  OfferModal,
  PostulationModal,
} from "../../../components/index.components";

const Postulations = () => {
  const { info } = useSelector((state) => state.user);
  const [status, setStatus] = useState("Todas");

  const [branches, setBranches] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);

  const [branch, setBranch] = useState(null);
  const [jobOffer, setJobOffer] = useState(null);
  const [dataJobOffer, setDataJobOffer] = useState(null);

  const [postulations, setPostulations] = useState(null);
  const [message, setMessage] = useState(null);

  const [currentPostulation, setCurrentPostulation] = useState(null);
  const [showPostulationModal, setShowPostulationModal] = useState(false);

  const statusPostulations = [
    {
      name: "Pendiente",
      value: "Pendiente",
    },
    {
      name: "Aceptada",
      value: "Aceptada",
    },
    {
      name: "Rechazada",
      value: "Rechazada",
    },
  ];

  const togglePostulationModal = () => {
    setShowPostulationModal((prev) => !prev);
  };

  const viewPostulation = (pst) => {
    setCurrentPostulation(pst);
    console.log(pst);
    togglePostulationModal();
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const viewJobOffer = (id) => {
    const dataJobOffer = jobOffers.find((jobOffer) => jobOffer.id === id);
    setDataJobOffer(dataJobOffer);
    toggleModal();
  };

  const getBranches = () => {
    branchApi.getAll().then((res) => {
      const { branches } = res.data;
      setBranches(branches);
    });
  };

  const getOffers = () => {
    const { token } = storageUtil.getData("session");
    jobOffersApi.geByBranchId(token, branch).then((res) => {
      const { jobOffers: jobOffersDB } = res.data;
      setJobOffers(jobOffersDB);
    });
  };

  const getPostulations = () => {
    const { token } = storageUtil.getData("session");
    postulationApi.getByJobOfferId(token, jobOffer).then((res) => {
      const { postulations: postulationsDB } = res.data;
      console.log(postulationsDB);
      setPostulations(postulationsDB);
    });
  };

  const handleBranch = (e) => {
    const { value } = e.target;
    setBranch(value);
  };

  const handleJobOffer = (e) => {
    const { value } = e.target;
    setJobOffer(value);
  };

  const filterWithIA = async () => {
    const { token } = storageUtil.getData("session");
    const jobOfferData = jobOffers.find((jb) => jb.id === jobOffer);
    const { description, requirements, id } = jobOfferData;
    const postulationsFound = postulations.filter(
      (pst) => pst.JobOfferId === jobOffer
    );
    const applicants = postulationsFound.map((pst) => ({
      id: pst.User.id,
      cv: pst.User.Resume.parsedResume,
    }));

    const data = {
      JobOfferId: id,
      description,
      requirements,
      applicants,
    };
    try {
      const res = await hfAPI.evaluateApplicants(data, token);
      const { filterApplicants } = await res.data;
      if (filterApplicants.length > 0) {
        setMessage(
          `Luego de aplicar el proceso de filtrado mediante inteligencia artificial se ha determinado que ${
            filterApplicants.length
          } ${filterApplicants.length === 1 ? "candidato" : "candidatos"} se ${
            filterApplicants.length === 1 ? "considera" : "consideran"
          } ${
            filterApplicants.length === 1 ? "apto" : "aptos"
          } para la oferta de trabajo ya que ${
            filterApplicants.length === 1 ? "presenta" : "presentan"
          } un algo grado de compatibilidad con la propuesta de empleo. Por lo tanto podrían avanzar a la siguiente etapa del proceso de selección para una evaluación final y más detallada.`
        );

        console.log(filterApplicants);

        const filteredIds = filterApplicants.map((filt) => filt.id);
        const filteredPostulations = postulations.filter((pst) =>
          filteredIds.includes(pst.UserId)
        );
        setPostulations(filteredPostulations);
      } else {
        setMessage(
          `No se ha determinado ningun candidato apto para la oferta de trabajo, por lo tanto no podrán avanzar a la siguiente etapa del proceso de selección para una evaluación final y más detallada. Todas las postulaciones han sido rechazadas automáticamente.`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusPostulations = (e) => {
    const { token } = storageUtil.getData("session");
    const { value } = e.target;
    setStatus(value);
    postulationApi.getByStatus(token, value, jobOffer).then((res) => {
      const { jobApplications } = res.data;
      setPostulations(jobApplications);
    });
  };

  useEffect(() => {
    if (jobOffer) {
      getPostulations();
    }
  }, [jobOffer]);

  useEffect(() => {
    if (branch) {
      getOffers();
    }
  }, [branch]);

  useEffect(() => {
    getBranches();
  }, [info]);

  return (
    <main className="w-full h-full flex lg:pt-10 pt-20 flex-col lg:px-10 md:px-5 px-2">
      {/* Filtros */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Sucursal</h2>
        <select
          name="branch"
          id="branch"
          className="w-full h-[50px] bg-white px-3 border border-gray-300 rounded-lg"
          onChange={handleBranch}
        >
          <option selected disabled>
            Seleccione una sucursal
          </option>
          {branches &&
            branches.map((branch) => (
              <option value={branch.id} key={branch.id}>
                {branch.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-2xl font-bold">Oferta de trabajo</h2>
        <select
          name="branch"
          id="branch"
          className="w-full h-[50px] bg-white px-3 border border-gray-300 rounded-lg"
          onChange={handleJobOffer}
        >
          <option selected disabled>
            Seleccione una oferta de trabajo
          </option>
          {jobOffers &&
            jobOffers.map((jbo) => (
              <option value={jbo.id} key={jbo.id}>
                {jbo.title}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-2xl font-bold">Estado</h2>
        <select
          name="branch"
          id="branch"
          disabled={postulations === null}
          className="w-full h-[50px] bg-white px-3 border border-gray-300 rounded-lg"
          onChange={handleStatusPostulations}
        >
          <option selected value="Todas">
            Todas
          </option>
          {postulations &&
            statusPostulations.map((stp) => (
              <option value={stp.value} key={stp.value}>
                {stp.name}
              </option>
            ))}
        </select>
      </div>

      {/* Listado de postulaciones */}
      {postulations !== null &&
        (postulations.length > 0 ? (
          <div className="flex flex-col gap-2 mt-10">
            {status === "Pendiente" && (
              <button
                className="flex flex-row items-center gap-2 bg-[#fd6c01] text-white px-5 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 cursor-pointer w-fit"
                onClick={filterWithIA}
              >
                <IoFilter />
                <span>Filtrar candidatos</span>
              </button>
            )}

            <div className="flex flex-row gap-3 justify-evenly mt-10 flex-wrap w-full mb-10 ">
              {postulations.map((pst) => (
                <article className="flex flex-col gap-2 px-5 py-10 border border-gray-200 bg-white rounded-lg w-[400px] justify-center items-center relative">
                  <button
                    className="absolute top-2 left-2 px-2 py-1 rounded-lg text-[#fd6c01] text-sm cursor-pointer hover:text-[#cb4d03] transition-all duration-300 hover:scale-110"
                    onClick={() => viewPostulation(pst)}
                  >
                    <RiEdit2Fill size={20} />
                  </button>

                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-white text-sm ${
                      pst.status === "Pendiente"
                        ? "bg-yellow-500"
                        : pst.status === "Aceptada"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {pst.status}
                  </span>

                  <div className="w-[100px] h-[100px] rounded-full bg-white border border-gray-200 overflow-hidden">
                    <img
                      src={pst.User.profilePicture || "/user.png"}
                      alt="Foto de perfil"
                      className="w-[100px] h-[100px] rounded-full"
                    />
                  </div>

                  <h2 className="text-lg font-bold">{pst.User.fullName}</h2>

                  <div className="flex flex-row items-center gap-1 w-full">
                    {pst.User.Resume && (
                      <NavLink
                        to={pst.User.Resume.url}
                        target="_blank"
                        className="flex-1 bg-[#fd6c01] text-white px-3 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 text-center"
                      >
                        Ver CV
                      </NavLink>
                    )}
                    <NavLink
                      to={`/perfil/${pst.User.id}`}
                      target="_blank"
                      className="flex-1 bg-[#fd6c01] text-white px-3 py-2 rounded-lg hover:bg-[#cb4d03] transition-all duration-300 text-center"
                    >
                      Ver perfil
                    </NavLink>
                  </div>

                  <button
                    className="flex flex-row items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-black/80 transition-all duration-300 cursor-pointer w-full text-center justify-center"
                    onClick={() => viewJobOffer(pst.JobOfferId)}
                  >
                    <span>Ver oferta</span>
                    <RiEyeFill />
                  </button>
                </article>
              ))}
            </div>
            {message && (
              <div className="px-10">
                <div className="h-fit bg-black  rounded-xl border border-gray-200 flex justify-center items-center px-5 py-12 relative">
                  <button className="absolute top-3 right-3 cursor-pointer hover:scale-110 transition-all duration-300">
                    <RiCloseFill
                      size={30}
                      color="red"
                      onClick={() => setMessage("")}
                    />
                  </button>
                  <h2 className="text-lg font-mono text-white text-center">
                    {message}
                  </h2>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="mt-10 w-full h-fit py-10 flex flex-col justify-center items-center px-5 ">
              <img
                src="/no-data.png"
                alt="Imagen de vacío"
                className="w-[100px]"
              />
              <h2 className="text-2xl mt-2 font-bold">
                Esta oferta no tiene postulaciones
              </h2>
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
        ))}

      <OfferModal
        showModal={showModal}
        toggleModal={toggleModal}
        jobOffer={dataJobOffer}
      />

      {showPostulationModal && (
        <PostulationModal
          currentPostulation={currentPostulation}
          togglePostulation={togglePostulationModal}
        />
      )}
    </main>
  );
};

export default Postulations;
