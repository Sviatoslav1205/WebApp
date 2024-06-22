const { pool } = require('../db/db')
const ApiError = require('../exceptions/api.error')
const UserDto = require('../dtos/user.dto')
const bcrypt = require('bcrypt')
const tokenService = require('../services/token.service')
const bot = require('../bot').bot

const login = async (userId, password) => {
  const user = await getUserById(userId)
  if (!user) {
    throw ApiError.BadRequest('Такого користувача не існує')
  }

  const isPasswordEquals = await bcrypt.compare(password, user.password)
  if (!isPasswordEquals) {
    throw ApiError.BadRequest('Неправильний пароль')
  }

  const userDto = new UserDto(user)
  const tokens = await tokenService.generateTokens({ ...userDto })
  await tokenService.saveRefreshToken(user.user_id, tokens.refreshToken)

  return { 
    ...tokens,
    user: userDto
  }
}

const logout = async (refreshToken) => {
  await tokenService.removeRefreshToken(refreshToken)
}

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const userData = tokenService.validateRefreshToken(refreshToken)
  const refreshTokenFromDb = await tokenService.findRefreshToken(refreshToken) 
  if (!userData || !refreshTokenFromDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await getUserById(userData.userId)
  const userDto = new UserDto(user)
  const tokens = await tokenService.generateTokens({...userDto})
  await tokenService.saveRefreshToken(user.user_id, tokens.refreshToken)

  return { 
    ...tokens,
    user: userDto
  }
}

const getUserById = async (userId) => {
  const [result] = await pool.query("SELECT * FROM `Users` WHERE `user_id` = ?", [userId])
    .catch(error => {
      console.log(error)
    })

  return result[0]
}

const createInvoice = async (prices, payload) => {
  let uniqueStr = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < 5) {
    uniqueStr += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return (
    await bot.createInvoiceLink(
      title = "Оплата замовлення", 
      description = "Будь ласка, перевірте правильність складу замовлення та заповніть усі поля нижче", 
      payload = payload, 
      provider_token = process.env.PAYMENT_TOKEN, 
      currency = 'UAH', 
      prices = prices,
      {
        photo_url:'https://iili.io/JmY1gII.png',
        photo_width: 231,
        photo_height: 241,
        need_name: true,
        need_phone_number: true,
        need_shipping_address: true,
        start_parameter: uniqueStr,
        is_flexible: true
      }
    )
  )
}

module.exports = {
  login,
  logout,
  refresh,
  getUserById,
  createInvoice
}