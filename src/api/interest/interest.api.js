import { instance } from '../base.api'

const model = 'interests'

const interestApi = {
  getByUserId: (token, UserId) => {
    return instance.get(`/${model}/user/${UserId}`, {
      headers: {
        'x-token': token,
      },
    })
  },
  follow: (token, UserId, BranchId) => {
    return instance.post(
      `/${model}/`,
      {
        UserId,
        BranchId,
      },
      {
        headers: {
          'x-token': token,
        },
      }
    )
  },

  unFollow: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default interestApi
