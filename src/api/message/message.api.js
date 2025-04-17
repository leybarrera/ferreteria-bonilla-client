import { instance } from '../base.api'

const model = 'messages'

const messageApi = {
  getMyMessages: (user_id) => {
    return instance.get(`/${model}/all/${user_id}`)
  },
}

export default messageApi
