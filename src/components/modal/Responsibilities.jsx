import { RiCloseFill } from 'react-icons/ri'

const Responsibilities = ({ text, showModal, toggleModal }) => {
  return (
    <div
      className={`
    absolute top-0 left-0 w-full h-screen bg-black/50 z-50 flex justify-center items-center lg:px-0 px-5 overflow-hidden
    `}
    >
      <div className="lg:w-[800px] w-full h-[600px] bg-white rounded-lg overflow-hidden flex flex-col">
        <header className="h-[60px] flex flex-row items-center justify-between px-10 bg-[#fd6c01] ">
          <h2 className="text-lg font-bold text-white">Responsabilidades</h2>
          <button className="hover:cursor-pointer hover:scale-110 transition-all duration-300">
            <RiCloseFill size={25} color="white" onClick={toggleModal} />
          </button>
        </header>

        <main className="px-10 py-5 flex-1">
          <textarea
            name="responsibilities"
            id="responsibilities"
            value={text || 'Sección no completada'}
            className="w-full h-full bg-gray-100 p-5 text-gray-700 text-justify resize-none"
          />
        </main>
      </div>
    </div>
  )
}

export default Responsibilities
