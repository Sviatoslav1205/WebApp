const router = require('express').Router()

router.get('/', async (req, res) => {
  console.log(req.baseUrl)
  res.json({success: true})
})

module.exports = router