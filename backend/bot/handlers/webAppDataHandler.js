const user = require('../botServices/user.service')

module.exports = async (bot, data) => {
  data = JSON.parse(data.web_app_data.data)

  if (data.type === "birthDateSelect") {
    await user.addBirthDate(data.userId, data.birthDate)
    await bot.sendMessage(data.userId, "Дату усішно збережено! Для того, щоб переглянути список команд, натисніть сюди: /help", {
      "reply_markup": {
        remove_keyboard: true
      }
    })
  }
}