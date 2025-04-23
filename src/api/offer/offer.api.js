import { instance } from '../base.api'

const model = 'job-offers'

const jobOffersApi = {
  getAll: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default jobOffersApi
