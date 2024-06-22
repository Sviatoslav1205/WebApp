export interface Order {
  id: number
  userId: number
  recipientName: string
  phoneNumber: string
  address: string
  orderStatus: string
  orderDate: Date
  totalPrice: number
  deliveryType: string
  shippingCost: number
}