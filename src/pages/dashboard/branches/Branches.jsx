import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { RiCloseLine } from 'react-icons/ri'
import BranchModal from '../../../components/modal/BranchModal'
import { useState } from 'react'
import { useEffect } from 'react'
import { storageUtil } from '../../../utils/index.utils'
import { branchApi } from '../../../api/index.api'
import Swal from 'sweetalert2'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'

const Branches = () => {
  const [showModal, setShowModal] = useState(false)
  const [branchId, setBranchId] = useState(null)
  const [branches, setBranches] = useState([])
  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const deleteBranch = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        const { token } = storageUtil.getData('session')

        branchApi
          .delete(token, id)
          .then((res) => {
            const { message } = res.data
            toast.success(message)
            setBranches((prev) => prev.filter((branch) => branch.id !== id))
          })
          .catch((err) => {
            if (err instanceof AxiosError) {
              toast.error(err.response.data.message)
            } else {
              toast.error('Error desconocido. Intente más tarde.')
            }
          })
      }
    })
  }

  const editBranch = (id) => {
    setBranchId(id)
    toggleModal()
  }

  useEffect(() => {
    const session = storageUtil.getData('session')
    const { token } = session

    branchApi.getAll(token).then((res) => {
      const { branches } = res.data
      setBranches(branches)
    })
  }, [])
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
      {branches && branches.length > 0 ? (
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
                  Principal
                </th>
                <th scope="col" className="px-6 py-5">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {branch.name}
                  </th>
                  <td className="px-6 py-4">{branch.phone}</td>
                  <td className="px-6 py-4">{branch.email}</td>
                  <td className="px-6 py-4">{`${branch.province}, ${branch.city}`}</td>
                  <td className="px-6 py-4">{branch.isMain ? 'Si' : 'No'}</td>
                  <td className="px-6 py-4 text-right flex flex-row gap-5 items-center">
                    <button
                      className="cursor-pointer hover:text-white transition-all duration-300"
                      onClick={() => editBranch(branch.id)}
                    >
                      <FaEdit size={25} />
                    </button>
                    <button
                      className="cursor-pointer hover:text-red-500 transition-all duration-300"
                      onClick={() => deleteBranch(branch.id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="m-10 text-center">
          <h2 className="text-xl text-gray-500 font-semibold">
            Aún no hay sucursales registradaa
          </h2>
        </div>
      )}
      {/* Modal */}
      <Toaster richColors position="bottom-right" />
      <BranchModal
        showModal={showModal}
        toggleModal={toggleModal}
        branchId={branchId}
      />
    </main>
  )
}

export default Branches
