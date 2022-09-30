import Api from './Api'
import { setAccessToken, removeToken, fetchRefreshToken } from './Auth'
import axios from 'axios'
import { Apiurl } from './Apiurl'

const SetupInterceptors = (navigate) => {
  Api.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response
    },
    async (error) => {
      // Do something with response error
      if (error.response) {
        let originalRequest = error.config

        const refreshToken = fetchRefreshToken()
        setAccessToken(refreshToken)
        if (refreshToken && (error.response.status === 401 || error.response.status === 403)) {
          try {
            let url = Apiurl + '/refresh'
            const response = await Api.post(url)
            if (response.status === 200) {
              const access_token = response.data.data.access_token
              setAccessToken(access_token)
              originalRequest.headers['Authorization'] = `Bearer ${access_token}`
              return axios(originalRequest)
            }
          } catch (error) {
            removeToken()
            navigate('/login')
            throw error
          }
        }
      }
      return Promise.reject(error)
    },
  )
}

export default SetupInterceptors
