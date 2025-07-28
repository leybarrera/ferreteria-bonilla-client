import { useState } from "react";
import { FaEye, FaEyeSlash, FaIdCard, FaUser } from "react-icons/fa";
import { MdEmail, MdLock, MdPhone } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { clientId } from "../../config/index.config";
import { userApi } from "../../api/index.api";
import { AxiosError } from "axios";
import { storageUtil, validatorUtils } from "../../utils/index.utils";
import { useDispatch } from "react-redux";
import { setInfo } from "../../redux/slices/user.slice";
// import { storageUtil } from '../../utils/index.utils'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [passworMatch, setPasswordMatch] = useState(false);
  const [user, setUser] = useState({
    fullName: null,
    email: null,
    password: null,
    phone: null,
    dni: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((data) => ({
      ...data,
      [name]: value,
    }));

    const credentials = Object.values(user).every((data) => data !== null);
    setIsValid(credentials && passworMatch);
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    const isValid = value === user.password;
    console.log(isValid);
    setPasswordMatch(isValid);
    const credentials = Object.values(user).every((data) => data !== null);
    setIsValid(credentials && isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentialsExists = Object.values(user).every(
      (data) => data !== null
    );
    if (!credentialsExists) {
      toast.error("Todos los datos son obligatorios");
      return;
    }

    if (!validatorUtils.isValidDNI(user.dni.toString())) {
      toast.error("DNI no valido");
      return;
    }

    if (!validatorUtils.isValidEmail(user.email)) {
      toast.error("Correo no valido");
      return;
    }

    if (!validatorUtils.isValidPhone(user.phone.toString())) {
      toast.error("Teléfono no válido");
      return;
    }

    if (user.password.length < 7 || user.password.length > 10) {
      toast.error("La contraseña debe tener entre 7 y 10 caracteres");
      return;
    }

    userApi
      .register(user)
      .then((res) => {
        const { message, expirationTime } = res.data;
        toast.success(`${message}. Bienvenido.`);
        setTimeout(() => {
          navigate("/activation", {
            state: {
              email: user.email,
              expirationTime,
            },
          });
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    const { email, sub, name, picture } = decoded;
    const dataUser = {
      email,
      fullName: name,
      profilePicture: picture,
      sub,
    };
    setUser((prev) => ({
      ...prev,
      fullName: name,
      profilePicture: picture,
      sub,
      email,
    }));

    userApi
      .registerWithGoogle(dataUser)
      .then((res) => {
        const { user } = res.data;
        toast.success(`${user.fullName}. Bienvenido.`);
        storageUtil.saveData("session", res.data);
        dispatch(setInfo(user));
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  const handleGoogleFailure = () => {
    toast.error("Error al autenticar con Google");
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main className="w-full h-full flex flex-row py-10">
        <section className="flex- w-[1200px] mx-auto md:[400px] px-5 flex flex-col  items-center ">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img src="/mascota.png" alt="" className="w-32 h-32" />
            <img src="/encabezado.png" alt="" />
          </div>
          <form
            action=""
            className="w-full flex flex-col gap-y-5 mt-12"
            onSubmit={handleSubmit}
          >
            <div className="grid lg:grid-cols-2 lg:gap-x-2 gap-y-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Nombres
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <FaUser size={25} color="white" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    minLength={5}
                    maxLength={50}
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Cédula
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <FaIdCard size={25} color="white" />
                  </div>
                  <input
                    type="text"
                    name="dni"
                    minLength={10}
                    maxLength={10}
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 lg:gap-x-2 gap-y-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Correo electrónico
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdEmail size={30} color="white" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Teléfono
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdPhone size={30} color="white" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    minLength={10}
                    maxLength={10}
                    autoComplete="off"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none px-2"
                  />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-x-2 gap-y-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Contraseña
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdLock size={30} color="white" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    minLength={7}
                    maxLength={10}
                    className="flex-1 h-full outline-none px-2"
                  />
                  <button
                    type="button"
                    className="w-[70px] h-full flex justify-center items-center cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <FaEye size={25} color="#bdbdbd" />
                    ) : (
                      <FaEyeSlash size={25} color="#bdbdbd" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xl font-bold">
                  Confirmar contraseña
                </label>
                <div className="flex h-14 bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:border-gray-300">
                  <div className="w-[70px] bg-[#fd6c01] h-full flex justify-center items-center">
                    <MdLock size={30} color="white" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm-password"
                    minLength={7}
                    maxLength={10}
                    onChange={handleConfirmPassword}
                    className="flex-1 h-full outline-none px-2"
                  />
                  <button
                    type="button"
                    className="w-[70px] h-full flex justify-center items-center cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <FaEye size={25} color="#bdbdbd" />
                    ) : (
                      <FaEyeSlash size={25} color="#bdbdbd" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end opacity-80 text-[15px]">
              <p className="flex flex-row items-center gap-1">
                ¿Ya tienes una cuenta?.
                <NavLink
                  to="/inicio-sesion"
                  className="text-[#fd6c01] font-bold hover:text-[#cb4d03] transition"
                >
                  Iniciar sesión
                </NavLink>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#fd6c01] text-lg uppercase font-bold text-white py-4 flex justify-center items-center rounded-lg hover:bg-[#cb4d03] transition-colors cursor-pointer disabled:bg-gray-300"
              disabled={!isValid}
            >
              Registrarme
            </button>
          </form>

          <div className="mt-10">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              text="signup_with"
            />
          </div>
        </section>

        <Toaster richColors position="bottom-right" />
      </main>
    </GoogleOAuthProvider>
  );
};

export default Register;
