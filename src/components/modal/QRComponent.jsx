import { QRCodeSVG as QRCode } from 'qrcode.react'
import { frontendUrl } from '../../config/index.config'
import { useSelector } from 'react-redux'
import { RiCloseFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'
import { useEffect } from 'react'
import { userApi } from '../../api/index.api'
const QRComponent = ({ toggleShowQR, UserId }) => {
  const { info } = useSelector((state) => state.user)
  const url = `${frontendUrl}/verification-account/${info.id}`

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-black/50">
      <div className="w-[500px] h-[500px] bg-white border border-gray-200 rounded-lg flex flex-col justify-center items-center relative">
        <button
          className="absolute top-2 right-2 cursor-pointer hover:text-red-600"
          onClick={toggleShowQR}
        >
          <RiCloseFill size={25} color="red" />
        </button>
        <h2 className="text-2xl font-bold mb-3 text-[#fd6c01]">
          Escanea este código
        </h2>
        <QRCode value={url} size={250} />

        <NavLink
          to={url}
          target="_blank"
          className="mt-3 text-sm underline flex flex-row items-center gap-2"
        >
          <span>Visitar link</span>
          <FiExternalLink />
        </NavLink>
      </div>
    </div>
  )
}

export default QRComponent
