const { pool } = require("../../db/db")

const addUser = async (userId) => {
  pool.query("INSERT IGNORE INTO `Users` (`user_id`) VALUES (?)", [userId])
    .catch(error => {
      console.log(error)
    })
} 

const checkBirthDate = async (userId) => {
  const [result] = await pool.query("SELECT \
    CASE \
      WHEN `date_of_birth` IS NULL THEN 1 \
      ELSE 0 \
    END AS 'is_date_empty' FROM `Users` WHERE `user_id` = ?", [userId])
    .catch(error => {
      console.log(error)
    })
    
  return(Boolean(result[0].is_date_empty))    
}

const addBirthDate = async (userId, date) => {
  date = date.split("T")[0]
  
  pool.query("UPDATE `Users` SET `date_of_birth` = ? WHERE `user_id` = ?", [date, userId])
    .catch(error => {
      console.log(error)
    })
}

module.exports = {
  addUser,
  checkBirthDate,
  addBirthDate
}