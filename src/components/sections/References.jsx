import { FaIdCard } from 'react-icons/fa'

const References = () => {
  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Referencias</h2>

      <section className="flex flex-col mt-3 gap-2">
        <article className="flex flex-row items-start gap-3 border-b border-gray-200 py-3">
          {/* Icono */}
          <div>
            <FaIdCard size={50} />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">Eduardo Hernández</h3>
            <h5 className="text-sm font-light text-black">Recursos Humanos</h5>
            <h5 className="text-sm font-light text-black">
              eduardo.hernandez@gmail.com
            </h5>
          </div>
        </article>
      </section>
    </div>
  )
}

export default References
