const { USER_COMMANDS } = require('./commands')
const helpHandler = require('./commandHandlers/help.handler')
const startHandler = require('./commandHandlers/start.handler')
const supportHandler = require('./commandHandlers/support.handler')
const webAppDataHandler = require('./eventListeners/webAppData.eventListener')

const TelegramApi = require('node-telegram-bot-api')
const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new TelegramApi(BOT_TOKEN, {polling: true})

const startBot = () => {

  bot.setMyCommands(USER_COMMANDS)

  bot.setChatMenuButton({
    menu_button: JSON.stringify({
      type: 'web_app',
      text: 'Сайт',
      // web_app: {url: 'https://192.0.0.2:5173'} // Телефон
      web_app: {url: 'https://192.168.0.102:5173'} //Вайфай вдома
    })
  })

  bot.on('message', async (msg) => {
    if (msg.from.is_bot) return

    const userId = msg.from.id
    const text = msg.text
    
    if (text === '/start') {
      await startHandler(bot, msg, userId)
    } else if (text === '/help') {
      await helpHandler(bot, userId)
    } else if (text === '/support') {
      await supportHandler(bot, msg, userId)
    }
    
  })
  bot.on('web_app_data', async (data) => {
    await webAppDataHandler(bot, data)
  })
}

module.exports = {
  startBot,
  bot
}