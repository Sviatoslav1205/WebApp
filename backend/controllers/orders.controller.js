const ordersService = require('../services/orders.service')

const createOrder = async (req, res, next) => {
  try {
    const { userId, orderStatus, orderDate, products } = req.body
    // const { userId, orderStatus, slug, products } = req.body
    // console.log(userId, orderStatus, slug, products)
    ordersService.createOrder(userId, orderStatus, orderDate, products)
    // ordersService.createOrder(userId, orderStatus, slug, products)
    // return res.json(userData)
  } catch (e) {
    next(e)
  }
}

const getOrders = async (req, res, next) => {
  try {
    const orders = await ordersService.getOrders()
    return res.json({orders: orders})
  } catch (e) {
    next(e)
  }
}

const getOrderData = async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const orderData = await ordersService.getOrderData(orderId)
    return res.json(orderData)
  } catch (e) {
    next(e)
  }
}

const changeOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const orderStatus = req.body.orderStatus
    const result = await ordersService.changeOrderStatus(orderId, orderStatus)
    return res.json(result)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderData,
  changeOrderStatus
}