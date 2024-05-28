const { pool } = require("../db/db")
const ApiError = require("../exceptions/api.error")

const getCategories = async () => {
  const [result] = await pool.query('SELECT * FROM `Product_categories`')
  return result
}

const getProducts = async () => {
  const [result] = await pool.query('SELECT `product_id` AS \'id\', `category_id` AS \'categoryId\', ' + 
  '`product_name` AS \'name\', `photo`, `price`, `weight`, `description` FROM `Products`')
  return result
}

const getProductsByCategory = async (categoryId) => {
  const [result] = await pool.query('SELECT `product_id` AS \'productId\', `category_id` AS \'categoryId\', ' + 
    '`product_name` AS \'productName\', `photo`, `price`, `weight`, `description` ' + 
    'FROM `Products` WHERE `category_id` = ?', [categoryId])
  return result
}

module.exports = {
  getCategories,
  getProducts,
  getProductsByCategory
}