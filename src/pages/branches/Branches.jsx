import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storageUtil } from "../../utils/index.utils";
import { branchApi, interestApi, jobOffersApi } from "../../api/index.api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";

const Branches = () => {
  const { info } = useSelector((state) => state.user);
  const { id } = useParams();
  const [isFollowBranch, setIsFollowBranch] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [jobOffers, setJobOffers] = useState([]);
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const viewBranch = (id) => {
    navigate(`/branches/${id}`);
  };

  const getAllBranches = async () => {
    branchApi.getAll().then((res) => {
      const { branches } = res.data;
      setBranches(branches);
    });
  };

  const getBranchById = async () => {
    const { token } = storageUtil.getData("session");

    branchApi.getById(token, id).then((res) => {
      const { branch } = res.data;
      setBranch(branch);
    });

    jobOffersApi.geByBranchId(token, id).then((res) => {
      const { jobOffers } = res.data;
      setJobOffers(jobOffers);
    });

    const isFollowing = interests.some((interest) => interest.BranchId === id);
    setIsFollowBranch(isFollowing);
  };

  useEffect(() => {
    const { token } = storageUtil.getData("session");

    if (id) {
      getBranchById();
    } else {
      getAllBranches();
    }

    interestApi.getByUserId(token, info.id).then((res) => {
      const { interests } = res.data;
      setInterests(interests);
    });
  }, [id]);
  return branch ? (
    <div className="lg:w-[1400px] mx-auto w-full flex flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      <header className="w-full  flex flex-col border-b border-gray-300 pb-5">
        {/* Portada */}
        <div className="w-full lg:h-[450px] h-[250px] lg:rounded-bl-xl lg:rounded-br-xl relative">
          <img
            src="/portada.jpg"
            alt="Portada"
            className="absolute w-full h-full object-cover lg:rounded-bl-xl lg:rounded-br-xl"
          />
        </div>

        {/* Informacion */}
        <div className="flex flex-col lg:flex-row items-center justify-between not-lg:mt-10 pr-10 not-lg:pr-0">
          <div className="py-5 flex flex-col not-lg:justify-center not-lg:items-center w-full pl-7 not-lg:pl-0">
            <h2 className="text-3xl font-bold">{branch.name}</h2>
            <h3 className="text-lg font-medium text-gray-400">
              {branch.email}
            </h3>
          </div>

          {isFollowBranch ? (
            <button
              className="lg:w-[200px] w-full flex flex-row gap-1 items-center justify-center py-2 border border-red-500 rounded-full mt-5 cursor-pointer hover:bg-red-500/10 px-5 bg-red-500/20 "
              // onClick={() => unFollowBranch(branch.id)}
            >
              <FaMinus size={14} color="red" />
              <span className="font-bold text-red-600 text-[16px]">
                Dejar de seguir
              </span>
            </button>
          ) : (
            <button
              className="lg:w-[200px] w-full flex flex-row gap-1 items-center justify-center lg:py-2 py-1 border border-black rounded-full mt-5 cursor-pointer hover:bg-black/20 px-5 bg-black/10 "
              // onClick={() => followBranch(branch.id)}
            >
              <FaPlus size={14} />
              <span className="font-bold text-[#000000BF] text-[16px]">
                Seguir
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <section className="felx flex-col gap-2 mt-2 lg:px-0 px-2">
        {/* Informacion general */}
        <div className="flex flex-col p-5  border-gray-200 bg-white rounded-lg border ">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-bold">Informacion de la sucursal</h2>
            {/* {isOwner && (
                  <button
                    className="flex flex-row items-center gap-2 text-sm font-semibold cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
                    onClick={goToSettings}
                  >
                    <AiFillEdit size={20} />
                  </button>
                )} */}
          </div>

          <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Nombre</h3>
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
                value={branch?.name}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Correo electrónico</h3>
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
                value={branch?.email}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Teléfono</h3>
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
                value={branch?.phone}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Provincia</h3>
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
                value={branch?.province}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Ciudad</h3>
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
                value={branch?.city}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Dirección</h3>
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
                value={branch?.address}
              />
            </div>
          </div>
        </div>

        {/* Ofertas */}
        <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg mt-4">
          <div className="flex flex-col ">
            <h2 className="text-2xl font-bold">Ofertas publicadas</h2>
            <div className="mt-2 flex flex-row gap-3 flex-wrap">
              {jobOffers.length > 0 ? (
                jobOffers.map((jobOffer) => (
                  <div className="lg:w-[300px] h-fit px-5 py-10 bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center relative hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span
                      className={`absolute top-2 right-3 rounded-full px-3 py-1 text-xs ${
                        jobOffer.isActive
                          ? "bg-green-400 text-white"
                          : "bg-red-700 text-white"
                      }`}
                    >
                      {jobOffer.isActive ? "Activa" : "Inactiva"}
                    </span>
                    <h2 className="text-sm font-semibold text-wrap text-center ">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Blanditiis, magni?
                    </h2>

                    <h3 className="mt-2 text-sm font-semibold text-gray-500">
                      {jobOffer.type} - {jobOffer.contractType}
                    </h3>
                    <h5 className="mt-2 text-sm font-semibold">
                      $ {jobOffer.salary}
                    </h5>
                  </div>
                ))
              ) : (
                <div className="mt-5 flex flex-col justify-center items-center gap-2 w-full">
                  <img
                    src="/no-data.png"
                    alt="No Data"
                    className="w-[100px] mx-auto"
                  />
                  <h2 className="text-2xl font-semibold text-gray-500">
                    No hay ofertas publicadas
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div className="lg:w-[1400px] mx-auto w-full flex lg:flex-row flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      <div className="flex flex-row items-center justify-between gap-5">
        {/* Branches */}
        {branches.length > 0 ? (
          branches.map((br) => {
            const isFollowing = interests.find(
              (i) => i.BranchId === br.id && i.UserId === info.id
            );
            return (
              <button
                className="lg:w-[400px] h-fit w-full border border-gray-200 rounded-lg bg-white flex flex-col justify-center items-center py-10 px-5 hover:scale-110 transition-all duration-300 cursor-pointer"
                onClick={() => viewBranch(br.id)}
                key={br.id}
              >
                <img src="/mascota-clean.png" alt="" className="w-[100px]" />
                <h2 className="font-bold text-lg">{br.name}</h2>
                <h3 className="text-sm text-gray-500">
                  {br.province}, {br.city}
                </h3>
                <h4 className="text-sm text-gray-400">{br.address}</h4>

                {isFollowing ? (
                  <button
                    className="lg:w-[200px] w-full flex flex-row gap-1 items-center justify-center py-2 border border-red-500 rounded-full mt-5 cursor-pointer hover:bg-red-500/10 px-5 bg-red-500/20 "
                    // onClick={() => unFollowBranch(branch.id)}
                  >
                    <FaMinus size={14} color="red" />
                    <span className="font-bold text-red-600 text-[16px]">
                      Dejar de seguir
                    </span>
                  </button>
                ) : (
                  <button
                    className="lg:w-[200px] w-full flex flex-row gap-1 items-center justify-center lg:py-2 py-1 border border-black rounded-full mt-5 cursor-pointer hover:bg-black/20 px-5 bg-black/10 "
                    // onClick={() => followBranch(branch.id)}
                  >
                    <FaPlus size={14} />
                    <span className="font-bold text-[#000000BF] text-[16px]">
                      Seguir
                    </span>
                  </button>
                )}
              </button>
            );
          })
        ) : (
          <div>
            <h2>No hay sucursales registradas</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Branches;
