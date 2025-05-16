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

  recoveryPassword: (email) => {
    return instance.post(`/${model}/recovery-code`, {
      email,
    })
  },

  changePassword: (data) => {
    return instance.put(`/${model}/change-password`, data)
  },
}

export default codeApi
