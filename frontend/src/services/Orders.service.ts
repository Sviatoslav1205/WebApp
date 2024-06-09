import $api from "@/https"
import { AxiosResponse } from "axios"
import { GetOrdersResponse } from "@/types/responses/GetOrdersResponse"
import { ProductData } from "@/types/ProductData"
import { GetOrderDataResponse } from "@/types/responses/GetOrderDataResponse"

const createOrder = async (userId: number, orderStatus: string, orderDate: string, basketProducts: {
  product: ProductData
  count: number
}[]): Promise<AxiosResponse> => {
  return await $api.post('/orders/create-order', {
    userId: userId,
    orderStatus: orderStatus,
    orderDate: orderDate,
    products: basketProducts
  })
}

const getOrders = async (): Promise<AxiosResponse<GetOrdersResponse>> => {
  return await $api.get<GetOrdersResponse>('/orders')
}

const getOrderData = async (orderId: number): Promise<AxiosResponse<GetOrderDataResponse>> => {
  return await $api.get<GetOrderDataResponse>(`/orders/${orderId}`)
}

const changeOrderStatus = async (orderId: number, orderStatus: string): Promise<AxiosResponse> => {
  return await $api.put(`/orders/${orderId}`, {orderStatus: orderStatus})
}

export default {
  createOrder,
  getOrders,
  getOrderData,
  changeOrderStatus
}