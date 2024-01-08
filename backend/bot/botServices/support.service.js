const { pool } = require("../../db/db")

let supports = []

const getAllSupports = async () => {
  pool.query("SELECT `user_id` FROM `Users` WHERE `role` = 'support'", (error, result) => {
    if (error) {
      console.log(error)
    }
    
    supports = result.map(support => {
      return {
        userId: support.user_id,
        isAvaible: true
      }
    })
  })
} 

const getAvaibleSupports = async () => {
  return supports.filter(support => support.isAvaible === true)
}

const changeSupportStatus = async (userId) => {
  let support = supports.find(support => support.userId === userId)
  support.isAvaible = !support.isAvaible
}

getAllSupports()

module.exports = {
  getAvaibleSupports,
  changeSupportStatus
}