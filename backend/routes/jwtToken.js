const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', async (req, res) => {
  // console.log(req.baseUrl)
  const { userId } = req.body
  const user = await getUserByUserId(userId)

  res.json({success: true})
})

module.exports = router