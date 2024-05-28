const adminController = require('../controllers/admin.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const userRoleMiddleware = require('../middlewares/userRole.middleware')
const router = require('express').Router()
const multer  = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// router.post('/generate-password/:userId', authMiddleware, adminController.generatePassword)
router.get('/get-users', userRoleMiddleware(['admin']), adminController.getUsers)
router.put('/change-role/:userId', userRoleMiddleware(['admin']), adminController.changeRole)
router.post('/generate-password/:userId', userRoleMiddleware(['admin']), adminController.generatePassword)
router.post('/send-mailing', userRoleMiddleware('admin'), upload.single('image'), adminController.sendMailing)


module.exports = router