const { USER_COMMANDS } = require('./commands')
const helpHandler = require('./commandHandlers/help.handler')
const startHandler = require('./commandHandlers/start.handler')
const supportHandler = require('./commandHandlers/support.handler')
const webAppDataEventListener = require('./eventListeners/webAppData.eventListener')
const shippingQueryEventListener = require('./eventListeners/shippingQuery.eventListener')
const successfulPaymentEventListener = require('./eventListeners/successfulPayment.eventListener')
const deliveryService = require('./botServices/delivery.service')

const TelegramApi = require('node-telegram-bot-api')
const preCheckoutQueryEventListener = require('./eventListeners/preCheckoutQuery.eventListener')
const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new TelegramApi(BOT_TOKEN, {polling: true})

const startBot = async () => {
  const messagesId = {
    courierMessageId: 0,
    recipientMessageId: 0
  }

  // await bot.setMyCommands([])
  await bot.setMyCommands(USER_COMMANDS)
  // bot.sendMessage(703081097, "fdfsggsfhb")

  await bot.setChatMenuButton({
    menu_button: JSON.stringify({
      type: 'web_app',
      text: 'Сайт',
      web_app: {url: 'https://192.168.0.102:5173'}
    })
  })

  await bot.on('message', async (msg) => {
    if (msg.from.is_bot) return

    const userId = msg.from.id
    const text = msg.text
    
    if (text === '/start') {
      await startHandler(bot, msg, userId)
    } else if (text === '/help') {
      await helpHandler(bot, userId)
    } else if (text === '/support') {
      await supportHandler(bot, msg, userId)
    } else if (text === '/user_id') {
      await bot.sendMessage(msg.chat.id, `Ваше ID – <code>${userId}</code>\n` +
      `Для того, щоб скопіювати ID, натисніть на нього.`, {
        parse_mode: 'HTML'
      })
    }
    
  })
  // bot.on('web_app_data', async (data) => {
  //   await webAppDataEventListener(bot, data)
  // })
  await bot.on('shipping_query', async (shippingQuery) => {
    await shippingQueryEventListener(bot, shippingQuery)
  })
  await bot.on('pre_checkout_query', async (preCheckoutQuery) => {
    await preCheckoutQueryEventListener(bot, preCheckoutQuery)
  })
  await bot.on('successful_payment', async (msg) => {
    await successfulPaymentEventListener(bot, msg)
  })
  await bot.on('callback_query', async (msg) => {
    if (msg.data === "endSupportSession") {
      return
    }
    const callbackData = JSON.parse(msg.data)
    if (callbackData.action === "takeOrder") {
      const result = await deliveryService.takeOrder(bot, callbackData.orderId, msg.from.id, callbackData.msgId)
      messagesId.courierMessageId = result.courierMessageId
      messagesId.recipientMessageId = result.recipientMessageId
    } else if (callbackData.action === "deliveredOrder") {
      const result = await deliveryService.deliveredOrder(bot, callbackData.orderId, callbackData.userId, msg.from.id, messagesId)
      messagesId.courierMessageId = result.courierMessageId
      messagesId.recipientMessageId = result.recipientMessageId
    } else if (callbackData.action === "confirmDeliver") {
      await deliveryService.confirmDeliver(bot, callbackData.orderId, msg.from.id, callbackData.courierId, messagesId)
    }
  })
}

module.exports = {
  startBot,
  bot
}