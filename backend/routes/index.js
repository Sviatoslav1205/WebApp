const jwtToken = require('./jwtToken')
const user = require('./user')

module.exports = (app) => {
  app.use('/jwtToken', jwtToken)
  app.use('/user', user)
}