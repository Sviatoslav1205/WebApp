const { pool } = require("../../db/db")
const puppeteer = require('puppeteer')

const updateOrderData = async (recipientName, phoneNumber, address, orderDate, deliveryType, shippingCost) => {
  return new Promise((resolve, reject) => setTimeout (async () => {
    await pool.query("UPDATE `Orders` SET `recipient_name` = ?, `phone_number` = ?, `address` = ?, `delivery_type` = ?, `shipping_cost` = ? WHERE `order_date` = ?", 
      [recipientName, phoneNumber, address, deliveryType, shippingCost, orderDate])
      .catch(error => {
        console.log(error)
        return reject(error)
      })
    const [result] = await pool.query("SELECT `order_id` as 'orderId' FROM `Orders` WHERE `order_date` = ?", [orderDate])
    return resolve(result[0].orderId)
  }, 2000)) 
}

const generateReceipt = async (orderId) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const [orderData] = await pool.query(
    "SELECT `order_id` as 'orderId', `user_id` as 'userId', `recipient_name` as 'recipientName', " +
    "`phone_number` as 'phoneNumber', `address`, `order_status` as 'orderStatus', `order_date` as 'orderDate', " +
    "`total_price` as 'totalPrice', `delivery_type` as 'deliveryType', `shipping_cost` as 'shippingCost' FROM `Orders` " +
    "WHERE `order_id` = ?", 
    [orderId]
  )
    .catch(error => {
      console.log(error)
    })
  const [orderProductsArray] = await pool.query(
    "SELECT `Products_archive`.`product_name` as 'name', `Products_archive`.`price`, " +
    "`Orders_details`.`product_count` as 'count', `Orders_details`.`total_price` as 'totalPrice' FROM `Orders_details` " +
    "INNER JOIN `Products_archive` ON `Orders_details`.`product_id`=`Products_archive`.`product_id` " + 
    "WHERE `Orders_details`.`order_id` = ?",
    [orderId]
  )
    .catch(error => {
      console.log(error)
    })
  
  const receiptHtml = require('../paymentReceiptLayout')(orderData[0], orderProductsArray)
  await page.setContent(receiptHtml)

  const receipt = await page.pdf({ format: "A4", printBackground: true })
  await browser.close()

  return receipt
}

module.exports = {
  updateOrderData,
  generateReceipt
}