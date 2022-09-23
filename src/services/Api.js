import axios from 'axios'
import { fetchToken } from './Auth'
import { Apiurl } from './Apiurl'

export const Api = axios.create({
  baseURL: Apiurl,
  headers: {
    'Content-Type': 'application/json',
  },
})

Api.interceptors.request.use(
  (config) => {
    const accessToken = fetchToken()

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    } else {
      delete Api.defaults.headers.common.Authorization
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

export default Api
