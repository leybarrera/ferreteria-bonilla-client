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

  getById: (token, id) => {
    return instance.get(`/${model}/postulation/${id}`, {
      headers: {
        'x-token': token,
      },
    })
  },

  applyJob: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        'x-token': token,
      },
    })
  },

  cancelApplyJob: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        'x-token': token,
      },
    })
  },

  updatePostulation: (token, data, id) => {
    console.log(token, data, id)
    return instance.put(`/${model}/update-postulation/${id}`, data, {
      headers: {
        'x-token': token,
      },
    })
  },

  deletePostulation: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default postulationApi
