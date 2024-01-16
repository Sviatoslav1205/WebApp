// const { pool } = require('../db/db')
// // require('./bot_services/birth_check.service')
// const user = require('./botServices/user.service')

// module.exports = () => {
//   const TelegramApi = require('node-telegram-bot-api')
//   const BOT_TOKEN = process.env.BOT_TOKEN
//   const bot = new TelegramApi(BOT_TOKEN, {polling: true})

//   bot.on('message', async (msg) => {
//     // console.log(msg.web_app_data?.data)
//     if (msg.from.is_bot) return

//     const userId = msg.from.id
//     const text = msg.text
    
//     if (text === '/start') {
//       await user.addUser(userId)
//       // console.log(userId)

//       let isDateEmpty = await user.checkBirthDate(userId)
//       // console.log(isDateEmpty)
//       // let f = user.checkBirthDate(userId)
//       // console.log(await user.checkBirthDate(userId))

//       if (isDateEmpty) {
//         await bot.sendMessage(msg.chat.id, `Привіт, ${msg.chat.first_name}. Вкажи свою дату народження, ` +
//           `натиснувши кнопку нижче. Це дасть змогу у майбутньому отримати знижку 10% на замовлення.`, {
//           "reply_markup": {
//             "resize_keyboard": true,
//             "keyboard": [[ 
//             {
//               text: "Вказати дату народження",
//               web_app: {url: "https://192.168.0.107:5173/birh-date-select/"+userId}     // Село
//               // web_app: {url: `https://192.168.0.107:5173/birh-date-select/${userId}`}     // Село
//               // web_app: {url: "https://192.168.0.102:5173/birh-date-select/"+userId}  // Львів
//             }]]
//           }
//         });
//       } else {
//         await bot.sendMessage(msg.chat.id, `З поверненням, ${msg.chat.first_name}!`, {
//           "reply_markup": {
//             remove_keyboard: true
//           }
//         })
//       }
//     }
//     // await bot.sendMessage(msg.chat.id, msg.text)
//     // if (text.startsWith('/dateOfBirth')) {
//     //   user.addBirthDate(userId, text.split(' ')[1])
//     // }
//     // if (msg.web_app_data) {
//     //   console.log("fff")
//     // }
//   })
//   bot.on('web_app_data', async (data) => {
//     data = JSON.parse(data.web_app_data.data)

//     if (data.type === "birthDateSelect") {
//       await user.addBirthDate(data.userId, data.birthDate)
//       await bot.sendMessage(data.userId, "Дату усішно збережено!", {
//         "reply_markup": {
//           remove_keyboard: true
//         }
//       })
//     }
//   })
// }

const { USER_COMMANDS } = require('./commands')
const helpHandler = require('./commandHandlers/help.handler')
// require('./bot_services/birth_check.service')
const startHandler = require('./commandHandlers/start.handler')
const supportHandler = require('./commandHandlers/support.handler')
const webAppDataHandler = require('./eventListeners/webAppData.eventListener')

module.exports = () => {
  const TelegramApi = require('node-telegram-bot-api')
  const BOT_TOKEN = process.env.BOT_TOKEN
  const bot = new TelegramApi(BOT_TOKEN, {polling: true})

  bot.setMyCommands(USER_COMMANDS)

  // bot.setChatMenuButton({
  //   menu_button: JSON.stringify({
  //     type: 'web_app',
  //     text: 'Сайт',
  //     web_app: {url: 'https://facebook.com'}
  //   })
  // })

  bot.on('message', async (msg) => {
    // console.log(msg.web_app_data?.data)
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