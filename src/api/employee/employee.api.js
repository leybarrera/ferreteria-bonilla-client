import { instance } from '../base.api'

const model = 'employees'

const employeeApi = {
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
