import { useState } from "react";
import { useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";
import { RiCloseFill, RiEye2Fill, RiEyeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { postulationApi } from "../../api/index.api";
import { storageUtil } from "../../utils/index.utils";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";

const PostulationModal = ({ currentPostulation, togglePostulation }) => {
  const { info } = useSelector((state) => state.user);
  const [status, setStatus] = useState(currentPostulation.status);
  const [observations, setObservations] = useState("");

  const handleStatus = (e) => {
    const { value } = e.target;
    setStatus(value);
  };

  const handleObservations = (e) => {
    const { value } = e.target;
    setObservations(value);
  };

  const handleUpdatePostulation = () => {
    const { token } = storageUtil.getData("session");
    if (!observations) {
      return toast.info("Ingrese una observación");
    }

    const postulation = {
      status,
      observations,
      EmployerId: info.id,
      JobOfferId: currentPostulation.JobOfferId,
      UserId: currentPostulation.UserId,
    };

    postulationApi
      .updatePostulation(token, postulation, currentPostulation.id)
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
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
    console.log(currentPostulation.observations);
    setObservations(currentPostulation.observations);
  }, []);
  return (
    <div className="absolute w-full h-screen bg-black/50 top-0 left-0 z-50 flex justify-center items-center">
      <div className="lg:w-[900px] h-[800px] bg-white rounded-lg  relative overflow-hidden flex flex-col">
        <header className="flex flex-row items-center justify-between h-[60px] bg-[#fd6c01] px-5">
          <h2 className="font-bold text-lg text-white">
            Postulación de {currentPostulation.User.fullName}
          </h2>
          <button
            className=" cursor-pointer text-gray-100 hover:text-gray-200 transition-all duration-300 hover:scale-110"
            onClick={togglePostulation}
          >
            <RiCloseFill size={25} />
          </button>
        </header>

        {/* Body */}
        <main className="px-5 py-5 overflow-y-auto">
          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-lg font-semibold">Carta de presentación</h3>
            <div className="w-full h-[200px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2 overflow-y-auto">
              <span className="font-bold text-sm text-gray-400">
                {currentPostulation.coverLetter}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-lg font-semibold">Currículum</h3>
            {currentPostulation.User.Resume ? (
              <NavLink
                to={currentPostulation.User.Resume.url}
                target="_blank"
                className="w-full h-[45px] bg-[#fd6c01] border border-gray-200 flex px-2 flex-row items-center rounded-lg justify-center gap-2 cursor-pointer hover:bg-[#fd6c01]/80 transition-all duration-300 text-white text-lg font-bold"
              >
                <RiEyeFill />
                <span>Ver</span>
              </NavLink>
            ) : (
              <div className="w-full h-fit py-10 bg-white border border-gray-200 flex px-2 flex-col items-center rounded-lg justify-center gap-2">
                <FaFilePdf size={30} />
                <span className="font-semibold text-lg text-gray-500">
                  No hay curriculum adjuntado
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2 mb-5">
            <label htmlFor="status" className="text-lg font-semibold">
              Estado
            </label>
            <select
              name="status"
              className="w-full h-[50px] bg-gray-200 border border-gray-200 rounded-lg outline-none px-2"
              onChange={handleStatus}
            >
              <option selected disabled>
                Seleccione un estado
              </option>
              <option
                value="Pendiente"
                selected={currentPostulation.status === "Pendiente"}
              >
                Pendiente
              </option>
              <option
                value="Aceptada"
                selected={currentPostulation.status === "Aceptada"}
              >
                Aceptada
              </option>
              <option
                value="Rechazada"
                selected={currentPostulation.status === "Rechazada"}
              >
                Rechazada
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-lg font-semibold">Observación</h3>
            <textarea
              name="observation"
              id="observation"
              value={observations}
              onChange={handleObservations}
              className="w-full h-[200px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2 resize-none"
            />
          </div>

          <button
            className="w-full h-[50px] text-xl font-bold text-white bg-[#fd6c01] hover:bg-[#fd6c01]/80 transition-all duration-300 rounded-lg cursor-pointer"
            onClick={handleUpdatePostulation}
            type="button"
          >
            Actualizar postulacion
          </button>
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default PostulationModal;
