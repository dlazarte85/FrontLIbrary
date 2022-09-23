export const setToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken) // make up your own token
}

export const fetchToken = () => {
  return localStorage.getItem('accessToken')
}

export const removeToken = () => {
  localStorage.removeItem('accessToken')
}
