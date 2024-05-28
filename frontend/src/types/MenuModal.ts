import { ProductData } from "./ProductData"

export interface MenuModal {
  type: 'changeName' | 'product' | null
  show: boolean
  productData?: ProductData
}