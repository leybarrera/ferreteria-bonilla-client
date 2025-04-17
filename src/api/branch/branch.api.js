import { instance } from '../base.api'

const model = 'branches'

const branchApi = {
  getAll: () => {
    return instance.get(`/${model}`)
  },
}

export default branchApi
