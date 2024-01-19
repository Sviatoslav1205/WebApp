const userController = require('../controllers/user.controller')
const router = require('express').Router()

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh-token', userController.refresh)

module.exports = router