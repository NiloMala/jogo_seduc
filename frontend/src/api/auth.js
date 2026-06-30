import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const login = (email, password) =>
  api.post('/api/auth/login', { email, password })

export const register = (data) =>
  api.post('/api/auth/register', data)

export const logout = () =>
  api.post('/api/auth/logout')

export default api
