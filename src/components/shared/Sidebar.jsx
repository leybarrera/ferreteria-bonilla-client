import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { storageUtil } from "../../utils/index.utils";
import { NavLink, useNavigate } from "react-router-dom";
import {
  RiHome3Fill,
  RiLogoutCircleFill,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { FaBriefcase } from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";

const Sidebar = ({ show, toggleShow }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/inicio-sesion");
    storageUtil.removeData("session");
  };

  useEffect(() => {
    const data = storageUtil.getData("session");
    if (!data) return;
    const { user } = data;
    setUser(user);
  }, []);

  return (
    <>
      <aside
        className={`fixed h-full w-[70vw] bg-white border-l border-gray-500/20 top-0 ${
          show ? "right-0" : "-right-full"
        } transition-all duration-300 z-50 lg:hidden`}
      >
        {/* Section Name */}
        <section className="p-3 flex flex-row items-center gap-2 border-b border-gray-200">
          {/* Picture profile */}
          <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden">
            <img
              src={
                user
                  ? user.profilePicture
                  : "https://api.dicebear.com/7.x/adventurer/svg"
              }
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-bold">{user?.fullName}</h2>
            <h3 className="text-xs">{user?.email}</h3>
          </div>
        </section>

        {/* Menu Section */}
        <section className="flex flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-5 border-b border-gray-200 flex flex-row items-center gap-2 
        ${
          isActive ? "text-[#fd6c01] bg-gray-100" : "text-gray-700"
        } hover:text-black`
            }
            onClick={toggleShow}
          >
            <RiHome3Fill size={16} />
            Inicio
          </NavLink>
          <NavLink
            to="/branches"
            className={({ isActive }) =>
              `p-5 border-b border-gray-200 flex flex-row items-center gap-2 
        ${
          isActive ? "text-[#fd6c01] bg-gray-100" : "text-gray-700"
        } hover:text-black`
            }
            onClick={toggleShow}
          >
            <FaBriefcase size={16} />
            Sucursales
          </NavLink>

          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `p-5 border-b border-gray-200 flex flex-row items-center gap-2 
        ${
          isActive ? "text-[#fd6c01] bg-gray-100" : "text-gray-700"
        } hover:text-black`
            }
            onClick={toggleShow}
          >
            <FaBriefcase size={16} />
            Mis postulaciones
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `p-5 border-b border-gray-200 flex flex-row items-center gap-2 
        ${
          isActive ? "text-[#fd6c01] bg-gray-100" : "text-gray-700"
        } hover:text-black`
            }
            onClick={toggleShow}
          >
            <BiSolidMessageRoundedDots size={16} />
            Mensajes
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `p-5 border-b border-gray-200 flex flex-row items-center gap-2 
        ${
          isActive ? "text-[#fd6c01] bg-gray-100" : "text-gray-700"
        } hover:text-black`
            }
            onClick={toggleShow}
          >
            <IoIosNotifications size={16} />
            Notificaciones
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `p-5 border-b border-gray-200 flex flex-row items-center gap-2 
        ${
          isActive ? "text-[#fd6c01] bg-gray-100" : "text-gray-700"
        } hover:text-black`
            }
            onClick={toggleShow}
          >
            <IoMdSettings size={16} />
            Configuración
          </NavLink>
          <button
            onClick={logout}
            className={`p-5 border-b border-gray-200 flex flex-row items-center gap-2  text-gray-700 hover:text-black`}
          >
            <RiLogoutCircleFill size={16} />
            Cerrar sesión
          </button>
        </section>
      </aside>

      <div
        className={`bg-black opacity-50 fixed w-full h-full z-40 ${
          show ? "block" : "hidden"
        } transition-all duration-500 lg:hidden`}
        onClick={toggleShow}
      />
    </>
  );
};

export default Sidebar;
