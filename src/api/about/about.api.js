import { instance } from '../base.api'

const model = 'abouts'

const aboutApi = {
  getByUserId: (id) => {
    return instance.get(`/${model}/user/${id}`)
  },

  save: (data) => {
    console.log(data)
    return instance.post(`/${model}`, data)
  },

  update: (data, id) => {
    return instance.put(`/${model}/${id}`, data)
  },
}

export default aboutApi
