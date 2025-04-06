import { IoSearch } from 'react-icons/io5'

const Offers = () => {
  return (
    <main className="w-full h-full flex lg:px-10 lg:py-10 py-20 md:px-5 px-2 flex-col">
      <h2 className="text-3xl font-bold">Ofertas Laborales</h2>
      {/* Seccion busqueda y agregar */}
      <section className="w-full flex flex-row items-center justify-between mt-5">
        {/* Busqueda */}
        <div className="bg-white h-[50px] w-[400px] border border-gray-200 rounded-lg flex flex-row">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar oferta"
            className="flex-1 h-full outline-none px-5 text-gray-400"
          />
          <div className="w-[70px] h-full flex justify-center items-center">
            <IoSearch size={25} color="#d1d5dc" />
          </div>
        </div>
      </section>
      {/* Tabla de sucursales */}
      <section className="mt-5 grid lg:grid-cols-2 grid-cols-1 gap-2 ">
        <article className="w-full h-fit bg-white rounded-lg px-5 py-10 relative">
          <span className="absolute top-3 right-5 px-5 py-1 rounded-full text-white bg-green-400 text-sm">
            Activa
          </span>
          <div className="flex flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Oferta publicada por</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                Empresa de prueba
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Descripción de la oferta</h2>
            <div className="w-full h-[200px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2">
              <span className="font-bold text-sm text-gray-400 text-justify">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
                possimus hic pariatur dignissimos doloremque molestias porro
                nihil nemo sit corrupti quisquam, excepturi quaerat veniam amet
                ex atque quasi dolores minima praesentium voluptatum.
                Laboriosam, error ratione omnis aliquam ipsam quia asperiores
                cupiditate obcaecati autem cum id fugit rerum corrupti non ex?
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 justify-between mb-5">
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-bold text-lg">Salario</h2>
              <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                <span className="font-bold text-sm text-gray-400">2700</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-bold text-lg">Contrato</h2>
              <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                <span className="font-bold text-sm text-gray-400">
                  Temporal
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Ubicación</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                La Maná Cotopaxi
              </span>
            </div>
          </div>

          <button className="bg-red-800 text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-red-900 transition-all duration-300 w-full">
            Eliminar
          </button>
        </article>
        <article className=" w-full h-fit bg-white rounded-lg px-5 py-10 relative">
          <span className="absolute top-3 right-5 px-5 py-1 rounded-full text-white bg-green-400 text-sm">
            Activa
          </span>
          <div className="flex flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Oferta publicada por</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                Empresa de prueba
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Descripción de la oferta</h2>
            <div className="w-full h-[200px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2">
              <span className="font-bold text-sm text-gray-400 text-justify">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
                possimus hic pariatur dignissimos doloremque molestias porro
                nihil nemo sit corrupti quisquam, excepturi quaerat veniam amet
                ex atque quasi dolores minima praesentium voluptatum.
                Laboriosam, error ratione omnis aliquam ipsam quia asperiores
                cupiditate obcaecati autem cum id fugit rerum corrupti non ex?
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 justify-between mb-5">
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-bold text-lg">Salario</h2>
              <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                <span className="font-bold text-sm text-gray-400">2700</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-bold text-lg">Contrato</h2>
              <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
                <span className="font-bold text-sm text-gray-400">
                  Temporal
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h2 className="font-bold text-lg">Ubicación</h2>
            <div className="w-full h-[45px] bg-gray-100 border border-gray-200 flex px-2 flex-row items-center rounded-lg">
              <span className="font-bold text-sm text-gray-400">
                La Maná Cotopaxi
              </span>
            </div>
          </div>

          <button className="bg-red-800 text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-red-900 transition-all duration-300 w-full">
            Eliminar
          </button>
        </article>
      </section>
    </main>
  )
}

export default Offers
