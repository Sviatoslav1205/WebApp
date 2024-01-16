const { pool } = require('../db/db')

const getUserByUserId = async (userId) => {
  pool.query("SELECT * FROM `Users` WHERE `user_id` = ?", userId, (err, res) => {
    
  })
}

module.exports = {
  getUserByUserId
}