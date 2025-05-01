import { instance } from '../base.api'

const model = 'job-offers'

const jobOffersApi = {
  create: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        'x-token': token,
      },
    })
  },

  getAll: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        'x-token': token,
      },
    })
  },

  geByBranchId: (token, id) => {
    return instance.get(`/${model}/branch/${id}`, {
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

export default jobOffersApi
