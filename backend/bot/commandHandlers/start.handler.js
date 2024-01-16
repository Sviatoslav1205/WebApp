const user = require('../botServices/user.service')

module.exports = async (bot, msg, userId) => {
  await user.addUser(userId)
  // console.log(userId)

  let isDateEmpty = await user.checkBirthDate(userId)
  // console.log(isDateEmpty)
  // let f = user.checkBirthDate(userId)
  // console.log(await user.checkBirthDate(userId))

  if (isDateEmpty) {
    await bot.sendMessage(msg.chat.id, `Привіт, ${msg.chat.first_name}. Вкажіть свою дату народження, ` +
      `натиснувши кнопку нижче. Це дасть змогу у майбутньому отримати знижку 10% на замовлення.`, {
      "reply_markup": {
        "resize_keyboard": true,
        "keyboard": [[ 
        {
          text: "Вказати дату народження",
          // web_app: {url: "https://192.168.0.107:5173/birh-date-select/"+userId}     // Село
          // web_app: {url: `https://192.168.0.107:5173/birh-date-select/${userId}`}     // Село
          web_app: {url: "https://192.168.0.102:5173/birh-date-select/"+userId}  // Львів
        }]]
      }
    });
  } else {    
    await bot.sendMessage(msg.chat.id, `З поверненням, ${msg.chat.first_name}! ` +
    `Для того, щоб переглянути список команд, натисніть сюди: /help`, {
      "reply_markup": {
        "resize_keyboard": true,
        "keyboard": [["Звернутися до підтримки"]]
      }
    })
  }
}