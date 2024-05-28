const menuController = require('../controllers/menu.controller')
const userRoleMiddleware = require('../middlewares/userRole.middleware')
const router = require('express').Router()
const multer  = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.get('/categories', menuController.getCategories)
router.get('/products', menuController.getProducts)
router.get('/get-products-by-category', menuController.getProductsByCategory)
// router.put('/change-role/:userId', userRoleMiddleware(['admin']), adminController.changeRole)
// router.post('/generate-password/:userId', userRoleMiddleware(['admin']), adminController.generatePassword)
// router.post('/send-mailing', userRoleMiddleware('admin'), upload.single('image'), adminController.sendMailing)


module.exports = router