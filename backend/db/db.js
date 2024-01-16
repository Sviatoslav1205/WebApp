const mysql = require('mysql2/promise')

module.exports.pool = pool = mysql.createPool({
  connectionLimit : 5,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  password: process.env.DATABASE_USER_PASSWORD
})  

module.exports.endPool = () => {
  pool.end(err => {
    if(err) {
      console.log(err)
    } else {
      console.log('Connection is Closed!')
    }
  })
}