const router = require('express').Router()
const userRoleMiddleware = require('../middlewares/userRole.middleware')
const admin = require('./admin')
const user = require('./user')
const menu = require('./menu')

router.use('/admin', userRoleMiddleware(['admin']), admin)
router.use('/menu', menu)
router.use('/user', user)

module.exports = router