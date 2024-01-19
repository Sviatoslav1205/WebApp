require('dotenv').config()
require('./bot')()

const https = require('https')
const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use(errorMiddleware)

const options = {
    key: fs.readFileSync('../.ssl_cert/key.pem'),
    cert: fs.readFileSync('../.ssl_cert/cert.pem')
}

const PORT = process.env.SERVER_PORT || 2000

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested_With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// require('./routes')(app)

https.createServer(options, app).listen(PORT, () => {
    console.log('Express server working on port: ', PORT)
})