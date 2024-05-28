import $api from "@/https"
import { AxiosResponse } from "axios"
import { GetUsersResponse } from "@/types/responses/GetUsersResponse"
import { GeneratePasswordResponse } from "@/types/responses/GeneratePasswordResponse"
import { CreateCategoryResponse } from "@/types/responses/CreateCategoryResponse"

const getUsers = async (): Promise<AxiosResponse<GetUsersResponse>> => {
  return await $api.get<GetUsersResponse>('/admin/get-users')
}

const changeUserRole = async (adminId: number, userId: number, role: string | null): Promise<AxiosResponse> => {
  // return await $api.put(`/admin/change-role/${userId}?adminId=${adminId}&newRole=${role || ''}`)
  return await $api.put(`/admin/change-role/${userId}`, {
    adminId: adminId, 
    newRole: role || ''
  })
}

const generatePassword = async (userId: number): Promise<AxiosResponse<GeneratePasswordResponse>> => {
  return await $api.post<GeneratePasswordResponse>(`/admin/generate-password/${userId}`)
}

const sendMailing = async (formaData: FormData): Promise<AxiosResponse> => {
  return await $api.post(`/admin/send-mailing`, formaData)
}

const createCategory = async (categoryName: string): Promise<AxiosResponse<CreateCategoryResponse>> => {
  return await $api.post<CreateCategoryResponse>(`/admin/category`, { categoryName: categoryName })
}

const editCategory = async (categoryId: number, categoryName: string): Promise<AxiosResponse> => {
  return await $api.put(`/admin/category/${categoryId}`, {name: categoryName})
}

const deleteCategory = async (categoryId: number): Promise<AxiosResponse> => {
  return await $api.delete(`/admin/category/${categoryId}`)
}

const createProduct = async (formaData: FormData): Promise<AxiosResponse> => {
  return await $api.post(`/admin/product`, formaData)
}

const editProduct = async (formaData: FormData): Promise<AxiosResponse> => {
  return await $api.put(`/admin/product/${formaData.get('id')}`, formaData)
}

const deleteProduct = async (productId: number): Promise<AxiosResponse> => {
  return await $api.delete(`/admin/product/${productId}`)
}

export default {
  getUsers,
  changeUserRole,
  generatePassword,
  sendMailing,
  createCategory,
  editCategory,
  deleteCategory,
  createProduct,
  editProduct,
  deleteProduct
}