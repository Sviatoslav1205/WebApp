const paymentService = require('../botServices/payment.service')
const deliveryService = require('../botServices/delivery.service')
const shippingOptions = require('../shippingOptions')

function reformatPhoneNumber(phoneNumber) {
  let cleaned = phoneNumber.replace(/\D/g, '')
  if (cleaned.length === 10) {
      cleaned = '38' + cleaned
  }
  if (cleaned.length !== 12) {
      throw new Error('Invalid phone number length')
  }
  let formatted = '+' + cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5, 8) + ' ' + cleaned.slice(8)
  return formatted
}

module.exports = async (bot, msg) => {
  const successfulPayment = msg.successful_payment
  const orderInfo = successfulPayment.order_info
  const shippingOption = shippingOptions.shipping_options.find(option => option.id === successfulPayment.shipping_option_id)
  const orderId = await paymentService.updateOrderData(
    orderInfo.name,
    reformatPhoneNumber(orderInfo.phone_number), 
    `${orderInfo.shipping_address.state} обл., м. ${orderInfo.shipping_address.city}, ${orderInfo.shipping_address.street_line1}, ${orderInfo.shipping_address.street_line2}`,
    successfulPayment.invoice_payload, 
    shippingOption.title,
    shippingOption.prices[0].amount / 100
  )
  const receipt = await paymentService.generateReceipt(orderId)
  await bot.sendMessage(msg.chat.id, 'Ваше замовлення успішно оформлено!')
  await bot.sendDocument(msg.chat.id, receipt, {}, {
    filename: 'Чек'
  })
  if (shippingOption.id === 'courier') {
    await deliveryService.requestDelivery(bot, orderId)
  }
}