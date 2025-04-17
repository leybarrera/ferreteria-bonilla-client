import { instance } from '../base.api'

const model = 'users'

const userApi = {
  register: (data) => {
    return instance.post(`/${model}/register`, data)
  },

  registerWithGoogle: (data) => {
    return instance.post(`/${model}/register/with-google`, data)
  },

  loginWithGoogle: (sub) => {
    return instance.post(`/${model}/auth/login/with-google`, { sub })
  },

  // Actualizar información con imagen
  updateWithImage: (data, id) => {
    return instance.put(`/${model}/update/with-image/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  // Actualizar sin imagen
  updateWithoutImage: (data, id) => {
    return instance.put(`/${model}/update/without-image/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default userApi
