import { instance } from '../base.api'

const model = 'notifications'

const notificationApi = {
  getAllByUserId: (user_id) => {
    return instance.get(`/${model}/${user_id}`)
  },

  markAsRead: (id, token) => {
    return instance.put(
      `/${model}/${id}`,
      {},
      {
        headers: {
          'x-token': token,
        },
      }
    )
  },
}

export default notificationApi
