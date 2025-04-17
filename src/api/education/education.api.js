import { instance } from '../base.api'

const model = 'user-educations'

const userEducationApi = {
  getByUserId: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },
  save: (data) => {
    return instance.post(`/${model}`, data)
  },
  update: (data) => {
    return instance.put(`/${model}`, data)
  },
  delete: (id) => {
    return instance.delete(`/${model}/${id}`)
  },
}

export default userEducationApi
