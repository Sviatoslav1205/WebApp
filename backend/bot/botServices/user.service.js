const { pool } = require("../../db/db")

const addUser = async (userId) => {
  pool.query("INSERT IGNORE INTO `Users` (`user_id`) VALUES (?)", [userId])
    .catch(error => {
      console.log(error)
    })
} 

module.exports = {
  addUser
}