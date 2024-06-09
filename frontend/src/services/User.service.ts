import $api from "@/https"
import { AxiosResponse } from "axios"
import { GetCategoriesResponse } from "@/types/responses/GetCategoriesResponse"
import { GetProductsResponse } from "@/types/responses/GetProductsResponse"
import { ProductData } from "@/types/ProductData"
import { CreateInvoiceLinkResponse } from "@/types/responses/CreateInvoiceLinkResponse"

const getCategories = async (): Promise<AxiosResponse<GetCategoriesResponse>> => {
  return await $api.get<GetCategoriesResponse>('/menu/categories')
}

const getProducts = async (): Promise<AxiosResponse<GetProductsResponse>> => {
  return await $api.get<GetProductsResponse>('/menu/products')
}

const getProductsByCategory = async (categoryId: number): Promise<AxiosResponse<GetProductsResponse>> => {
  return await $api.get<GetProductsResponse>(`/menu/get-products-by-category?categoryId=${categoryId}`)
}

const createInvoiceLink = async (orderDate: string, productsArray: {
  product: ProductData
  count: number
}[]): Promise<AxiosResponse<CreateInvoiceLinkResponse>> => {
  return await $api.post<CreateInvoiceLinkResponse>(`/user/create-invoice-link`, {
    prices: productsArray.map(element => {
      return {
        label: element.product.name.length > 19 ? element.product.name.slice(0, 19)+'...' : element.product.name,
        amount: element.product.price * element.count * 100
      }
    }),
    payload: orderDate
  })
}

export default {
  getCategories,
  getProducts,
  getProductsByCategory,
  createInvoiceLink
}