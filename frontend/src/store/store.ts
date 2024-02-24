import { makeAutoObservable } from "mobx"
import { IUser } from "../types/IUser"
import AuthService from "../services/Auth.service"
import axios from "axios"
import { AuthResponse } from "../types/response/AuthResponse"
import { API_URL } from "../https"

export default class Store {
  userId = 0
  user = {} as IUser
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUserId(userId: number) {
    this.userId = userId
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async login(userId: number, password: string) {
    try {
      const response = await AuthService.login(userId, password)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('accessToken')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh-token`, { withCredentials: true })
      console.log(response)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}