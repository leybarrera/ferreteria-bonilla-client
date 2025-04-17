import { instance } from '../base.api'

const model = 'resumes'

const resumeApi = {
  getByUserId: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },

  saveResume: (user_id, data) => {
    return instance.post(`/${model}/upload/${user_id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  deleteResume: (UserId) => {
    return instance.delete(`/${model}/${UserId}`)
  },
}

export default resumeApi
