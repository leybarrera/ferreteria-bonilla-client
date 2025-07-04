import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { experienceApi } from "../../api/index.api";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { RiEyeFill } from "react-icons/ri";
import { AxiosError } from "axios";
import { Responsibilities } from "../index.components";

const WorkExperienceTab = () => {
  const { info } = useSelector((state) => state.user);
  const [isCurrentWork, setIsCurrentWork] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const viewResponsibilities = (responsabilities) => {
    setText(responsabilities);
    toggleModal();
  };
  const toggleCurrentWork = () => {
    setIsCurrentWork((prev) => !prev);
    setExperience((prev) => ({
      ...prev,
      isCurrentJob: !prev.isCurrentJob,
    }));
  };
  const initialData = {
    companyName: "",
    jobTitle: "",
    startDate: "",
    isCurrentJob: false,
    responsibilities: "",
  };

  const [experience, setExperience] = useState(initialData);

  const [workExperiences, setWorkExperiences] = useState([]);

  const deleteWorkExperience = (id) => {
    experienceApi
      .delete(id)
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
        getAllData();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  const handleDate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const selectedDate = new Date(value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      toast.error("La fecha no puede ser posterior a la actual");
      e.target.value = "";
      return;
    }

    const year = value.split("-")[0];
    setExperience((prev) => ({
      ...prev,
      [name]: year,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllData = () => {
    experienceApi.getByUserId(info.id).then((res) => {
      const { userExperiences } = res.data;
      setWorkExperiences(userExperiences);
    });
  };

  const handleSave = () => {
    console.log(experience);
    if (Object.values(experience).some((educ) => educ === "")) {
      toast.error("Todos los datos son obligatorios");
      return;
    }

    experienceApi
      .save({
        ...experience,
        UserId: info.id,
      })
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
        getAllData();
        setExperience(initialData);
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
    getAllData();
  }, [info]);

  return !showModal ? (
    <main className={`flex flex-col ${showModal && "overflow-x-scroll"}`}>
      <div className="w-full max-w-[1000px] flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="" className="text-lg font-semibold">
              Empresa
            </label>
            <input
              type="text"
              name="companyName"
              minLength={5}
              maxLength={30}
              onChange={handleChange}
              onBlur={(e) => {
                const textoLimpio = e.target.value.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  ""
                );
                handleChange({
                  target: {
                    name: e.target.name,
                    value: textoLimpio,
                  },
                });
              }}
              value={experience.companyName}
              className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="" className="text-lg font-semibold">
              Puesto
            </label>
            <input
              type="text"
              name="jobTitle"
              minLength={5}
              maxLength={30}
              onChange={handleChange}
              onBlur={(e) => {
                const textoLimpio = e.target.value.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  ""
                );
                handleChange({
                  target: {
                    name: e.target.name,
                    value: textoLimpio,
                  },
                });
              }}
              value={experience.jobTitle}
              className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
            />
          </div>

          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={experience.isCurrentJob}
              name="isCurrentJob"
              class="sr-only peer"
              checked={isCurrentWork}
              onChange={toggleCurrentWork}
            />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 ">
              Trabajo actual
            </span>
          </label>

          <div className="flex flex-row flex-1 gap-2">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Fecha de Inicio
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleDate}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Fecha de Fin
              </label>
              <input
                type="date"
                name="endDate"
                disabled={isCurrentWork}
                onChange={handleDate}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="" className="text-lg font-semibold">
              Responsabilidades
            </label>
            <textarea
              type="text"
              name="responsibilities"
              onChange={handleChange}
              value={experience.responsibilities}
              className="h-[300px] p-5 bg-gray-200 border border-gray-200 rounded-lg outline-none resize-none"
            />
          </div>

          <button
            className="mt-3 py-3 bg-[#fd6c01] text-lg text-white font-bold rounded-lg hover:bg-[#cb4d03] transition-colors cursor-pointer"
            onClick={handleSave}
          >
            Agregar
          </button>
        </div>
        {workExperiences.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#fd6c01]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Puesto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Empresa
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Inicio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trabajo actual
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Responsabilidades
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {workExperiences.map((wok) => (
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-all duration-300">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-gray-500"
                    >
                      {wok.jobTitle}
                    </th>
                    <td className="px-6 py-4">{wok.companyName}</td>
                    <td className="px-6 py-4">{wok.startDate}</td>
                    <td className="px-6 py-4">{wok.endDate || "-"}</td>
                    <td className="px-6 py-4">
                      {wok.isCurrentJob ? "Si" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="cursor-pointer text-[#fd6c01] hover:text-[#cb4d03] transition-all duration-300"
                        onClick={() =>
                          viewResponsibilities(wok.responsibilities)
                        }
                      >
                        <RiEyeFill size={20} />
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        className="cursor-pointer text-red-800 hover:text-red-700 transition-all duration-300"
                        onClick={() => deleteWorkExperience(wok.id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Toaster richColors />
    </main>
  ) : (
    <Responsibilities text={text} toggleModal={toggleModal} />
  );
};

export default WorkExperienceTab;
