import { useEffect } from 'react'
import { useState } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { aboutApi } from '../../api/index.api'
import { toast, Toaster } from 'sonner'
import { AxiosError } from 'axios'

const About = () => {
  const { info } = useSelector((state) => state.user)
  const [about, setAbout] = useState('')
  const [id, setId] = useState('')
  const [editable, setEditable] = useState(false)

  const toggleEditable = () => {
    setEditable((prev) => !prev)
  }

  const handleSave = () => {
    if (id) {
      aboutApi
        .update({ text: about }, info.id)
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          setEditable(false)
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response.data.message)
          } else {
            toast.error('Error desconocido. Intente más tarde.')
          }
        })
    } else {
      aboutApi
        .save({ text: about, UserId: info.id })
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          setEditable(false)
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response.data.message)
          } else {
            toast.error('Error desconocido. Intente más tarde.')
          }
        })
    }
  }

  const handleChange = (e) => {
    const { value } = e.target
    setAbout(value)
  }

  useEffect(() => {
    if (info) {
      const { id } = info
      aboutApi
        .getByUserId(id)
        .then((res) => {
          const { about } = res.data
          setAbout(about.text)
          setId(about.id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [info])
  return (
    <main className="lg:w-[1000px] w-full relative h-[400px] bg-white rounded-2xl border border-gray-200">
      <textarea
        className="w-full h-full p-5 resize-none text-wrap overflow-y-auto outline-none disabled:cursor-not-allowed disabled:bg-gray-200 "
        disabled={!editable}
        placeholder="Cuentanos sobre ti para que los reclutadores sepan más de ti"
        value={about || ''}
        onChange={handleChange}
      />

      {editable ? (
        <button
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 transition-all duration-300 cursor-pointer"
          onClick={() => {
            handleSave()
          }}
        >
          <FaSave />
        </button>
      ) : (
        <button
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 transition-all duration-300 cursor-pointer"
          onClick={toggleEditable}
        >
          <FaEdit />
        </button>
      )}
      <Toaster richColors position="bottom-right" />
    </main>
  )
}

export default About
