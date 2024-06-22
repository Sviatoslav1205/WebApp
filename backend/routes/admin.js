const translit = require('../services/translit.service')
const adminController = require('../controllers/admin.controller')
const router = require('express').Router()
const multer  = require('multer')
const mailingStorage = multer.memoryStorage()
const uploadMailing = multer({ storage: mailingStorage })
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/' + req.body.categoryId)
  },
  filename: (req, file, cb) => {
    cb(null, translit(Date.now() + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8')))
  }
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" || 
    file.mimetype === "image/svg+xml" || 
    file.mimetype === "image/webp" 
  ) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}
const uploadProduct = multer({ storage: productStorage, fileFilter: fileFilter })

router.get('/get-users', adminController.getUsers)
router.put('/change-role/:userId', adminController.changeRole)
router.post('/generate-password/:userId', adminController.generatePassword)
router.post('/send-mailing', uploadMailing.single('image'), adminController.sendMailing)

router.post('/category', adminController.createCategory)
router.put('/category/:id', adminController.editCategory)
router.delete('/category/:id', adminController.deleteCategory)

router.post('/product', uploadProduct.single('photo'), adminController.createProduct)
router.put('/product/:id', uploadProduct.single('photo'), adminController.editProduct)
router.delete('/product/:id', adminController.deleteProduct)

module.exports = router