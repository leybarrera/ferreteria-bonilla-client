import { instance } from '../base.api'

const model = 'users'

const userApi = {
  getAllUsers: (token) => {
    return instance.get(`/${model}/all/users`, {
      headers: {
        'x-token': token,
      },
    })
  },

  getById: (id) => {
    return instance.get(`/${model}/${id}`)
  },

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

  validateAccount: (token, id, value) => {
    return instance.put(
      `${model}/validate-account/${id}`,
      {
        isDataValidated: value,
      },
      {
        headers: {
          'x-token': token,
        },
      }
    )
  },

  deleteUser: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default userApi
