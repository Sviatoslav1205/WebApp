module.exports = (BOT_TOKEN) => {
  const TelegramApi = require('node-telegram-bot-api')
  const bot = new TelegramApi(BOT_TOKEN, {polling: true})

  bot.on('message', (msg) => {
    console.log(msg)
  })
}