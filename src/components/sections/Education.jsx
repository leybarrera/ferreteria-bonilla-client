import { LiaUniversitySolid } from 'react-icons/lia'

const Education = () => {
  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Educación</h2>

      <section className="flex flex-col mt-3">
        <article className="flex flex-row items-start gap-3 border-b border-gray-200 py-3">
          {/* Icono */}
          <LiaUniversitySolid size={50} />

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">Universidad de los Andes</h3>
            <h5 className="text-sm font-light text-black">
              Licenciatura en Informática
            </h5>
            <h5 className="text-sm font-light text-black">
              oct. 2018 - feb. 2022
            </h5>
          </div>
        </article>
        <article className="flex flex-row items-start gap-3 border-b border-gray-200 py-3">
          {/* Icono */}
          <LiaUniversitySolid size={50} />

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">
              Universidad Técnica de Cotopaxi
            </h3>
            <h5 className="text-sm font-light text-black">
              Licenciatura en Informática
            </h5>
            <h5 className="text-sm font-light text-black">
              oct. 2018 - feb. 2022
            </h5>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Education
