const { pool } = require('../db/db')
const ApiError = require('../exceptions/api.error')
const UserDto = require('../dtos/user.dto')
const bcrypt = require('bcrypt')
const tokenService = require('../services/token.service')

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

module.exports = {
  login,
  logout,
  refresh,
  getUserById
}