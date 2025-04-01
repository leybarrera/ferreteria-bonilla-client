import { Outlet } from 'react-router-dom'
import { Chatbot, Nav, Sidebar } from '../components/index.components'
import { useState } from 'react'
import { RiMenuFill } from 'react-icons/ri'
const HomeLayout = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow((prev) => !prev)
  return (
    <>
      <Sidebar show={show} toggleShow={toggleShow} />
      <main className="flex flex-col  bg-[#F4F2EE] relative">
        <Nav toggleShow={toggleShow} />
        <Outlet />
        <Chatbot />
      </main>
    </>
  )
}

export default HomeLayout
