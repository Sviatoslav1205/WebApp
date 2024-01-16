const { pool } = require('../db/db')

const convertDateToLocalTimezone = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset()*60000)
}

const getUserById = async (userId) => {
  const [result] = await pool.query("SELECT * FROM `Users` WHERE `user_id` = ?", [userId])
    .catch(error => {
      console.log(error)
    })

  result[0].date_of_birth = convertDateToLocalTimezone(result[0].date_of_birth)
  
  return result[0]
}

module.exports = {
  getUserById
}