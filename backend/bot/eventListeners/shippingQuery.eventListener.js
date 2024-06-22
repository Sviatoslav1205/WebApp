const shippingOptions = require("../shippingOptions")

module.exports = async (bot, shippingQuery) => {
  if (shippingQuery.shipping_address.country_code !== 'UA') {
    return await bot.answerShippingQuery(shippingQuery.id, false, {
      error_message: "Замовлення доступні лише в Україні!"
    })
  } else if (shippingQuery.shipping_address.city.toLowerCase() !== 'львів') {
    return await bot.answerShippingQuery(shippingQuery.id, false, {
      error_message: "На жаль, замовлення доступні лише в Львові!"
    })
  }

  await bot.answerShippingQuery(shippingQuery.id, true, {
    shipping_options: shippingOptions.shipping_options
  })

}