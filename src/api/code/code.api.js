import { instance } from '../base.api'

const model = 'codes'

const codeApi = {
  validateAccount: (email, code) => {
    return instance.post(`/${model}/validate`, {
      email,
      code,
    })
  },

  resendCode: (email, type) => {
    return instance.put(`/${model}/update`, {
      email,
      type,
    })
  },
}

export default codeApi
