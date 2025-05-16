import { instance } from '../base.api'

const model = 'ia'

const iaApi = {
  evaluateApplicants: (token, data) => {
    return instance.post(`/${model}/evaluate/postulations`, data, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default iaApi
