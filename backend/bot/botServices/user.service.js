const { pool } = require("../../db/db")

const addUser = async (userId) => {
  // console.log(userId)
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

// const getRole = async (userId) => {
//   return new Promise((resolve, reject) => {
//     pool.query("SELECT `role` FROM `Users` WHERE `user_id` = ?", userId, (error, result) => {
//       if (error) {
//         console.log(error)
//       }
//       resolve(result[0].role)
//     })
//   })
// }

// module.exports = pool.query("SELECT * FROM `Users` WHERE `date_of_birth` IS NULL", (error, result) => {
//   console.log(result)
// })

module.exports = {
  addUser,
  checkBirthDate,
  addBirthDate,
  // getRole
}