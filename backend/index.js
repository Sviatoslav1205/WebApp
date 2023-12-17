require('dotenv').config()
require('./bot')()
const {pool, endPool} = require('./db/db')

const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.SERVER_PORT || 2000

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested_With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// require('./routes')(app);

app.listen(PORT, () => {
    console.log('Express server working on port: ', PORT)
})