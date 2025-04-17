import { instance } from '../base.api'

const model = 'notifications'

const notificationApi = {
  getAllByUserId: (user_id) => {
    return instance.get(`/${model}/${user_id}`)
  },
}

export default notificationApi
