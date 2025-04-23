import { instance } from '../base.api'

const model = 'branches'

const branchApi = {
  getAll: () => {
    return instance.get(`/${model}`)
  },

  getById: (token, id) => {
    return instance.get(`/${model}/${id}`, {
      headers: {
        'x-token': token,
      },
    })
  },

  save: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        'x-token': token,
      },
    })
  },

  update: (token, data, id) => {
    return instance.put(`/${model}/${id}`, data, {
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

export default branchApi
