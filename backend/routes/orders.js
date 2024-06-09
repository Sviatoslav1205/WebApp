const ordersController = require('../controllers/orders.controller')
const userRoleMiddleware = require('../middlewares/userRole.middleware')
const router = require('express').Router()

router.post('/create-order', ordersController.createOrder)
router.get('/', userRoleMiddleware(['admin', 'support', 'manager']), ordersController.getOrders)
router.get('/:orderId', userRoleMiddleware(['admin', 'support', 'manager']), ordersController.getOrderData)
router.put('/:orderId', userRoleMiddleware(['admin', 'support', 'manager']), ordersController.changeOrderStatus)

// router.get('/products', menuController.getProducts)
// router.get('/get-products-by-category', menuController.getProductsByCategory)


// router.put('/change-role/:userId', userRoleMiddleware(['admin']), adminController.changeRole)
// router.post('/generate-password/:userId', userRoleMiddleware(['admin']), adminController.generatePassword)
// router.post('/send-mailing', userRoleMiddleware('admin'), upload.single('image'), adminController.sendMailing)


module.exports = router