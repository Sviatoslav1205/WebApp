const jwt = require('jsonwebtoken')
const { pool } = require('../db/db')

const generateTokens = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' })
  return {
    accessToken,
    refreshToken
  }
}

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return userData
  } catch (e) {
    return null
  }
}

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    return userData
  } catch (e) {
    return null
  }
}

const saveRefreshToken = async (userId, refreshToken) => {
  await pool.query("UPDATE `Users` SET `refresh_token` = ? WHERE `user_id` = ?", [refreshToken, userId])
}

const removeRefreshToken = async (refreshToken) => {
  await pool.query("UPDATE `Users` SET `refresh_token` = NULL WHERE `refresh_token` = ?", [refreshToken])
}

const findRefreshToken = async (refreshToken) => {
  return await pool.query("SELECT * FROM `Users` WHERE `refresh_token` = ?", [refreshToken])
}

module.exports = {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  saveRefreshToken,
  removeRefreshToken,
  findRefreshToken
}