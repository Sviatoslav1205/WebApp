const { pool } = require("../../db/db")

const requestDelivery = async (bot, orderId) => {
  const [orderData] = await pool.query("SELECT `order_id`, `user_id`, `address` FROM `Orders` WHERE `order_id` = ?", [orderId])
  const address = orderData[0].address.split(",").slice(0, 3).join(",")

  const groupMessage = await bot.sendMessage(process.env.DELIVERY_GROUP_ID, `Надійшло нове замовлення на вулицю: ${address}`)
  bot.editMessageReplyMarkup({
    "inline_keyboard": [[{
      text: "Взяти замовлення",
      callback_data: JSON.stringify({
        action: "takeOrder",
        orderId: orderData[0].order_id,
        msgId: groupMessage.message_id
      })
    }]]
  }, {
    chat_id: process.env.DELIVERY_GROUP_ID,
    message_id: groupMessage.message_id
  })
}

const takeOrder = async (bot, orderId, courierId, groupMessageId) => {
  await pool.query('UPDATE `Orders` SET `order_status` = \'В дорозі\' WHERE `order_id` = ?', [orderId])
  const [orderData] = await pool.query("SELECT * FROM `Orders` WHERE `order_id` = ?", [orderId])
  const [orderProductsArray] = await pool.query("SELECT `Products`.`product_name`, `Orders_details`.`product_count` " +
    "FROM `Products` INNER JOIN `Orders_details` ON `Products`.`product_id` = `Orders_details`.`product_id` " +
    "WHERE `Orders_details`.`order_id` = ?", 
    [orderId])
  await bot.deleteMessage(process.env.DELIVERY_GROUP_ID, groupMessageId)
  const courierMessage = await bot.sendMessage(courierId, 
    `
Ви підтвердили замовлення №${orderId}.
ID клієнта – <code>${orderData[0].user_id}</code>,
Імʼя: ${orderData[0].recipient_name},
Номер телефону: <code>${orderData[0].phone_number}</code>,
Адреса доставки: ${orderData[0].address}

<b>Склад замовлення:</b>
${orderProductsArray.map(product => {
  return `${product.product_count}x – ${product.product_name}`
}).join('\n')}
`, {
    "parse_mode": 'HTML',
    "reply_markup": {
      "inline_keyboard": [[{
        text: "Доставлено",
        callback_data: JSON.stringify({
          action: "deliveredOrder",
          orderId: orderData[0].order_id,
          userId: orderData[0].user_id
        })
      }]]
    }
  }
  )
  const recipientMessage = await bot.sendMessage(orderData[0].user_id, `Курʼєр підтвердив ваше замовлення. Очікуйте, незабаром він з вами звʼяжеться.`)
  await bot.sendMessage(orderData[0].user_id, `ID курʼєра: <code>${courierId}</code>`,
  {
    parse_mode: 'HTML'
  }
  )
  return {
    courierMessageId: courierMessage.message_id,
    recipientMessageId: recipientMessage.message_id
  }
}

const deliveredOrder = async (bot, orderId, recipientId, courierId, messagesId) => {
  await bot.deleteMessage(courierId, messagesId.courierMessageId)
  const courierMessage = await bot.sendMessage(courierId, 
    `
Ви доставили замовлення №${orderId}. Очікуйте підтвердження клієнта!
`, {
    "parse_mode": 'HTML'
  }
  )
  await bot.deleteMessage(recipientId, messagesId.recipientMessageId)
  const recipientMessage = await bot.sendMessage(recipientId, `Курʼєр позначив ваше замовлення як виконане. Підтвердіть отримання!`, 
    {
      "parse_mode": 'HTML',
      "reply_markup": {
        "inline_keyboard": [[{
          text: "Отримано",
          callback_data: JSON.stringify({
            action: "confirmDeliver",
            orderId: orderId,
            courierId: courierId
          })
        }]]
      }
    }
  )
  return {
    courierMessageId: courierMessage.message_id,
    recipientMessageId: recipientMessage.message_id
  }
}

const confirmDeliver = async (bot, orderId, recipientId, courierId, messagesId) => {
  await pool.query('UPDATE `Orders` SET `order_status` = \'Отримано\' WHERE `order_id` = ?', [orderId])
  await bot.deleteMessage(courierId, messagesId.courierMessageId)
  await bot.sendMessage(courierId, 
    `Замовлення №${orderId} успішно виконано!`, {
      "parse_mode": 'HTML'
    }
  )
  await bot.deleteMessage(recipientId, messagesId.recipientMessageId)
  await bot.sendMessage(recipientId, `Замовлення №${orderId} успішно виконано!`, 
    {
      "parse_mode": 'HTML'
    }
  )
}

module.exports = {
  requestDelivery,
  takeOrder,
  deliveredOrder,
  confirmDeliver
}