const user = require('../botServices/user.service')

module.exports = async (bot, msg, userId) => {
  await user.addUser(userId)
  await bot.sendMessage(msg.chat.id, `Привіт, ${msg.chat.first_name}! Ми – ресторан української кухні – "Солоха".\n` +
  `Щоб зробити замовлення, натисніть кнопку "Сайт", яка знаходиться в нижній частині екрану.\n` +
  `Для того, щоб переглянути список доступних команд, натисніть сюди: /help`, {
    "reply_markup": {
      "remove_keyboard": true
    }
  })
}