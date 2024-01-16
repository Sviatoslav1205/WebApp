const inlineKeyboard = {
  "reply_markup": {
    "inline_keyboard": [[{
      text: "Завершити сеанс",
      callback_data: "endSupportSession"
    }]]
  }
}

const resetInlineKeyboard = {
  "reply_markup": {
    "inline_keyboard": [[]]
  }
}

module.exports = {
  inlineKeyboard,
  resetInlineKeyboard
}