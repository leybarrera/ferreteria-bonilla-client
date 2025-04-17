import { instance } from '../base.api'

const model = 'job-applications'

const postulationApi = {
  getByUserId: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },
}

export default postulationApi
