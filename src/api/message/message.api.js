import { instance } from '../base.api'

const model = 'messages'

const messageApi = {
  getMyMessages: (user_id) => {
    return instance.get(`/${model}/all/${user_id}`)
  },

  getConversation: (token, senderId, receiverId) => {
    return instance.get(
      `/${model}/conversation?SenderId=${senderId}&ReceiverId=${receiverId}`,
      {
        headers: {
          'x-token': token,
        },
      }
    )
  },

  sendMessage: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default messageApi
