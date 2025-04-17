import { instance } from '../base.api'

const model = 'job-offers'

const jobOffersApi = {
  getAll: () => {
    return instance.get(`/${model}`)
  },
}

export default jobOffersApi
