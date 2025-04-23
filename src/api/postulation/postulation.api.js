import { instance } from '../base.api'

const model = 'job-applications'

const postulationApi = {
  getByUserId: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },

  getAll: (token) => {
    return instance.get(`/${model}/all`, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default postulationApi
