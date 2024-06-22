const adminService = require('../services/admin.service')

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getUsers()
    res.json({
      users: users
    })
  } catch (e) {
    next(e)
  }
}

const changeRole = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const adminId = req.body.adminId
    const newRole = req.body.newRole
    const result = await adminService.changeRole(adminId, userId, newRole)
    res.json({
      ...result[0]
    })
  } catch (e) {
    next(e)
  }
}

const generatePassword = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const password = await adminService.generatePassword(userId)
    res.json({
      message: 'Пароль успішно згенеровано!',
      password: password
    })
  } catch (e) {
    next(e)
  }
}

const sendMailing = async (req, res, next) => {
  try {
    const image = req.file ? new Blob([req.file.buffer]) : null
    const title = req.body.title
    const message = req.body.message
    const result = await adminService.sendMailing(title, image, message)
    res.json({
      result
    })
  } catch (e) {
    next(e)
  }
}

const createCategory = async (req, res, next) => {
  try {
    const categoryName = req.body.categoryName
    const result = await adminService.createCategory(categoryName)
    res.json({
      category: result
    })
  } catch (e) {
    next(e)
  }
}

const editCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id
    const newCategoryName = req.body.name
    const result = await adminService.editCategory(categoryId, newCategoryName)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id
    const result = await adminService.deleteCategory(categoryId)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const photoName = req.file.filename
    const { categoryId, name, price, weight, description } = req.body
    const result = await adminService.createProduct(categoryId, name, photoName, price, weight, description)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

const editProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const photoName = req.file ? req.file.filename : req.body.photo
    const { categoryId, name, price, weight, description } = req.body
    const oldPhotoPath = req.body.oldPhotoPath ? req.body.oldPhotoPath : null
    const result = await adminService.editProduct(id, categoryId, name, photoName, oldPhotoPath, price, weight, description)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await adminService.deleteProduct(id)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getUsers,
  changeRole,
  generatePassword,
  sendMailing,
  createCategory,
  editCategory,
  deleteCategory,
  createProduct,
  editProduct,
  deleteProduct
}