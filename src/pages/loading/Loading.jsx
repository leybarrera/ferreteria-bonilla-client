const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2">
      <img
        src="/public/mascota-clean.png"
        alt="Mascota"
        className="w-[80px] animate-bounce"
      />
      <h3 className="text-lg font-medium text-[#fd6c01]">Cargando...</h3>
    </div>
  )
}

export default Loading
