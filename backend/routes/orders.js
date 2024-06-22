const ordersController = require('../controllers/orders.controller')
const userRoleMiddleware = require('../middlewares/userRole.middleware')
const router = require('express').Router()

router.post('/create-order', ordersController.createOrder)
router.get('/', userRoleMiddleware(['admin', 'support', 'manager']), ordersController.getOrders)
router.get('/:orderId', userRoleMiddleware(['admin', 'support', 'manager']), ordersController.getOrderData)
router.put('/:orderId', userRoleMiddleware(['admin', 'support', 'manager']), ordersController.changeOrderStatus)

module.exports = router