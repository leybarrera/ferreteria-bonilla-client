import { useEffect } from "react";
import { storageUtil } from "../../utils/index.utils";
import { branchApi, jobOffersApi } from "../../api/index.api";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { positions } from "../../data/data";
import { toast, Toaster } from "sonner";

const NewOfferModal = ({ showModal, toggleModal, setSuccess }) => {
  const initialState = {
    BranchId: "",
    charge: "",
    description: "",
    title: "",
    salary: "",
    requirements: "",
    type: "",
    contractType: "",
    isActive: "",
    expirationDate: "",
  };

  const [offer, setOffer] = useState(initialState);
  const [branches, setBranches] = useState([]);

  const handleClose = () => {
    toggleModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const { token } = storageUtil.getData("session");

    e.preventDefault();
    const { isActive, expirationDate, ...newOffer } = offer;
    const offerInfoCompleted = Object.values(newOffer).every(
      (data) => data !== ""
    );

    if (offerInfoCompleted) {
      const offer = {
        ...newOffer,
        isActive: isActive === "Activa" ? true : false,
        expirationDate: new Date(expirationDate),
      };

      jobOffersApi
        .create(token, offer)
        .then((res) => {
          const { message } = res.data;
          toast.success(message);

          setOffer(initialState);
          setSuccess(true);
          setTimeout(() => {
            toggleModal();
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const { token } = storageUtil.getData("session");

    // Obtener topdas las sucursales
    branchApi.getAll().then((res) => {
      const { branches } = res.data;
      console.log(branches);
      setBranches(branches);
    });
  }, []);
  return (
    <div
      className={`${
        showModal ? "block" : "hidden"
      } absolute w-full h-full bg-black/50 top-0 left-0 z-50  flex justify-center items-center
`}
    >
      {/* Box */}
      <div className="lg:w-[1000px] lg:h-[800px] w-full h-full overflow-y-auto bg-white border border-gray-200 rounded-lg flex flex-col">
        {/* Header */}
        <header className="h-[80px] flex flex-row items-center justify-between border-b-gray-200 px-5 bg-gray-200">
          <h2 className="text-xl font-bold">Nueva Oferta de Empleo</h2>
          <button
            className="w-[30px] h-[30px] rounded-full bg-red-600 flex justify-center items-center cursor-pointer"
            onClick={handleClose}
          >
            <RiCloseLine color="white" />
          </button>
        </header>

        {/* Formulario */}
        <form
          action=""
          className="p-5 flex flex-col gap-2 overflow-y-scroll flex-1"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5 lg:gap-5">
            <div className="flex-1 flex flex-col gap-2 mb-5 lg:mb-0">
              <label htmlFor="" className="font-semibold">
                Sucursal
              </label>
              <select
                id="BranchId"
                name="BranchId"
                onChange={handleChange}
                className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
              >
                <option selected={offer.BranchId === ""}>
                  Elija la sucursal
                </option>
                {branches.map((branch) => (
                  <option
                    value={branch.id}
                    key={branch.id}
                    selected={offer.BranchId === branch.id}
                  >
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Cargo
              </label>
              <select
                id="charge"
                name="charge"
                onChange={handleChange}
                className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
              >
                <option selected={offer.charge === ""} disabled>
                  Elija el cargo
                </option>
                {positions.map((position) => (
                  <option
                    value={position}
                    key={position}
                    selected={offer.charge === position}
                  >
                    {position}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="" className="font-semibold">
              Título
            </label>

            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={offer.title}
              className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="" className="font-semibold">
              Descripción de la oferta
            </label>
            <textarea
              className="outline-none h-[150px] bg-gray-100 rounded-lg px-2 border border-gray-300 resize-none"
              name="description"
              id="description"
              onChange={handleChange}
              value={offer.description}
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="" className="font-semibold">
              Requisitos
            </label>
            <textarea
              className="outline-none h-[150px] bg-gray-100 rounded-lg px-2 border border-gray-300 resize-none py-3"
              placeholder="Requisito 1, Requisito 2, Requisito 3..."
              name="requirements"
              id="requirements"
              onChange={handleChange}
              value={offer.requirements}
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between  mb-5 lg:gap-5">
            <div className="flex-1 flex flex-col gap-2 mb-5 lg:mb-0">
              <label htmlFor="" className="font-semibold">
                Tipo de trabajo
              </label>
              <select
                id="type"
                name="type"
                onChange={handleChange}
                className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
              >
                <option selected={offer.type === ""} disabled>
                  Elija el tipo
                </option>
                <option value={"Remoto"} selected={offer.type === "Remoto"}>
                  Remoto
                </option>
                <option
                  value={"Presencial"}
                  selected={offer.type === "Presencial"}
                >
                  Presencial
                </option>
                <option value={"Híbrido"} selected={offer.type === "Híbrido"}>
                  Híbrido
                </option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-2 mb-5 lg:mb-0">
              <label htmlFor="" className="font-semibold">
                Tipo de contraro
              </label>
              <select
                id="contractType"
                name="contractType"
                onChange={handleChange}
                className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
              >
                <option selected={offer.contractType === ""} disabled>
                  Elija el contrato
                </option>
                <option
                  value={"Tiempo completo"}
                  selected={offer.contractType === "Tiempo completo"}
                >
                  Tiempo completo
                </option>
                <option
                  value={"Tiempo parcial"}
                  selected={offer.contractType === "Tiempo parcial"}
                >
                  Tiempo parcial
                </option>
                <option
                  value={"Contrato"}
                  selected={offer.contractType === "Contrato"}
                >
                  Contrato
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5 lg:gap-5">
            <div className="flex-1 flex flex-col gap-2 mb-5 lg:mb-0">
              <label htmlFor="" className="font-semibold">
                Salario
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                onChange={handleChange}
                value={offer.salary}
                className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2 mb-5 lg:mb-0">
              <label htmlFor="" className="font-semibold">
                Estado
              </label>
              <select
                id="isActive"
                name="isActive"
                onChange={handleChange}
                className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
              >
                <option selected={offer.isActive === ""} disabled>
                  Elija el estado de la oferta
                </option>
                <option value={"Activa"} selected={offer.isActive === "Activa"}>
                  Activa
                </option>
                <option
                  value={"Inactiva"}
                  selected={offer.isActive === "Inactiva"}
                >
                  Inactiva
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="" className="font-semibold">
              Expiración de la oferta
            </label>
            <input
              type="date"
              name="expirationDate"
              id="expirationDate"
              value={offer.expirationDate}
              onChange={handleChange}
              className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
            />
          </div>

          <button
            className="mb-5 w-full py-3 bg-[#fd6c01] text-white text-lg font-bold cursor-pointer hover:bg-[#cb4d03] transition-all duration-300 rounded-lg"
            type="submit"
          >
            Publicar
          </button>
        </form>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default NewOfferModal;
