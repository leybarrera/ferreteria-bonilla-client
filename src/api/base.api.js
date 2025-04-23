import axios from 'axios'
import { backendUrl } from '../config/index.config'
export const instance = axios.create({
  baseURL: backendUrl,
})
