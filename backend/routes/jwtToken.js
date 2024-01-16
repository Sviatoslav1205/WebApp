const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/', async (req, res) => {
  // console.log(req.baseUrl)
  const { userId } = req.body
  const user = await userController.getUserByUserId(userId)

  console.log(user)

  res.json({success: true})
})

module.exports = router