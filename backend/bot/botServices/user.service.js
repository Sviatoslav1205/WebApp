const { pool } = require("../../db/db")

const addUser = (userId) => {
  console.log(userId)
  pool.query("INSERT IGNORE INTO `Users` (`user_id`) VALUES (?)", [userId], (error, result) => {
    if (error) {
      console.log(error )
    }
    console.log(result)
  })
} 

const addBirthDate = (userId, date) => {
  
  // pool.query("INSERT IGNORE INTO `Users` (`user_id`) VALUES (?)", [userId], (error, result) => {
  //   if (error) {
  //     console.log(error )
  //   }
  //   console.log(result)
  // })
  console.log("UPDATE `Users` SET `date_of_birth` = ? WHERE `user_id` = ? | ", date, " | ", userId)
}

// module.exports = pool.query("SELECT * FROM `Users` WHERE `date_of_birth` IS NULL", (error, result) => {
//   console.log(result)
// })

module.exports = {
  addUser,
  addBirthDate
}