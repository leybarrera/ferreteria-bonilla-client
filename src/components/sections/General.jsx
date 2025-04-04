const General = () => {
  return (
    <div className="flex flex-col p-5  border-gray-200 bg-white rounded-lg border ">
      <h2 className="text-2xl font-bold">Informacion personal</h2>

      <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Nombres</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={'Cristhian Rodríguez'}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Correo electrónico</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={'crisrodam1996@gmail'}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Cédula</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={'0940501596'}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Teléfono</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={'0987654321'}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Género</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={'Masculino'}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Residencia</h3>
          <input
            type="text"
            disabled
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-900 font-semibold"
            value={'Ecuador'}
          />
        </div>
      </div>
    </div>
  )
}

export default General
