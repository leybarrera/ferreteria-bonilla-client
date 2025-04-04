const Languages = () => {
  return (
    <div className="flex flex-col p-5 border border-gray-200 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Idiomas</h2>

      <section className="flex flex-col mt-3 gap-2">
        <article className="flex flex-col border-b border-gray-200 py-3">
          <h3 className="text-lg font-semibold ">Español</h3>
          <h5 className="text-sm font-light text-black">Nivel: Intermedio</h5>
        </article>
        <article className="flex flex-col border-b border-gray-200 py-3">
          <h3 className="text-lg font-semibold ">Español</h3>
          <h5 className="text-sm font-light text-black">Nivel: Intermedio</h5>
        </article>
      </section>
    </div>
  )
}

export default Languages
