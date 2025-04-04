import { IoBusinessSharp } from 'react-icons/io5'

const WorkExperience = () => {
  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Experiencia</h2>

      <section className="flex flex-col mt-3">
        <article className="flex flex-row items-start gap-3 border-b border-gray-200 py-3">
          {/* Icono */}
          <div>
            <IoBusinessSharp size={50} />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">Desarrollador Frontend</h3>
            <h5 className="text-sm font-light text-black">
              Empresa 1 - Temporal
            </h5>
            <h5 className="text-sm font-light text-black">
              oct. 2018 - feb. 2022 / 2 años
            </h5>
            <h5 className="text-sm font-light text-black">
              Ecuador - Presencial
            </h5>

            <p className="mt-2 text-[15px] text-black font-light text-wrap">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
              omnis obcaecati architecto autem. Hic facilis corrupti, eius ipsa
              eum laboriosam incidunt necessitatibus mollitia eligendi soluta
              est accusantium reiciendis deserunt voluptatibus natus dicta
              voluptatem temporibus! Labore itaque delectus asperiores suscipit
              maiores, repudiandae perspiciatis rerum ullam libero culpa, quos
              ipsum laudantium dicta.
            </p>
          </div>
        </article>
        <article className="flex flex-row items-start gap-3 border-b border-gray-200 py-3">
          {/* Icono */}
          <div>
            <IoBusinessSharp size={50} />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">Desarrollador Frontend</h3>
            <h5 className="text-sm font-light text-black">
              Empresa 1 - Temporal
            </h5>
            <h5 className="text-sm font-light text-black">
              oct. 2018 - feb. 2022 / 2 años
            </h5>
            <h5 className="text-sm font-light text-black">
              Ecuador - Presencial
            </h5>

            <p className="mt-2 text-[15px] text-black font-light text-wrap">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
              omnis obcaecati architecto autem. Hic facilis corrupti, eius ipsa
              eum laboriosam incidunt necessitatibus mollitia eligendi soluta
              est accusantium reiciendis deserunt voluptatibus natus dicta
              voluptatem temporibus! Labore itaque delectus asperiores suscipit
              maiores, repudiandae perspiciatis rerum ullam libero culpa, quos
              ipsum laudantium dicta.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}

export default WorkExperience
