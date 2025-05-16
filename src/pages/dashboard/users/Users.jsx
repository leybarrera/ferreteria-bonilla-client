import { useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { RiCloseLine, RiMessage2Fill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { storageUtil } from '../../../utils/index.utils'
import { userApi } from '../../../api/index.api'
import { useState } from 'react'
import { frontendUrl } from '../../../config/index.config'
import { useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'
import { ConversationModal } from '../../../components/index.components'

const Users = () => {
  const { info } = useSelector((state) => state.user)
  const [showConversation, setShowConversation] = useState(false)
  const [receiverId, setReceiverId] = useState(null)
  const handleConversation = (receiverId) => {
    setReceiverId(receiverId)
    toggleConversation()
  }
  const toggleConversation = () => setShowConversation(!showConversation)
  const [users, setUsers] = useState([])
  const deleteUser = (id) => {
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

        userApi
          .deleteUser(token, id)
          .then((res) => {
            const { message } = res.data
            toast.success(message)
            setUsers((prev) => prev.filter((user) => user.id !== id))
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

  const validateUser = (id, e) => {
    const { token } = storageUtil.getData('session')
    const { checked } = e.target

    userApi.validateAccount(token, id, checked, info.id).then((res) => {
      const { message } = res.data
      toast.success(message)
    })

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isDataValidated: checked } : user
      )
    )
  }

  useEffect(() => {
    const session = storageUtil.getData('session')
    const { token } = session

    userApi.getAllUsers(token).then((res) => {
      const { users } = res.data

      setUsers(users)
    })
  }, [])
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
      {users && users.length > 0 ? (
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
                {info.role === 'Administrador' && (
                  <th scope="col" className="px-6 py-5">
                    Validado
                  </th>
                )}
                <th scope="col" className="px-6 py-5">
                  Mensajes
                </th>
                <th scope="col" className="px-6 py-5">
                  <span className="sr-only">Perfil</span>
                </th>
                {info.role === 'Administrador' && (
                  <th scope="col" className="px-6 py-5">
                    <span className="sr-only">Delete</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={user.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.fullName}
                  </th>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.isVerified ? 'Si' : 'No'}</td>
                  {info.role === 'Administrador' && (
                    <td className="px-6 py-4">
                      <label class="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value={user.isDataValidated}
                          class="sr-only peer"
                          checked={user.isDataValidated}
                          onChange={(e) => validateUser(user.id, e)}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                  )}
                  <td className="px-6 py-4 text-right flex flex-row gap-5 items-center ">
                    <button
                      className="hover:text-gray-300 transition-all duration-300 cursor-pointer"
                      onClick={() => handleConversation(user.id)}
                    >
                      <RiMessage2Fill size={20} />
                    </button>
                  </td>

                  {user.role === 'Candidato' ? (
                    <td className="px-6 py-4">
                      <NavLink
                        to={`${frontendUrl}/perfil/${user.id}`}
                        className="underline"
                        target="_blank"
                      >
                        Ver perfil
                      </NavLink>
                    </td>
                  ) : (
                    <td className="px-6 py-4"></td>
                  )}

                  {info.role === 'Administrador' && (
                    <td className="px-6 py-4 text-right flex flex-row gap-5 items-center">
                      <button
                        className="cursor-pointer hover:text-red-500 transition-all duration-300"
                        type="button"
                        onClick={() => deleteUser(user.id)}
                        title="Eliminar"
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="mt-5 flex flex-col justify-center items-center gap-2">
          <img src="/no-data.png" alt="No Data" className="w-[100px] mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-500">
            No hay usuarios registrados
          </h2>
        </div>
      )}

      <Toaster richColors position="bottom-right" />

      <ConversationModal
        showConversation={showConversation}
        toggleConversation={toggleConversation}
        ReceiverId={receiverId}
      />
    </main>
  )
}

export default Users
