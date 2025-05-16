import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AppRouter from './AppRouter'
import { Loading } from './pages/index.pages'
import { storageUtil } from './utils/index.utils'
import { setInfo } from './redux/slices/user.slice'
import { setToken } from './redux/slices/admin.slice'

const App = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const publicRoutes = [
      '/inicio-sesion',
      '/registro',
      '/recuperacion',
      '/activation',
    ]

    if (publicRoutes.includes(location.pathname)) {
      setIsLoading(false)
      return
    }

    const session = storageUtil.getData('session')

    if (!session || !session.token) {
      navigate('/inicio-sesion')
      setIsLoading(false)
      return
    }

    const { user, token } = session

    try {
      const decoded = jwtDecode(token)
      const expirationTime = decoded.exp * 1000
      const currentTime = Date.now()

      if (expirationTime <= currentTime) {
        storageUtil.removeData('session')
        navigate('/inicio-sesion')
        return
      }

      // ✅ Solo si el token es válido, se hace el dispatch
      dispatch(setInfo(user))
      if (user?.role === 'Administrador') {
        dispatch(setToken(token))
      }

      // ⏱️ Logout automático cuando expire
      const timeout = expirationTime - currentTime
      const timer = setTimeout(() => {
        storageUtil.removeData('session')
        navigate('/inicio-sesion')
      }, timeout)

      // 🧹 Limpieza del timer
      return () => clearTimeout(timer)
    } catch (error) {
      storageUtil.removeData('session')
      navigate('/inicio-sesion')
      return
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, navigate, location.pathname])

  return isLoading ? <Loading /> : <AppRouter />
}

export default App
