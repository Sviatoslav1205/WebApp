const { pool } = require('../db/db')
// require('./bot_services/birth_check.service')
const user = require('./botServices/user.service')

module.exports = () => {
  const TelegramApi = require('node-telegram-bot-api')
  const BOT_TOKEN = process.env.BOT_TOKEN
  const bot = new TelegramApi(BOT_TOKEN, {polling: true})

  bot.on('message', async (msg) => {
    console.log(msg)
    if (msg.from.is_bot) return

    const userId = msg.from.id
    const chatId = msg.chat.id
    const text = msg.text
    
    if (text === '/start') {
      user.addUser(userId)
      console.log(userId)

      bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
          "resize_keyboard": true,
          "one_time_keyboard": true,
          "keyboard": [["Sample text", 
          {
            text: "Second sample",
            web_app: {url: "https://localhost:5173/"}
          }]]
        }
      });
        
    }
    await bot.sendMessage(msg.chat.id, msg.text)
    if (text.startsWith('/dateOfBirth')) {
      user.addBirthDate(userId, text.split(' ')[1])
    }
  })
}