const support = require('../botServices/support.service')

module.exports = async (bot, userId) => {
  // await support.getAllSupports()
  console.log(await support.getAvaibleSupports())
  support.changeSupportStatus(703081097)
}