const adminController = require('../controllers/admin.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = require('express').Router()

router.post('/generate-password/:userId', authMiddleware, adminController.generatePassword)

module.exports = router