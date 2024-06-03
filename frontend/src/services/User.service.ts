import $api from "@/https"
import { AxiosResponse } from "axios"
import { GetCategoriesResponse } from "@/types/responses/GetCategoriesResponse"
import { GetProductsResponse } from "@/types/responses/GetProductsResponse"
import { ProductData } from "@/types/ProductData"

const getCategories = async (): Promise<AxiosResponse<GetCategoriesResponse>> => {
  return await $api.get<GetCategoriesResponse>('/menu/categories')
}

const getProducts = async (): Promise<AxiosResponse<GetProductsResponse>> => {
  return await $api.get<GetProductsResponse>('/menu/products')
}

const getProductsByCategory = async (categoryId: number): Promise<AxiosResponse<GetProductsResponse>> => {
  return await $api.get<GetProductsResponse>(`/menu/get-products-by-category?categoryId=${categoryId}`)
}

const pay = async (productsArray: {
  product: ProductData
  count: number
}[]): Promise<AxiosResponse> => {
  return await $api.post(`/user/pay`, {
    title: "productsArray",
    
  })
}

export default {
  getCategories,
  getProducts,
  getProductsByCategory,
  pay
}