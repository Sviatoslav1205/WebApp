const { pool } = require('../db/db')

const getUserByUserId = async (userId) => {
  pool.query("SELECT * FROM `Users` WHERE `user_id` = ?", [userId], (error, result) => {
    if (error) {
      console.log(error)
      // throw error
    }
    return "ffff"
  })
}

module.exports = {
  getUserByUserId
}