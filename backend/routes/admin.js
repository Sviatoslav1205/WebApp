const adminController = require('../controllers/admin.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const userRoleMiddleware = require('../middlewares/userRole.middleware')
const router = require('express').Router()

// router.post('/generate-password/:userId', authMiddleware, adminController.generatePassword)
router.post('/generate-password/:userId', userRoleMiddleware('admin'), adminController.generatePassword)

module.exports = router