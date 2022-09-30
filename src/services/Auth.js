export const setAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken) // make up your own token
}

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken) // make up your own token
}

export const fetchAccessToken = () => {
  return localStorage.getItem('accessToken')
}

export const fetchRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

export const removeToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
