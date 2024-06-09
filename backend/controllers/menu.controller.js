const ApiError = require('../exceptions/api.error')
const menuService = require('../services/menu.service')

const getCategories = async (req, res, next) => {
  try {
    const categories = await menuService.getCategories()
    res.json({categories: categories.map(({category_id: id_value, category: value}) => ({id: id_value, name: value}))})
  } catch (e) {
    next(e)
  }
}

const getProducts = async (req, res, next) => {
  try {
    const products = await menuService.getProducts()
    res.json({products})
  } catch (e) {
    next(e)
  }
}

const getProductsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.query.categoryId
    const products = await menuService.getProductsByCategory(categoryId)
    res.json({products})
  } catch (e) {
    next(e)
  }
}


module.exports = {
  getCategories,
  getProducts,
  getProductsByCategory
}