import React from 'react'
import { IoSearch } from 'react-icons/io5'

const Applications = () => {
  return (
    <main className="lg:w-[1400px] mx-auto h-full w-full lg:px-0 px-5 py-10">
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
        <article className="lg:w-[350px] lg:h-[250px] w-full h-[250px] rounded-lg bg-white border border-gray-200 cursor-pointer hover:scale-110 transition-all duration-500 flex flex-col justify-center items-center px-5 relative">
          {/* <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-[#fd6c01] text-white">
            Pendiente
          </span> */}
          {/* <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-green-600 text-white">
            Aceptada
          </span> */}
          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-600 text-white">
            Rechazada
          </span>
          <h2 className="font-bold text-2xl text-wrap text-center">
            Desarrollador Frontend
          </h2>
          <h4 className="text-gray-600 text-lg font-bold">
            Empresa 1 - Presencial
          </h4>
          <h3 className="text-gray-400 text-[15px]">Aplicado el 01/01/2023</h3>
          <button className="mt-3 px-5 py-2 rounded-lg bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all duration-300 font-bold">
            Eliminar
          </button>
        </article>

        <article className="lg:w-[350px] lg:h-[250px] w-full h-[250px] rounded-lg bg-white border border-gray-200 cursor-pointer hover:scale-110 transition-all duration-500 flex flex-col justify-center items-center px-5 relative">
          {/* <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-[#fd6c01] text-white">
            Pendiente
          </span> */}
          {/* <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-green-600 text-white">
            Aceptada
          </span> */}
          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-600 text-white">
            Rechazada
          </span>
          <h2 className="font-bold text-2xl text-wrap text-center">
            Desarrollador Frontend
          </h2>
          <h4 className="text-gray-600 text-lg font-bold">
            Empresa 1 - Presencial
          </h4>
          <h3 className="text-gray-400 text-[15px]">Aplicado el 01/01/2023</h3>
          <button className="mt-3 px-5 py-2 rounded-lg bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all duration-300 font-bold">
            Eliminar
          </button>
        </article>

        <article className="lg:w-[350px] lg:h-[250px] w-full h-[250px] rounded-lg bg-white border border-gray-200 cursor-pointer hover:scale-110 transition-all duration-500 flex flex-col justify-center items-center px-5 relative">
          {/* <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-[#fd6c01] text-white">
            Pendiente
          </span> */}
          {/* <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-green-600 text-white">
            Aceptada
          </span> */}
          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-600 text-white">
            Rechazada
          </span>
          <h2 className="font-bold text-2xl text-wrap text-center">
            Desarrollador Frontend
          </h2>
          <h4 className="text-gray-600 text-lg font-bold">
            Empresa 1 - Presencial
          </h4>
          <h3 className="text-gray-400 text-[15px]">Aplicado el 01/01/2023</h3>
          <button className="mt-3 px-5 py-2 rounded-lg bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all duration-300 font-bold">
            Eliminar
          </button>
        </article>
      </section>
    </main>
  )
}

export default Applications
