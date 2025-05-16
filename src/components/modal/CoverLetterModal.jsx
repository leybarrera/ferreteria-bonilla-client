import { useState } from 'react'

const CoverLetterModal = ({
  toggleShowCoverLetter,
  coverLetter,
  setCoverLetter,
  handleConfirmApplyJob,
}) => {
  const handleChange = (e) => {
    const { value } = e.target
    setCoverLetter(value)
  }

  return (
    <div className="absolute w-full h-screen bg-black/50 top-0 left-0 z-50 flex justify-center items-center overflow-hidden">
      <div className="lg:w-[900px] h-fit bg-white rounded-lg px-5 py-10">
        <h2 className="font-bold text-lg">Carta de presentación</h2>
        <textarea
          name="coverLetter"
          id="coverLetter"
          value={coverLetter}
          onChange={handleChange}
          className="w-full h-[300px] bg-gray-100 border border-gray-200 flex px-4 flex-row items-start rounded-lg py-2 mt-5"
          placeholder="Ingrese su carta de presentación para que el reclutador pueda conocerle mejor. Al menos 20 palabras."
        />
        <button
          className="mt-3 w-full bg-[#fd6c01] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#fd6c01]/80 transition-all duration-300 cursor-pointer"
          disabled={!coverLetter || coverLetter.length < 20}
          onClick={handleConfirmApplyJob}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}

export default CoverLetterModal
