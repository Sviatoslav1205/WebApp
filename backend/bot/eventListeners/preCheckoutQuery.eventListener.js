module.exports = async (bot, preCheckoutQuery) => {
  if (/^380\d{9}$/.test(preCheckoutQuery.order_info.phone_number)) {
    await bot.answerPreCheckoutQuery(preCheckoutQuery.id, true)
  } else {
    await bot.answerPreCheckoutQuery(preCheckoutQuery.id, false, {
      error_message: 'Номер телефону не може бути іноземного оператора!'
    })
  }
}