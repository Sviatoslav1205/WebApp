const { pool } = require('../db/db')
const ApiError = require('../exceptions/api.error')
const UserDto = require('../dtos/user.dto')
const bcrypt = require('bcrypt')
const tokenService = require('../services/token.service')
const bot = require('../bot').bot

const login = async (userId, password) => {
  const user = await getUserById(userId)
  if (!user) {
    throw ApiError.BadRequest('Такого користувача не існує')
  }

  const isPasswordEquals = await bcrypt.compare(password, user.password)
  if (!isPasswordEquals) {
    throw ApiError.BadRequest('Неправильний пароль')
  }

  const userDto = new UserDto(user)
  const tokens = await tokenService.generateTokens({ ...userDto })
  await tokenService.saveRefreshToken(user.user_id, tokens.refreshToken)

  return { 
    ...tokens,
    user: userDto
  }
}

const logout = async (refreshToken) => {
  await tokenService.removeRefreshToken(refreshToken)
}

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const userData = tokenService.validateRefreshToken(refreshToken)
  const refreshTokenFromDb = await tokenService.findRefreshToken(refreshToken) 
  if (!userData || !refreshTokenFromDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await getUserById(userData.userId)
  const userDto = new UserDto(user)
  const tokens = await tokenService.generateTokens({...userDto})
  await tokenService.saveRefreshToken(user.user_id, tokens.refreshToken)

  return { 
    ...tokens,
    user: userDto
  }
}

const getUserById = async (userId) => {
  const [result] = await pool.query("SELECT * FROM `Users` WHERE `user_id` = ?", [userId])
    .catch(error => {
      console.log(error)
    })

  return result[0]
}

const createInvoice = async (title, description, payload, prices, photoUrl) => {
  // const [result] = await pool.query("SELECT * FROM `Users` WHERE `user_id` = ?", [userId])
  //   .catch(error => {
  //     console.log(error)
  //   })

  // return result[0]

  // console.log(await bot.createInvoiceLink({
  //   title: title, 
  //   description: description, 
  //   payload: payload, 
  //   currency: 'UAH', 
  //   prices: prices, 
  //   photo_url: photoUrl
  // }))

  // console.log (
  //   await bot.createInvoiceLink({
  //     title: "Оплата замовлення", 
  //     description: "Будь ласка, перевірте правильність складу замовлення та заповніть усі поля нижче", 
  //     payload: new Date(), 
  //     provider_token: process.env.PAYMENT_TOKEN, 
  //     currency: 'UAH', 
  //     prices: [ { label: 'Макарон', amount: 200 }, { label: 'Картопля', amount: 15000 } ],
  //     photo_url: 'https://192.168.0.102:8000/images/solohaImage.png'}

  //   )
  // )
  const invoice = {
    // provider_token: process.env.PAYMENT_TOKEN,
    // start_parameter: 'online_conslutation',
    // title: 'Онлайн консультация Айболит',
    // description: 'Проведение Онлайн консультации с врачем. Стоимость 1000 рублей. Длительность 1час',
    // currency: 'RUB',
    // photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThWVMksAXRtRQJn3oHFWyz9FMusRty4pQX5Iobe8OfMEJmRzpD&usqp=CAU',
    // need_shipping_address: false,
    // is_flexible: true,
    // photo_width: 200,
    // photo_height: 200,
    // prices: [
    //     { label: 'Онлайн консультация', amount: 100 }
    // ],
    // payload: {}
    
    
    
    // provider_token: process.env.PAYMENT_TOKEN,
    // start_parameter: 'online_conslutation',
    // title: 'Онлайн консультация Айболит',
    // description: 'Проведение Онлайн консультации с врачем. Стоимость 1000 рублей. Длительность 1час',
    // currency: 'RUB',
    // photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThWVMksAXRtRQJn3oHFWyz9FMusRty4pQX5Iobe8OfMEJmRzpD&usqp=CAU',
    // need_shipping_address: false,
    // is_flexible: true,
    // photo_width: 200,
    // photo_height: 200,
    // prices: [
    //     { label: 'Онлайн консультация', amount: 10000 } // Amount should be in the smallest unit of the currency (1000 rubles = 100000 kopecks)
    // ],
    // payload: {}


    // provider_token: process.env.PAYMENT_TOKEN,
    // start_parameter: 'online_consultation',
    // title: 'Онлайн консультация Айболит',
    // description: 'Проведение Онлайн консультации с врачем. Стоимость 1000 рублей. Длительность 1 час',
    // currency: 'RUB',
    // photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThWVMksAXRtRQJn3oHFWyz9FMusRty4pQX5Iobe8OfMEJmRzpD&usqp=CAU',
    // need_shipping_address: false,
    // is_flexible: true,
    // photo_width: 200,
    // photo_height: 200,
    // prices: [
    //     { label: 'Онлайн консультация', amount: 100000 } // 1000 RUB = 100000 kopecks
    // ],
    // payload: 'online_consultation_payload'
  //   title: 'Онлайн консультация Айболит',
  // description: 'Проведение Онлайн консультации с врачом. Стоимость 1000 рублей. Длительность 1час',
  // currency: 'RUB',
  // prices: [{ label: 'Онлайн консультация', amount: 1000 }],
};

  console.log (
    await bot.createInvoiceLink(
      title="Оплата замовлення", 
      description="Будь ласка, перевірте правильність складу замовлення та заповніть усі поля нижче", 
      payload=new Date(), 
      provider_token=process.env.PAYMENT_TOKEN, 
      currency='UAH', 
      prices=[ { label: 'Макарон', amount: 200 }, { label: 'Картопля', amount: 15000 } ],
      {
        // photo_url:'https://drive.google.com/uc?id=1ybmt3-gKbNuubCAvipTPw9WqNxFH2_F2',
        // photo_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThWVMksAXRtRQJn3oHFWyz9FMusRty4pQX5Iobe8OfMEJmRzpD&usqp=CAU',
        // photo_url:'https://ibb.co/2MjRdkT',
        // photo_url:'https://ibb.co/2MjRdkT',
        // photo_url:'https://ideyka.com.ua',
        // photo_url:'https://ideyka.com.ua/files/resized/products/2857.1800x1800w.jpg',
        // photo_url:'https://drive.usercontent.google.com/download?id=1ybmt3-gKbNuubCAvipTPw9WqNxFH2_F2&authuser=0',
        // photo_url:'https://ibb.co/jM3Kphg',
        // photo_url:'https://192.168.0.102:8000/images/7/med.jpg',
        photo_url:'https://github.com/Sviatoslav1205/WebApp/blob/main/backend/public/images/solohaImage.png',
        // photo_url:'https://192.168.0.102:8000/images/solohaImage%201.png',
        photo_width: 231,
        photo_height: 241,
        need_name: true
      }

    )
    
    // await bot.createInvoiceLink(invoice)
  )
}

module.exports = {
  login,
  logout,
  refresh,
  getUserById,
  createInvoice
}