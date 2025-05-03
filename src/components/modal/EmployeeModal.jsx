import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { positions } from '../../data/data'
import { useState } from 'react'
import { useEffect } from 'react'
import { storageUtil } from '../../utils/index.utils'
import { branchApi, employeeApi, userApi } from '../../api/index.api'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'

const EmployeeModal = ({
  showModal,
  toggleModal,
  currentEmployee,
  setCurrentEmployee,
}) => {
  const [branches, setBranches] = useState([])
  const [users, setUsers] = useState([])
  const handleClose = () => {
    setEmployee({
      UserId: '',
      BranchId: '',
      role: '',
    })
    setCurrentEmployee(null)
    toggleModal()
  }

  const [employee, setEmployee] = useState({
    UserId: '',
    BranchId: '',
    role: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }))

    console.log(employee)
  }

  const handleSubmit = (e) => {
    const { token } = storageUtil.getData('session')
    e.preventDefault()
    if (Object.values(employee).some((data) => data === '')) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    if (currentEmployee === null) {
      employeeApi
        .save(token, employee)
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          setTimeout(() => {
            toggleModal()
          }, 2500)
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response.data.message)
          } else {
            toast.error('Error desconocido. Intente más tarde.')
          }
        })
    } else {
      // Actualizar
    }
  }

  useEffect(() => {
    const { token } = storageUtil.getData('session')
    branchApi.getAll().then((res) => {
      const { branches } = res.data
      setBranches(branches)
    })

    userApi.getAllUsers(token).then((res) => {
      const { users } = res.data
      const filterUsers = users.filter((user) => user.role !== 'Administrador')
      setUsers(filterUsers)
    })

    if (currentEmployee !== null) {
      setEmployee({
        UserId: currentEmployee.UserId,
        BranchId: currentEmployee.BranchId,
        role: currentEmployee.User.role,
      })
    }
  }, [currentEmployee])
  return (
    <div
      className={`${
        showModal ? 'block' : 'hidden'
      } absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center lg:px-0 px-5`}
    >
      <div className="lg:w-[800px] w-full h-fit bg-white border border-gray-200 rounded-lg overflow-hidden z-50">
        <header className="flex flex-row items-center justify-between border-b border-gray-200 p-5 bg-gray-200">
          <h2 className="text-xl font-bold">
            {currentEmployee !== null
              ? 'Actualizar empleado'
              : 'Nuevo empleado'}
          </h2>
          <button
            className="w-[30px] h-[30px] rounded-full bg-red-600 flex justify-center items-center cursor-pointer"
            onClick={handleClose}
          >
            <RiCloseLine color="white" />
          </button>
        </header>

        <div className="flex">
          <div className="p-5 flex-1">
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Sucursal
                  </label>
                  <select
                    id="BranchId"
                    name="BranchId"
                    onChange={handleChange}
                    className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
                  >
                    <option disabled selected={currentEmployee === null}>
                      Elija la sucursal
                    </option>
                    {branches.map((branche) => (
                      <option
                        value={branche.id}
                        key={branche.id}
                        selected={currentEmployee?.BranchId === branche.id}
                      >
                        {branche.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Puesto
                  </label>
                  <select
                    id="role"
                    name="role"
                    onChange={handleChange}
                    className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300 disabled:cursor-not-allowed"
                  >
                    <option disabled selected={currentEmployee === null}>
                      Elija el cargo
                    </option>
                    {positions.map((pos) => (
                      <option
                        value={pos}
                        key={pos}
                        selected={currentEmployee?.User?.role === pos}
                      >
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Usuario
                </label>
                <select
                  id="UserId"
                  name="UserId"
                  onChange={handleChange}
                  disabled={currentEmployee !== null}
                  className="outline-none h-[50px] bg-gray-100 rounded-lg px-2 border border-gray-300"
                >
                  <option disabled selected={currentEmployee === null}>
                    Elija al empleado
                  </option>
                  {users.map((user) => (
                    <option
                      value={user.id}
                      key={user.id}
                      disabled={!user.isDataValidated}
                      selected={currentEmployee?.UserId === user.id}
                    >
                      {user.fullName}{' '}
                      {!user.isDataValidated && ' - (No validado)'}
                    </option>
                  ))}
                </select>
              </div>

              <button className="flex-1 w-full mt-5 h-[50px] bg-blue-700 text-white rounded-xl text-lg font-bold border border-blue-600 hover:bg-blue-800 transition-all duration-300 cursor-pointer">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  )
}

export default EmployeeModal
