require('dotenv').config()
console.log(process.env)
const express = require('express');
const app = express();
const port = process.env.PORT || 2000;

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested_With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// require('./routes')(app);

app.get("/", (req, res) => {
  res.json({f: "ff"});
})

app.listen(port, () => {
    console.log('Express server working on port: ', port);
});