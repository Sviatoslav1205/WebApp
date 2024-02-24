import $api from "../https"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../types/response/AuthResponse"

const login = async (userId: number, password: string): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/user/login', { userId, password })
}

const logout = async (): Promise<void> => {
  return $api.post('/user/logout')
}

export default {
  login,
  logout
}