import axios from 'axios'
import { AuthResponse } from '@/types/responses/AuthResponse'

export const API_URL = 'https://192.168.0.102:8000/api'
export const IMAGES_URL = 'https://192.168.0.102:8000/images'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

$api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalRequest = error.config
  if(error.response.status == 401) {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh-token`, { withCredentials: true })
      localStorage.setItem('accessToken', response.data.accessToken)
      return $api.request(originalRequest) 
    } catch (e) {
      console.log("Користувач не авторизований");
    }
  } else {
    return Promise.reject(error);
  }
})

export default $api