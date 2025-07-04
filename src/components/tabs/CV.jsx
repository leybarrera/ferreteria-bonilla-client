import { useEffect, useState, useRef } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import { resumeApi } from "../../api/index.api";
import { AxiosError } from "axios";

const CV = () => {
  const { info } = useSelector((state) => state.user);
  const [resume, setResume] = useState(null);
  const [_, setResumeUri] = useState(null);
  const [resumeLink, setResumeLink] = useState(null);

  const fileInputRef = useRef(null);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const uri = URL.createObjectURL(file);
      setResumeUri(uri);
      setResume(file);
    }
  };

  const handleCancel = () => {
    setResume(null);
    setResumeUri(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const saveResume = () => {
    if (!resume) {
      toast.error("No has cargado un currículum.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    resumeApi
      .saveResume(info.id, formData)
      .then((res) => {
        const { message, secure_url } = res.data;
        setResumeLink(secure_url);
        setResume(null);
        setResumeUri(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        toast.success(message);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  const handleDelete = () => {
    if (!resumeLink) {
      toast.error("No tienes un currículum para eliminar.");
      return;
    }

    resumeApi
      .deleteResume(info.id)
      .then((res) => {
        const { message } = res.data;
        setResumeLink(null);
        toast.success(message);
        handleCancel();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error desconocido. Intente más tarde.");
        }
      });
  };

  useEffect(() => {
    if (info) {
      const { id } = info;
      resumeApi
        .getByUserId(id)
        .then((res) => {
          const { resume } = res.data;
          if (resume) {
            setResumeLink(resume.url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [info]);

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-[1000px] flex flex-col">
        <h2 className="text-2xl font-semibold text-[#333333] mb-4">
          Subir Currículum
        </h2>

        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
          {resumeLink ? (
            <div className="flex flex-col items-center">
              <p className="text-lg text-gray-700">
                Ya tienes un currículum subido.
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#fd6c01] text-white font-semibold rounded-lg hover:bg-[#008d90] transition duration-200"
                >
                  Ver Currículum
                </a>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Eliminar Currículum
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#333333]">
                  Selecciona tu Currículum
                </h3>
                <p className="text-sm text-gray-500">
                  Suba un archivo en formato PDF, cualquier otro formato no es
                  válido. Tamaño máximo: 2MB.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition">
                <label
                  htmlFor="resume"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <RiUploadCloudFill
                    size={40}
                    className="text-[#fd6c01] mb-2"
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    Arrastra tu archivo aquí o haz clic para seleccionarlo
                  </span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeChange}
                />
              </div>

              {resume && (
                <div className="mt-4 flex items-center space-x-4">
                  <span className="text-sm text-gray-600 font-medium">
                    Has seleccionado: {resume.name}
                  </span>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveResume}
                  className="px-6 py-3 bg-[#fd6c01] text-white font-semibold rounded-lg hover:bg-[#008d90] transition duration-200"
                >
                  Guardar Currículum
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toaster richColors />
    </div>
  );
};

export default CV;
