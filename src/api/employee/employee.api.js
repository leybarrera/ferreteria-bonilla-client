import { instance } from '../base.api'

const model = 'employees'

const employeeApi = {
  save: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        'x-token': token,
      },
    })
  },
  getAll: (token) => {
    return instance.get(`/${model}/all`, {
      headers: {
        'x-token': token,
      },
    })
  },

  delete: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default employeeApi
