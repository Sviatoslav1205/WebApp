const { pool } = require("../../db/db")

const addUser = async (userId) => {
  // console.log(userId)
  pool.query("INSERT IGNORE INTO `Users` (`user_id`) VALUES (?)", [userId], (error, result) => {
    if (error) {
      console.log(error)
    }
    // console.log(result)
  })
} 

const checkBirthDate = async (userId) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT \
      CASE \
        WHEN `date_of_birth` IS NULL THEN 1 \
        ELSE 0 \
      END AS 'is_date_empty' FROM `Users` WHERE `user_id` = ?", [userId], (error, result) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      // console.log(Boolean(result[0].is_date_empty))
      // console.log(result)
      
      resolve(Boolean(result[0].is_date_empty))
    })
  })
}

// const checkBirthDate = async (userId) => {
//   pool.query("SELECT \
//     CASE \
//       WHEN `date_of_birth` IS NULL THEN 1 \
//       ELSE 0 \
//     END AS 'is_date_empty' FROM `Users` WHERE `user_id` = ?", [userId], async (error, result) => {
//     if (error) {
//       console.log(error )
//     }
//     console.log(Boolean(result[0].is_date_empty))
//     return true
//     // return Boolean(result[0].is_date_empty)
//   })
// }

const addBirthDate = async (userId, date) => {
  date = date.split("T")[0]
  
  pool.query("UPDATE `Users` SET `date_of_birth` = ? WHERE `user_id` = ?", [date, userId], (error, result) => {
    if (error) {
      console.log(error)
    }
    // console.log(result)
  })
  // console.log("UPDATE `Users` SET `date_of_birth` = ? WHERE `user_id` = ?", date, userId)
}


const getRole = async (userId) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT `role` FROM `Users` WHERE `user_id` = ?", userId, (error, result) => {
      if (error) {
        console.log(error)
      }
      resolve(result[0].role)
    })
  })
}

// module.exports = pool.query("SELECT * FROM `Users` WHERE `date_of_birth` IS NULL", (error, result) => {
//   console.log(result)
// })

module.exports = {
  addUser,
  checkBirthDate,
  addBirthDate,
  getRole
}