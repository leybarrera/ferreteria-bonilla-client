import { instance } from '../base.api'

const model = 'auth'

const authApi = {
  loginWithGoogle: (sub) => {
    return instance.post(`/${model}/login/with-google`, { sub })
  },
  loginWithCredentials: ({ email, password }) => {
    return instance.post(`/${model}/login/with-credentials`, {
      email,
      password,
    })
  },
}

export default authApi
