import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { RiCloseLine } from 'react-icons/ri'
import BranchModal from '../../../components/modal/BranchModal'
import { useState } from 'react'

const Branches = () => {
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }
  return (
    <main className="w-full h-full flex lg:px-10 lg:py-10 py-20 md:px-5 px-2 flex-col">
      <h2 className="text-3xl font-bold">Sucursales</h2>
      {/* Seccion busqueda y agregar */}
      <section className="w-full flex flex-row items-center justify-between mt-5">
        {/* Busqueda */}
        <div className="bg-white h-[50px] w-[400px] border border-gray-200 rounded-lg flex flex-row">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar sucursal"
            className="flex-1 h-full outline-none px-5 text-gray-400"
          />
          <div className="w-[70px] h-full flex justify-center items-center">
            <IoSearch size={25} color="#d1d5dc" />
          </div>
        </div>

        <button
          className="bg-[#fd6c01] text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-[#cb4d03] transition-all duration-300"
          type="button"
          onClick={toggleModal}
        >
          Nueva
        </button>
      </section>
      {/* Tabla de sucursales */}
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-5">
                Sucursal
              </th>
              <th scope="col" className="px-6 py-5">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-5">
                Email
              </th>
              <th scope="col" className="px-6 py-5">
                Ubicación
              </th>
              <th scope="col" className="px-6 py-5">
                Gerente
              </th>
              <th scope="col" className="px-6 py-5">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Sucursal Manabí
              </th>
              <td className="px-6 py-4">0982932441</td>
              <td className="px-6 py-4">sucursalmanabi@.com</td>
              <td className="px-6 py-4">Rocafuerte, Manabí</td>
              <td className="px-6 py-4">Cristhian Rodríguez</td>
              <td className="px-6 py-4 text-right flex flex-row gap-5 items-center">
                <button className="cursor-pointer hover:text-white transition-all duration-300">
                  <FaEdit size={25} />
                </button>
                <button className="cursor-pointer hover:text-red-500 transition-all duration-300">
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* Modal */}
      <BranchModal showModal={showModal} toggleModal={toggleModal} />
    </main>
  )
}

export default Branches
