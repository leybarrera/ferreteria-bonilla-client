import { useEffect } from 'react'
import AppRouter from './AppRouter'
import { storageUtil } from './utils/index.utils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Loading } from './pages/index.pages'
import { setInfo } from './redux/slices/user.slice'
import { setInfoAdmin, setToken } from './redux/slices/admin.slice'

const App = () => {
  const [loading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // LoadInfoUser

  useEffect(() => {
    setIsLoading(true)
    const session = storageUtil.getData('session')
    if (!session) {
      navigate('/inicio-sesion')
      setIsLoading(false)
    } else {
      const { user, token } = session
      if (user.role === 'Administrador') {
        dispatch(setInfoAdmin(user))
        dispatch(setToken(token))
      } else {
        dispatch(setInfo(user))
      }

      if (!token) {
        navigate('/inicio-sesion')
      } else {
        // navigate('/')
      }

      setIsLoading(false)
    }
  }, [])

  return loading ? <Loading /> : <AppRouter />
}

export default App
