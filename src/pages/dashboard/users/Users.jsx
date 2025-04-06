import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { RiCloseLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

const Users = () => {
  const deleteUser = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    })
  }
  return (
    <main className="w-full h-full flex lg:px-10 lg:py-10 py-20 md:px-5 px-2 flex-col">
      <h2 className="text-3xl font-bold">Usuarios</h2>
      {/* Seccion busqueda y agregar */}
      <section className="w-full flex flex-row items-center justify-between mt-5">
        {/* Busqueda */}
        <div className="bg-white h-[50px] w-[400px] border border-gray-200 rounded-lg flex flex-row">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar usuario"
            className="flex-1 h-full outline-none px-5 text-gray-400"
          />
          <div className="w-[70px] h-full flex justify-center items-center">
            <IoSearch size={25} color="#d1d5dc" />
          </div>
        </div>
      </section>
      {/* Tabla de sucursales */}
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-5">
                Nombre
              </th>

              <th scope="col" className="px-6 py-5">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-5">
                Email
              </th>

              <th scope="col" className="px-6 py-5">
                Rol
              </th>
              <th scope="col" className="px-6 py-5">
                Verificado
              </th>
              <th scope="col" className="px-6 py-5">
                Validado
              </th>
              <th scope="col" className="px-6 py-5">
                QR
              </th>
              <th scope="col" className="px-6 py-5">
                <span className="sr-only">Delete</span>
              </th>
              <th scope="col" className="px-6 py-5">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Cristhian Rodriguez
              </th>
              <td className="px-6 py-4">0982932441</td>
              <td className="px-6 py-4">pH7aW@example.com</td>
              <td className="px-6 py-4">Candidato</td>
              <td className="px-6 py-4">Si</td>
              <td className="px-6 py-4">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    checked={false}
                  />
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
              </td>
              <td className="px-6 py-4">N/A</td>

              <td className="px-6 py-4">
                <NavLink to={'/perfil/1'} className="underline" target="_blank">
                  Ver perfil
                </NavLink>
              </td>

              <td className="px-6 py-4 text-right flex flex-row gap-5 items-center">
                <button
                  className="cursor-pointer hover:text-red-500 transition-all duration-300"
                  type="button"
                  onClick={deleteUser}
                  title="Eliminar"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* Modal */}
    </main>
  )
}

export default Users
