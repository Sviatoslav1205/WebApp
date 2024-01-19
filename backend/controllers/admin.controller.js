const ApiError = require('../exceptions/api.error')
const adminService = require('../services/admin.sevice')

const generatePassword = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw ApiError.HaveNotPermission()
      // return res.status(403).json('You are not allowed to do this!')
    }
    const userId = req.params.userId
    const password = await adminService.generatePassword(userId)
    res.json({
      message: 'Пароль успішно згенеровано!',
      password: password
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  generatePassword
}