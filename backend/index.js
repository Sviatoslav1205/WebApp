require('dotenv').config()
require('./bot').startBot()

const https = require('https')
const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routes')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/api', router)
app.use(errorMiddleware)

const options = {
    key: fs.readFileSync('../.ssl_cert/key.pem'),
    cert: fs.readFileSync('../.ssl_cert/cert.pem')
}

const PORT = process.env.SERVER_PORT || 2000

https.createServer(options, app).listen(PORT, () => {
    console.log('Express server working on port: ', PORT)
})