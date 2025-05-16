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

  changePassword: (data) => {
    return instance.put(`/${model}/change-password`, data)
  },
}

export default authApi
