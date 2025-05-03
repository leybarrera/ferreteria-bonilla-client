import { useEffect } from 'react'
import { FaEdit, FaTrash, FaUserEdit } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { RiCloseLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { storageUtil } from '../../../utils/index.utils'
import { employeeApi } from '../../../api/index.api'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'
import { EmployeeModal } from '../../../components/index.components'

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [employee, setEmployee] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const updateRole = (employee) => {
    setEmployee(employee)
    toggleModal()
  }
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

        employeeApi
          .delete(token, id)
          .then((res) => {
            const { message } = res.data
            toast.success(message)
            setEmployees((prev) => prev.filter((emp) => emp.id !== id))
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

  useEffect(() => {
    const { token } = storageUtil.getData('session')
    employeeApi.getAll(token).then((res) => {
      setEmployees(res.data.employees)
    })
  }, [])
  return (
    <main className="w-full h-full flex lg:px-10 lg:py-10 py-20 md:px-5 px-2 flex-col">
      <h2 className="text-3xl font-bold">Empleados</h2>
      {/* Seccion busqueda y agregar */}
      <section className="w-full flex flex-row items-center justify-between mt-5">
        {/* Busqueda */}
        <div className="bg-white h-[50px] w-[400px] border border-gray-200 rounded-lg flex flex-row">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar empleado"
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
          Nuevo
        </button>
      </section>

      {employees && employees.length > 0 ? (
        <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Sucursal
                </th>
                <th scope="col" className="px-6 py-5">
                  Nombres
                </th>
                <th scope="col" className="px-6 py-5">
                  Cargo
                </th>
                <th scope="col" className="px-6 py-5">
                  Contratación
                </th>
                <th scope="col" className="px-6 py-5">
                  Despido
                </th>
                <th scope="col" className="px-6 py-5">
                  Estado
                </th>
                <th scope="col" className="px-6 py-5">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={emp.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {emp.Branch.name}
                  </th>
                  <td className="px-6 py-4">{emp.User.fullName}</td>
                  <td className="px-6 py-4 flex flex-row gap-3 items-center">
                    <span>{emp.User.role}</span>
                    <button
                      className="hover:text-gray-200 transition-all duration-300 cursor-pointer"
                      onClick={() => updateRole(emp)}
                    >
                      <FaUserEdit size={18} />
                    </button>
                  </td>
                  <td className="px-6 py-4">{emp.hireDate.split('T')[0]}</td>
                  <td className="px-6 py-4">
                    {emp.endDate ? emp.endDate.split('T')[0] : 'En empleo'}
                  </td>
                  <td className="px-6 py-4">
                    {emp.isActive ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="px-6 py-4 text-right flex flex-row gap-5 items-center">
                    <button
                      className="cursor-pointer hover:text-red-500 transition-all duration-300"
                      type="button"
                      onClick={() => deleteUser(emp.id)}
                      title="Eliminar"
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
        <div className="mt-5 flex flex-col justify-center items-center gap-2">
          <img src="/no-data.png" alt="No Data" className="w-[100px] mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-500">
            No hay empleados registrados
          </h2>
        </div>
      )}
      {/* Tabla de sucursales */}

      {/* Modal */}
      <Toaster richColors position="bottom-right" />
      <EmployeeModal
        showModal={showModal}
        toggleModal={toggleModal}
        currentEmployee={employee}
        setCurrentEmployee={setEmployee}
      />
    </main>
  )
}

export default Employees
