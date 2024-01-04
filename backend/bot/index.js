const { pool } = require('../db/db')
// require('./bot_services/birth_check.service')
const user = require('./botServices/user.service')

module.exports = () => {
  const TelegramApi = require('node-telegram-bot-api')
  const BOT_TOKEN = process.env.BOT_TOKEN
  const bot = new TelegramApi(BOT_TOKEN, {polling: true})

  bot.on('message', async (msg) => {
    // console.log(msg.web_app_data?.data)
    if (msg.from.is_bot) return

    const userId = msg.from.id
    const text = msg.text
    
    if (text === '/start') {
      user.addUser(userId)
      console.log(userId)

      bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
          "resize_keyboard": true,
          // "one_time_keyboard": true,
          "keyboard": [[ 
          {
            text: "Вказати дату народження",
            web_app: {url: "https://192.168.0.107:5173/birh-date-select/"+userId}     // Село
            // web_app: {url: "https://192.168.0.102:5173/birh-date-select/"+userId}  // Львів
          }]]
        }
      });
        
    }
    // await bot.sendMessage(msg.chat.id, msg.text)
    // if (text.startsWith('/dateOfBirth')) {
    //   user.addBirthDate(userId, text.split(' ')[1])
    // }
    // if (msg.web_app_data) {
    //   console.log("fff")
    // }
  })
  bot.on('web_app_data', async (data) => {
    console.log(JSON.parse(data.web_app_data.data))
  })
}