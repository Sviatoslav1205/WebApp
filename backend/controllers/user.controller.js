const userService = require('../services/user.service')
const tokenService = require('../services/token.service')

const login = async (req, res, next) => {
  try {
    const { userId, password } = req.body
    const userData = await userService.login(userId, password)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
    return res.json(userData)
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    await userService.logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.status(200).json({status: 'Successfully'})
  } catch (e) {
    next(e)
  }
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const userData = await userService.refresh(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
    return res.json(userData)
  } catch (e) {
    next(e)
  }
}

const createInvoice = async (req, res, next) => {
  try {
    const { prices, payload } = req.body
    // console.log(payload)
    const invoiceUrl = await userService.createInvoice(prices, payload)
    // console.log(invoiceUrl)
    return res.json({invoiceUrl: invoiceUrl})
  } catch (e) {
    next(e)
  }
}

module.exports = {
  login,
  logout,
  refresh,
  createInvoice
}