import { Order } from "@/types/Order"
import { ProductData } from "@/types/ProductData"

export interface GetOrderDataResponse {
  orderInfo: Order
  orderProducts: {product: ProductData, count: number}[]
}