import { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { IoIosSend } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'

const Messages = () => {
  const [showModal, setShowModal] = useState(true)

  const toggleShowModal = () => {
    setShowModal((prev) => !prev)
  }
  return (
    <>
      <main className="lg:w-[1400px] h-full w-full mx-auto flex flex-col mt-2 bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <header className="w-full flex lg:flex-row flex-col lg:gap-5 items-center lg:px-10 px-5 lg:h-[70px] border-b border-gray-200 lg:py-0 py-5">
          <h2 className="text-lg font-bold">Mensajes</h2>
          {/* Buscador */}
          <div className="bg-gray-100 h-[40px] lg:w-[300px] w-full border border-gray-200 rounded-lg flex flex-row">
            <div className="w-[40px] h-full flex justify-center items-center">
              <IoSearch size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar mensajes"
              className="w-full h-full outline-none px-2 text-sm"
            />
          </div>
        </header>

        {/* Filtros */}
        <div className="w-full h-[50px] border-b border-gray-200 flex flex-row items-center gap-2 px-10">
          <button className="h-[30px] px-5 rounded-full bg-[#fd6c01] text-white text-sm font-bold cursor-pointer hover:bg-[#cb4d03] transition-all duration-300">
            Todos
          </button>
          <button className="h-[30px] px-5 rounded-full text-sm font-bold border border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-gray-400 ttransition-all duration-300 cursor-pointer">
            No leídos
          </button>
        </div>
        {/* Inbox */}
        <section className="w-full flex flex-row lg:h-[700px]">
          <aside className="lg:w-[350px] w-full h-full bg-white flex flex-col border-r border-gray-200 overflow-y-auto">
            {/* Mensajes */}
            <article
              className="border-b border-gray-200 relative flex flex-row gap-2 items-start px-5 py-5"
              onClick={toggleShowModal}
            >
              <div className="absolute left-0 top-0 w-[5px] bg-[#fd6c01] h-full" />

              {/* Foto de perfil */}
              <img
                src="/public/user.png"
                alt="Foto de perfil"
                className="w-[56px] h-[56px] rounded-full"
              />

              {/* Información */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold">Cristhian Rodríguez</h3>

                {/* Mensaje con truncamiento */}
                <p className="text-sm text-gray-600 truncate max-w-[200px]  ">
                  Cristhian: Aquí va un mensaje largo que se truncará con puntos
                  suspensivos cuando el texto sea muy largo para el contenedor.
                </p>

                <span className="text-xs text-gray-400">Hace 3 horas</span>
              </div>
            </article>
            <article className="border-b border-gray-200 relative flex flex-row gap-2 items-start px-5 py-5">
              {/* <div className="absolute left-0 top-0 w-[5px] bg-[#fd6c01] h-full" /> */}

              {/* Foto de perfil */}
              <img
                src="/public/user.png"
                alt="Foto de perfil"
                className="w-[56px] h-[56px] rounded-full"
              />

              {/* Información */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold">Cristhian Rodríguez</h3>

                {/* Mensaje con truncamiento */}
                <p className="text-sm text-gray-600 truncate max-w-[200px]  ">
                  Cristhian: Aquí va un mensaje largo que se truncará con puntos
                  suspensivos cuando el texto sea muy largo para el contenedor.
                </p>

                <span className="text-xs text-gray-400">Hace 3 horas</span>
              </div>
            </article>
            <article className="border-b border-gray-200 relative flex flex-row gap-2 items-start px-5 py-5 bg-gray-200">
              {/* <div className="absolute left-0 top-0 w-[5px] bg-[#fd6c01] h-full" /> */}

              {/* Foto de perfil */}
              <img
                src="/public/user.png"
                alt="Foto de perfil"
                className="w-[56px] h-[56px] rounded-full"
              />

              {/* Información */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold">Cristhian Rodríguez</h3>

                {/* Mensaje con truncamiento */}
                <p className="text-sm text-gray-600 truncate max-w-[200px]  ">
                  Cristhian: Aquí va un mensaje largo que se truncará con puntos
                  suspensivos cuando el texto sea muy largo para el contenedor.
                </p>

                <span className="text-xs text-gray-400">Hace 3 horas</span>
              </div>
            </article>
          </aside>

          {/* Mensaje */}
          <section className="hidden lg:flex-1 h-full bg-white relative lg:flex lg:flex-col">
            {/* Header */}
            <header className="w-full border-b border-gray-200 px-5 py-3">
              <h3 className="text-sm font-semibold">Cristhian Rodríguez</h3>
              <h5 className="text-xs text-gray-400">Director de Desarrollo</h5>
            </header>

            {/* Mensajes */}
            <main className="w-full flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-5">
              {/* Sender */}
              <div className="flex flex-row gap-3 items-center justify-start">
                <img
                  src="/public/user.png"
                  alt="Foto de perfil"
                  className="w-[56px] h-[56px] rounded-full"
                />
                <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
                  <span className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro nulla nemo, numquam vitae, laudantium ipsam laborum
                    itaque nam quidem dicta iusto? Qui voluptas animi distinctio
                    recusandae obcaecati expedita facilis maiores ex totam
                    officiis! At dolor mollitia consequatur ipsum quibusdam
                    corrupti facere magni, veniam delectus officiis
                    exercitationem iure vitae id soluta.
                  </span>
                </div>
              </div>

              {/* Receiver */}
              <div className="flex flex-row gap-3 items-center justify-end">
                <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Ducimus, neque?
                  </span>
                </div>
              </div>

              {/* Sender */}
              <div className="flex flex-row gap-3 items-center justify-start">
                <img
                  src="/public/user.png"
                  alt="Foto de perfil"
                  className="w-[56px] h-[56px] rounded-full"
                />
                <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
                  <span className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro nulla nemo, numquam vitae, laudantium ipsam laborum
                    itaque nam quidem dicta iusto? Qui voluptas animi distinctio
                    recusandae obcaecati expedita facilis maiores ex totam
                    officiis! At dolor mollitia consequatur ipsum quibusdam
                    corrupti facere magni, veniam delectus officiis
                    exercitationem iure vitae id soluta.
                  </span>
                </div>
              </div>

              {/* Receiver */}
              <div className="flex flex-row gap-3 items-center justify-end">
                <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Ducimus, neque?
                  </span>
                </div>
              </div>
            </main>

            {/* Input */}
            <footer className="w-full h-[150px] bg-white border-t border-gray-200 px-10 py-5">
              <textarea
                type="text"
                name="message"
                id="message"
                placeholder="Escribe un mensaje"
                className="w-full h-full outline-none border border-gray-300 rounded-lg px-5 py-3 resize-none bg-gray-100"
              />
            </footer>
          </section>
        </section>
      </main>
      {/* Modal mensaje */}

      <div
        className={`absolute w-full h-screen top-0 left-0 bg-white z-50 lg:hidden ${
          showModal ? 'translate-y-0' : 'translate-y-full'
        }   transition-all duration-300 flex flex-col`}
      >
        <header className="px-5 py-3 flex flex-row items-center gap-5 border border-gray-200">
          <button type="button" onClick={toggleShowModal}>
            <GoArrowLeft size={25} />
          </button>
          <h3 className="text-xl font-bold">Cristhian Rodríguez</h3>
        </header>

        <main className="w-full flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-5">
          {/* Sender */}
          <div className="flex flex-row gap-3 items-center justify-start">
            <img
              src="/public/user.png"
              alt="Foto de perfil"
              className="w-[56px] h-[56px] rounded-full"
            />
            <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
              <span className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                nulla nemo, numquam vitae, laudantium ipsam laborum itaque nam
                quidem dicta iusto? Qui voluptas animi distinctio recusandae
                obcaecati expedita facilis maiores ex totam officiis! At dolor
                mollitia consequatur ipsum quibusdam corrupti facere magni,
                veniam delectus officiis exercitationem iure vitae id soluta.
              </span>
            </div>
          </div>

          {/* Receiver */}
          <div className="flex flex-row gap-3 items-center justify-end">
            <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus, neque?
              </span>
            </div>
          </div>

          {/* Sender */}
          <div className="flex flex-row gap-3 items-center justify-start">
            <img
              src="/public/user.png"
              alt="Foto de perfil"
              className="w-[56px] h-[56px] rounded-full"
            />
            <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
              <span className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                nulla nemo, numquam vitae, laudantium ipsam laborum itaque nam
                quidem dicta iusto? Qui voluptas animi distinctio recusandae
                obcaecati expedita facilis maiores ex totam officiis! At dolor
                mollitia consequatur ipsum quibusdam corrupti facere magni,
                veniam delectus officiis exercitationem iure vitae id soluta.
              </span>
            </div>
          </div>

          {/* Receiver */}
          <div className="flex flex-row gap-3 items-center justify-end">
            <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus, neque?
              </span>
            </div>
          </div>

          {/* Sender */}
          <div className="flex flex-row gap-3 items-center justify-start">
            <img
              src="/public/user.png"
              alt="Foto de perfil"
              className="w-[56px] h-[56px] rounded-full"
            />
            <div className="w-[450px] h-fit pl-5 pr-2 py-3 bg-gray-200 rounded-t-xl rounded-tr-xl rounded-br-xl">
              <span className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                nulla nemo, numquam vitae, laudantium ipsam laborum itaque nam
                quidem dicta iusto? Qui voluptas animi distinctio recusandae
                obcaecati expedita facilis maiores ex totam officiis! At dolor
                mollitia consequatur ipsum quibusdam corrupti facere magni,
                veniam delectus officiis exercitationem iure vitae id soluta.
              </span>
            </div>
          </div>

          {/* Receiver */}
          <div className="flex flex-row gap-3 items-center justify-end">
            <div className="w-[450px] h-fit px-5 py-3 bg-[#fd6c01] rounded-bl-2xl rounded-t-xl rounded-tr-xl text-white">
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus, neque?
              </span>
            </div>
          </div>
        </main>

        <footer className="absolute bottom-0 left-0 w-full h-[100px] border-t border-gray-200 px-5 py-3 flex flex-row items-center bg-white">
          <textarea
            type="text"
            name="message"
            id="message"
            placeholder="Escribe un mensaje"
            className="w-full h-full outline-none border border-gray-300 rounded-lg px-5 py-3 resize-none bg-gray-100"
          />

          <button className="w-[60px] flex justify-center items-center cursor-pointer">
            <IoIosSend size={25} />
          </button>
        </footer>
      </div>
    </>
  )
}

export default Messages
