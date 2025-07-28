import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { notificationApi } from "../../api/index.api";
import { useState } from "react";
import { dateUtil, storageUtil } from "../../utils/index.utils";
import { setNotifications } from "../../redux/slices/app.slice";
import { useDispatch } from "react-redux";

const Notifications = ({ showNotifications, toggleShowNotifications }) => {
  const navigate = useNavigate();
  const [notificationsArr, setNotificationsArr] = useState([]);
  const { info } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const markNotification = (id) => {
    const { token } = storageUtil.getData("session");
    notificationApi.markAsRead(id, token).then((res) => {
      storageUtil.removeData("session");
      setNotificationsArr((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      dispatch(
        setNotifications(
          notificationsArr.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          )
        )
      );
    });
  };

  const createOfferNotification = (notification) => {
    return (
      <article
        className="px-5 py-3 rounded-lg flex flex-row gap-2 items-center hover:bg-gray-50 cursor-pointer transition-all duration-300"
        key={notification.id}
        onClick={() =>
          markReadNotification(
            notification.id,
            notification.notificationType,
            notification.relationId
          )
        }
      >
        {/* Foto de perfil */}
        <img
          src="/mascota-clean.png"
          alt="Foto de perfil del usuario"
          className="w-[56px] h-[56px] rounded-full"
        />

        {/* Nombre mensaje */}

        <div className="flex-1 flex-col max-w-[220px]">
          <h3 className="text-sm font-bold">{notification.Branch.name}</h3>
          <h5 className="text-xs truncate w-full overflow-hidden whitespace-nowrap">
            {notification.message}
          </h5>
          <span className="text-xs font-bold">
            {dateUtil.formatedDate(notification.createdAt)}
          </span>
        </div>

        {!notification.isRead && (
          <div className="flex flex-col  justify-center items-center w-full h-full">
            <GoDotFill size={20} color="fd6c01" />
          </div>
        )}
      </article>
    );
  };
  const createAccountNotification = (notification) => {
    return (
      <article
        className="px-5 py-3 rounded-lg flex flex-row gap-2 items-center hover:bg-gray-50 cursor-pointer transition-all duration-300"
        key={notification.id}
        onClick={() => markNotification(notification.id)}
      >
        {/* Foto de perfil */}
        <img
          src="/mascota-clean.png"
          alt="Foto de perfil del usuario"
          className="w-[56px] h-[56px] rounded-full"
        />

        {/* Nombre mensaje */}

        <div className="flex-1 flex-col w-full">
          <h3 className="text-sm font-bold">Notificación del sistema</h3>
          <h5 className="text-xs  w-full overflow-hidden  text-wrap">
            {notification.message}
          </h5>
          <span className="text-xs font-bold">
            {dateUtil.formatedDate(notification.createdAt)}
          </span>
        </div>

        {!notification.isRead && (
          <div className="flex flex-col  justify-center items-center  h-full">
            <GoDotFill size={20} color="fd6c01" />
          </div>
        )}
      </article>
    );
  };

  const markReadNotification = (id, type, relationId) => {
    const { token } = storageUtil.getData("session");
    toggleShowNotifications();
    notificationApi
      .markAsRead(id, token)
      .then((res) => {
        setNotificationsArr((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        dispatch(
          setNotifications(
            notificationsArr.map((n) =>
              n.id === id ? { ...n, isRead: true } : n
            )
          )
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (type === "Offer") {
          navigate(`/offers/${relationId}`);
        }

        if (type === "Postulation") {
          navigate(`/applications/${relationId}`);
        }
      });
  };

  useEffect(() => {
    notificationApi.getAllByUserId(info.id).then((res) => {
      const { notifications } = res.data;
      setNotificationsArr(notifications);
    });
  }, []);
  return (
    <div
      className={`absolute top-full right-0 h-[500px] bg-gray-100 border border-gray-200 w-[400px]  z-50 rounded-xl mt-1 flex flex-col ${
        showNotifications ? "block" : "hidden"
      } transition-all duration-300`}
    >
      {/* Sections Header */}
      <section className="px-5 flex flex-row items-center h-[50px]">
        <h3 className="text-xl font-bold text-[#fd6c01]">Notificaciones</h3>
      </section>

      <section className="flex flex-col px-2 gap-2 overflow-y-auto h-[480px] pb-20">
        {notificationsArr && notificationsArr.length > 0 ? (
          notificationsArr.map((notification) => {
            switch (notification.notificationType) {
              case "Offer":
                return createOfferNotification(notification);
              case "Account":
                return createAccountNotification(notification);
              default:
                return createOfferNotification(notification);
            }
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center flex-1 ">
            <h2>No tienes notificaciones</h2>
          </div>
        )}
      </section>
      {notificationsArr && notificationsArr.length > 0 && (
        <div
          className="absolute bottom-0 left-0 w-full h-[50px] flex flex-row items-center
  justify-center bg-white border-t border-gray-200"
        >
          <NavLink
            to={"/notifications"}
            onClick={toggleShowNotifications}
            className="text-[#FD6C01] font-bold hover:text-[#ff850b] transition-all duration-300"
          >
            Ver todas las Notificaciones
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Notifications;
