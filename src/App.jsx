import { useEffect } from 'react'
import AppRouter from './AppRouter'
import { storageUtil } from './utils/index.utils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Loading } from './pages/index.pages'
import { setInfo } from './redux/slices/user.slice'

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
      console.log(user)
      dispatch(setInfo(user))

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
