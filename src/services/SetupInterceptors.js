import Api from './Api'
import { removeToken } from './Auth'

const SetupInterceptors = (navigate) => {
  Api.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response
    },
    (error) => {
      // Do something with response error
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          removeToken()
          navigate('/login')
        }
      }
      return Promise.reject(error)
    },
  )
}

export default SetupInterceptors
