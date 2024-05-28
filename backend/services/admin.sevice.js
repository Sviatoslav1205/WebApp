const { pool } = require("../db/db")
const fs = require('fs')
const path = require('path')
const UserDto = require('../dtos/user.dto')
const passwordGenerator = require('generate-password')
const bcrypt = require('bcrypt')
const ApiError = require("../exceptions/api.error")
const userRolesList = require('../static/userRolesList')
const PHOTOS_DIR = path.join(process.cwd(), 'public/images')

const getUsers = async () => {
  const [result] = await pool.query('SELECT `user_id`, `date_of_birth`, `role` FROM `Users`')
  result.forEach((user, index) => {
    result[index] = new UserDto(user)
  })
  return result
}

const changeRole = async (adminId, userId, newRole) => {
  if (adminId === userId) {
    throw ApiError.HaveNotPermission()
  }
  newRole = newRole || null
  if (!userRolesList.includes(newRole)) {
    throw ApiError.BadRequest('Такої ролі не існує')
  }

  const result = await pool.query('UPDATE `Users` SET `role` = ? WHERE `user_id` = ?', [newRole, userId])
  return result
}

const generatePassword = async (userId) => {
  if (!userId || userId === 'undefined') {
    throw ApiError.BadRequest('Користувача не вказано')
  }
  const password = passwordGenerator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true
  })
  const hashPassword = await bcrypt.hash(password, 3)
  await pool.query('UPDATE `Users` SET `password` = ? WHERE `user_id` = ?', [hashPassword, userId])
  return password
}

const sendMailing = async (title, image, message) => {
  const users = await getUsers()
  const formData = new FormData()
  formData.append('parse_mode', 'HTML')
  formData.append('chat_id', '')
  const text = `<b>${title}</b> \n${message}`
  if (image) {
    formData.append('caption', text)
    formData.append('photo', image)
    users.forEach(async user => {
      formData.set('chat_id', user.userId)
      fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: formData
      })
    })
  } else {
    formData.append('text', text)
    users.forEach(user => {
      formData.set('chat_id', user.userId)
      fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        body: formData
      })
    })
  }
  return 'Повідомлення розіслано!'
}

const createCategory = async (categoryName) => {
  await pool.query('INSERT INTO `Product_categories` (`category`) VALUES (?)', [categoryName])
    .catch(e => {
      if (e.errno === 1062) {
        throw ApiError.BadRequest('Така категорія існує!')
      }
      throw e
    })
  const [result] = await pool.query('SELECT LAST_INSERT_ID() as \'category_id\'')
  const categoryId = result[0]['category_id']
  const categoryFolderPath = path.join(PHOTOS_DIR, categoryId+'')
  fs.mkdir(categoryFolderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Не вдалося створити папку: ${categoryFolderPath}`, err)
      throw err
    }
  })
  return {
    id: categoryId,
    name: categoryName
  }
}

const editCategory = async (categoryId, newCategoryName) => {
  await pool.query('UPDATE `Product_categories` SET `category` = ? WHERE `category_id` = ?', [newCategoryName, categoryId])
    .catch(e => {
      if (e.errno === 1062) {
        throw ApiError.BadRequest('Така категорія існує!')
      }
      throw e
    })
  return 'Категорію оновлено'
}

const deleteCategory = async (categoryId) => {
  await pool.query('DELETE FROM `Product_categories` WHERE `category_id` = ?', [categoryId])
    .catch(e => {
      throw e
    })
  return 'Категорію видалено'
}

const createProduct = async (categoryId, name, photoName, price, weight, description) => {
  const result = await pool.query('INSERT INTO `Products` (`category_id`, `product_name`, `photo`, `price`, `weight`, `description`) VALUES ' +
    '(?, ?, ?, ?, ?, ?)', [categoryId, name, `${categoryId}/${photoName}`, +price, +weight, description])
    .catch(e => {
      throw e
    })
  return 'Товар додано'
}

const editProduct = async (id, categoryId, name, photoName, oldPhotoPath, price, weight, description) => {
  try {
    if (oldPhotoPath) {
      await pool.query(
        'UPDATE `Products` SET `category_id` = ?, `product_name` = ?, `photo` = ?, `price` = ?, `weight` = ?, `description` = ? WHERE `product_id` = ?',
        [categoryId, name, categoryId+'/'+photoName, price, weight, description, id]
      )
      oldPhotoPath = path.join(PHOTOS_DIR, oldPhotoPath)
      fs.unlink(oldPhotoPath, (err) => {
        if (err) {
          console.error(`Не вдалося видалити старе фото: ${oldPhotoPath}`, err);
        }
      })
    } else {
      await pool.query(
        'UPDATE `Products` SET `category_id` = ?, `product_name` = ?, `price` = ?, `weight` = ?, `description` = ? WHERE `product_id` = ?',
        [categoryId, name, price, weight, description, id]
      )
    }
  } catch (e) {
    throw e
  }
  return 'Товар змінено'
}

const deleteProduct = async (id) => {
  await pool.query('DELETE FROM `Products` WHERE `product_id` = ?', [id])
    .catch(e => {
      throw e
    })
  return 'Товар видалено'
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