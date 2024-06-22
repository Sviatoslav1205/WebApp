const menuController = require('../controllers/menu.controller')
const router = require('express').Router()

router.get('/categories', menuController.getCategories)
router.get('/products', menuController.getProducts)
router.get('/get-products-by-category', menuController.getProductsByCategory)

module.exports = router