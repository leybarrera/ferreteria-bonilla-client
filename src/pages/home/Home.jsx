import { FaPlus } from 'react-icons/fa'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { TbMapPinFilled } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <main className="lg:w-[1400px] mx-auto w-full flex lg:flex-row flex-col py-10 lg:px-0 px-10 gap-5 h-full bg-[#F4F2EE]">
      {/* Info */}
      <section className="lg:w-[250px] w-full border border-gray-200 rounded-xl bg-white h-fit pb-10 flex flex-col items-center gap-1 overflow-hidden">
        {/* header */}
        <div className="relative w-full lg:h-[58px] md:h-[150px] h-[80px]">
          <img
            src="/public/portada.jpg"
            alt=""
            className="absolute w-full h-full object-cover"
          />
          {/* Imagen de perfil */}
          <img
            src="/public/user.png"
            alt="Imagen de perfil del usuario"
            className="absolute lg:w-[72px] lg:h-[72px] md:w-[100px] md:h-[100px] h-[80px] w-[80px]  border-2 border-gray-400 rounded-full left-5 lg:-bottom-1/2 md:-bottom-10 -bottom-1/2"
          />
        </div>

        <div className="mt-10 px-5 flex flex-col w-full">
          {/* Nombre del usuario */}
          <h2 className="text-[20px] font-bold opacity-80">
            Cristhian Rodríguez
          </h2>
          <h3 className="font-semibold text-[13px] text-gray-500">
            crisrodam1996@gmail.com
          </h3>
          <h3 className="font-light text-[12px] text-gray-500">
            El Empalme, Guayas
          </h3>
        </div>
      </section>
      {/* Ofertas */}
      <section className="flex-1 h-fit pb-5 flex flex-col gap-3">
        {/* Oferta */}
        <article className="flex flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300">
          {/* Header */}
          <header className="flex flex-row gap-3 px-5">
            <img
              src="/public/user.png"
              alt="Foto de la empresa"
              className="w-[60px] h-[60px] rounded-full border-2 border-gray-400"
            />
            <div className="flex flex-col">
              <h2 className="text-lg text-[#000000E6] font-semibold">
                Nombre de la empresa
              </h2>
              <h3 className="text-xs text-[#00000099]">La Maná, Cotopaxi</h3>
              <h5 className="text-xs font-light text-[#00000099]">5 días</h5>
            </div>
          </header>

          <main className="px-5 mt-2">
            <p className="text-justify text-[16px] text-[#000000E6]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              voluptatem eum, vel minus quibusdam sapiente accusantium dolores
              dolorem dignissimos quas beatae aperiam earum? Dolor ex quae
              quidem, at aperiam, quo dolorum blanditiis hic, enim atque ipsa
              inventore! Quod hic voluptate expedita repudiandae officia laborum
              maiores minus velit rem, magnam mollitia, voluptatum voluptates
              ipsa? Repellat, vero voluptates doloribus nesciunt at totam alias
              corrupti. Recusandae nobis odio repellendus est fuga adipisci
              unde, repellat, praesentium minus enim alias quas voluptatem
              voluptates architecto maxime in labore. Neque earum inventore
              dignissimos facilis architecto, nostrum dolorem ad, maxime,
              corrupti labore deleniti quae mollitia voluptatum ea ratione.
            </p>

            <button className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-[#fd6c01] transition-colors duration-300">
              Aplicar
            </button>
          </main>
        </article>
        <article className="flex flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300">
          {/* Header */}
          <header className="flex flex-row gap-3 px-5">
            <img
              src="/public/user.png"
              alt="Foto de la empresa"
              className="w-[60px] h-[60px] rounded-full border-2 border-gray-400"
            />
            <div className="flex flex-col">
              <h2 className="text-lg text-[#000000E6] font-semibold">
                Nombre de la empresa
              </h2>
              <h3 className="text-xs text-[#00000099]">La Maná, Cotopaxi</h3>
              <h5 className="text-xs font-light text-[#00000099]">5 días</h5>
            </div>
          </header>

          <main className="px-5 mt-2">
            <p className="text-justify text-[16px] text-[#000000E6]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              voluptatem eum, vel minus quibusdam sapiente accusantium dolores
              dolorem dignissimos quas beatae aperiam earum? Dolor ex quae
              quidem, at aperiam, quo dolorum blanditiis hic, enim atque ipsa
              inventore! Quod hic voluptate expedita repudiandae officia laborum
              maiores minus velit rem, magnam mollitia, voluptatum voluptates
              ipsa? Repellat, vero voluptates doloribus nesciunt at totam alias
              corrupti. Recusandae nobis odio repellendus est fuga adipisci
              unde, repellat, praesentium minus enim alias quas voluptatem
              voluptates architecto maxime in labore. Neque earum inventore
              dignissimos facilis architecto, nostrum dolorem ad, maxime,
              corrupti labore deleniti quae mollitia voluptatum ea ratione.
            </p>

            <button className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-[#fd6c01] transition-colors duration-300">
              Aplicar
            </button>
          </main>
        </article>
        <article className="flex flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300">
          {/* Header */}
          <header className="flex flex-row gap-3 px-5">
            <img
              src="/public/user.png"
              alt="Foto de la empresa"
              className="w-[60px] h-[60px] rounded-full border-2 border-gray-400"
            />
            <div className="flex flex-col">
              <h2 className="text-lg text-[#000000E6] font-semibold">
                Nombre de la empresa
              </h2>
              <h3 className="text-xs text-[#00000099]">La Maná, Cotopaxi</h3>
              <h5 className="text-xs font-light text-[#00000099]">5 días</h5>
            </div>
          </header>

          <main className="px-5 mt-2">
            <p className="text-justify text-[16px] text-[#000000E6]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              voluptatem eum, vel minus quibusdam sapiente accusantium dolores
              dolorem dignissimos quas beatae aperiam earum? Dolor ex quae
              quidem, at aperiam, quo dolorum blanditiis hic, enim atque ipsa
              inventore! Quod hic voluptate expedita repudiandae officia laborum
              maiores minus velit rem, magnam mollitia, voluptatum voluptates
              ipsa? Repellat, vero voluptates doloribus nesciunt at totam alias
              corrupti. Recusandae nobis odio repellendus est fuga adipisci
              unde, repellat, praesentium minus enim alias quas voluptatem
              voluptates architecto maxime in labore. Neque earum inventore
              dignissimos facilis architecto, nostrum dolorem ad, maxime,
              corrupti labore deleniti quae mollitia voluptatum ea ratione.
            </p>

            <button className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-[#fd6c01] transition-colors duration-300">
              Aplicar
            </button>
          </main>
        </article>
        <article className="flex flex-col gap-2 bg-white py-5 rounded-lg border border-gray-200 shadow shadow-gray-300">
          {/* Header */}
          <header className="flex flex-row gap-3 px-5">
            <img
              src="/public/user.png"
              alt="Foto de la empresa"
              className="w-[60px] h-[60px] rounded-full border-2 border-gray-400"
            />
            <div className="flex flex-col">
              <h2 className="text-lg text-[#000000E6] font-semibold">
                Nombre de la empresa
              </h2>
              <h3 className="text-xs text-[#00000099]">La Maná, Cotopaxi</h3>
              <h5 className="text-xs font-light text-[#00000099]">5 días</h5>
            </div>
          </header>

          <main className="px-5 mt-2">
            <p className="text-justify text-[16px] text-[#000000E6]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              voluptatem eum, vel minus quibusdam sapiente accusantium dolores
              dolorem dignissimos quas beatae aperiam earum? Dolor ex quae
              quidem, at aperiam, quo dolorum blanditiis hic, enim atque ipsa
              inventore! Quod hic voluptate expedita repudiandae officia laborum
              maiores minus velit rem, magnam mollitia, voluptatum voluptates
              ipsa? Repellat, vero voluptates doloribus nesciunt at totam alias
              corrupti. Recusandae nobis odio repellendus est fuga adipisci
              unde, repellat, praesentium minus enim alias quas voluptatem
              voluptates architecto maxime in labore. Neque earum inventore
              dignissimos facilis architecto, nostrum dolorem ad, maxime,
              corrupti labore deleniti quae mollitia voluptatum ea ratione.
            </p>

            <button className="w-full py-2 flex flex-row items-center justify-center gap-2 mt-3 bg-[#ff850b] text-white text-lg font-bold rounded-xl cursor-pointer hover:bg-[#fd6c01] transition-colors duration-300">
              Aplicar
            </button>
          </main>
        </article>
      </section>
      {/* Sucursales */}
      <section className="lg:w-[350px] lg:flex hidden w-full border border-gray-200 rounded-xl bg-white h-fit py-5 px-5 lg:flex-col lg:gap-3 shadow-2xl shadow-gray-200">
        {/* Heaader */}
        <div className="flex flex-row items-center">
          <h2 className="text-xl font-semibold">Sucursales</h2>
        </div>
        {/* Lista de secursales */}

        <div className="flex flex-col gap-5">
          <article className="flex flex-row gap-3">
            {/* Foto de la sucursal */}
            <img
              src=""
              alt=""
              className="w-[50px] h-[50px] rounded-full bg-red-300"
            />

            <div className="flex flex-col">
              <h3 className="text-[14px] font-bold">Nombre sucursal</h3>
              <h5 className="text-xs font-light text-gray-500">
                Quito, Pichincha
              </h5>
              <button className="w-full flex flex-row gap-1 items-center justify-center py-1 border border-[#000000BF] rounded-full mt-2 ">
                <FaPlus size={14} />
                <span className="font-bold text-[#000000BF] text-[16px]">
                  Seguir
                </span>
              </button>
            </div>
          </article>
          <article className="flex flex-row gap-3">
            {/* Foto de la sucursal */}
            <img
              src=""
              alt=""
              className="w-[50px] h-[50px] rounded-full bg-red-300"
            />

            <div className="flex flex-col">
              <h3 className="text-[14px] font-bold">Nombre sucursal</h3>
              <h5 className="text-xs font-light text-gray-500">
                Quito, Pichincha
              </h5>
              <button className="w-full flex flex-row gap-1 items-center justify-center py-1 border border-[#000000BF] rounded-full mt-2 ">
                <FaPlus size={14} />
                <span className="font-bold text-[#000000BF] text-[16px]">
                  Seguir
                </span>
              </button>
            </div>
          </article>

          <NavLink to={'/'} className="flex flex-row items-center gap-2 ">
            <span className="text-[16px] text-[#000000BF] hover:text-gray-900 transition-all duration-300">
              Ver todas las sucursales
            </span>
            <IoArrowForwardOutline color="#000000BF" size={18} />
          </NavLink>
        </div>
      </section>
    </main>
  )
}

export default Home
