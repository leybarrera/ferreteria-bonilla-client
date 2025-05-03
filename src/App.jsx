import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppRouter from './AppRouter'
import { Loading } from './pages/index.pages'
import { storageUtil } from './utils/index.utils'
import { setInfo } from './redux/slices/user.slice'
import { setToken } from './redux/slices/admin.slice'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const initializeApp = () => {
      const session = storageUtil.getData('session')

      if (!session || !session.token) {
        navigate('/inicio-sesion')
        return setIsLoading(false)
      }

      const { user, token } = session
      dispatch(setInfo(user))

      if (user?.role === 'Administrador') {
        dispatch(setToken(token))
      } else {
        dispatch(setInfo(user))
      }

      setIsLoading(false)
    }

    initializeApp()
  }, [dispatch, navigate])

  return isLoading ? <Loading /> : <AppRouter />
}

export default App
