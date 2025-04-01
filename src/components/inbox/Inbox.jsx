const Inbox = ({ showInbox }) => {
  return (
    <div
      className={`absolute top-full right-0 h-[776px] bg-gray-100 border border-gray-200 w-[400px]  z-50 rounded-xl mt-1 flex flex-col ${
        showInbox ? 'block' : 'hidden'
      } transition-all duration-300`}
    >
      {/* Sections Header */}
      <section className="px-5 py-3 flex flex-row items-center">
        <h3 className="text-xl font-bold text-[#fd6c01]">Mensajes</h3>
      </section>

      {/* Section Messages */}
      <section className="flex flex-col px-2 gap-2">
        <article className="px-5 py-3 rounded-lg flex flex-row gap-2 items-center">
          {/* Foto de perfil */}
          <img
            src="/public/user.png"
            alt="Foto de perfil del usuario"
            className="w-[56px] h-[56px] rounded-full"
          />

          {/* Nombre mensaje */}

          <div className="flex-1 flex-col max-w-[200px]">
            <h3 className="text-sm font-bold">Cristhian Rodríguez</h3>
            <h5 className="text-xs truncate w-full overflow-hidden whitespace-nowrap">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Provident, adipisci.
            </h5>
          </div>

          <div className="w-full flex h-full flex-row items-center justify-center ">
            <span className="text-xs font-bold">1 min</span>
          </div>
        </article>
        <article className="px-5 py-3 rounded-lg flex flex-row gap-2 items-center">
          {/* Foto de perfil */}
          <img
            src="/public/user.png"
            alt="Foto de perfil del usuario"
            className="w-[56px] h-[56px] rounded-full"
          />

          {/* Nombre mensaje */}

          <div className="flex-1 flex-col max-w-[200px]">
            <h3 className="text-sm font-bold">Cristhian Rodríguez</h3>
            <h5 className="text-xs truncate w-full overflow-hidden whitespace-nowrap">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Provident, adipisci.
            </h5>
          </div>

          <div className="w-full flex h-full flex-row items-center justify-center ">
            <span className="text-xs font-bold">1 min</span>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Inbox
