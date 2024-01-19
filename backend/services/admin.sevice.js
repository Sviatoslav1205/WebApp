const { pool } = require("../db/db")
const passwordGenerator = require('generate-password')
const bcrypt = require('bcrypt')

const generatePassword = async (userId) => {
  const password = passwordGenerator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true
  })
  const hashPassword = await bcrypt.hash(password, 3)
  await pool.query('UPDATE `Users` SET `password` = ? WHERE `user_id` = ?', [hashPassword, userId])
  return password
}

module.exports = {
  generatePassword
}