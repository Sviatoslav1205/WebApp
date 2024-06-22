const { pool } = require("../db/db")

const createOrder = async (userId, orderStatus, orderDate, products) => {
  await pool.query('INSERT INTO `Orders` (`user_id`, `order_status`, `order_date`, `total_price`) VALUES (?, ?, ?, ?)', 
    [userId, orderStatus, orderDate, products.reduce((acc, element) => acc + (element.product.price * element.count), 0)])
  const [result] = await pool.query('SELECT `order_id` FROM `Orders` WHERE `order_date` = ?', [orderDate])
  products.forEach(async (element) => {
    await pool.query('INSERT INTO `Orders_details` (`order_id`, `product_id`, `product_count`, `total_price`) VALUES (?, ?, ?, ?)',
      [result[0].order_id, element.product.id, element.count, element.product.price * element.count])
  })
}

const getOrders = async () => {
  const [result] = await pool.query(
    "SELECT `order_id` as 'id', `user_id` as 'userId', `recipient_name` as 'recipientName', " +
    "`phone_number` as 'phoneNumber', `address`, `order_status` as 'orderStatus', `order_date` as 'orderDate', " +
    "`total_price` as 'totalPrice', `delivery_type` as 'deliveryType', `shipping_cost` as 'shippingCost' " +
    "FROM `Orders` ORDER BY `order_date` DESC"
  )
  return result
}

const getOrderData = async (orderId) => {
  const [orderInfo] = await pool.query(
    "SELECT `order_id` as 'id', `user_id` as 'userId', `recipient_name` as 'recipientName', " +
    "`phone_number` as 'phoneNumber', `address`, `order_status` as 'orderStatus', `order_date` as 'orderDate', " +
    "`total_price` as 'totalPrice', `delivery_type` as 'deliveryType', `shipping_cost` as 'shippingCost' " +
    "FROM `Orders` WHERE `order_id` = ?",
    [orderId]
  )
  const [orderProducts] = await pool.query(
    "SELECT `Products_archive`.`product_id` as 'id', `Product_categories`.`category_id` as 'categoryId', " +
    "`Products_archive`.`product_name` as 'name', `Products_archive`.`photo`, `Products_archive`.`price`, " +
    "`Products_archive`.`weight`, `Products_archive`.`description`, `Orders_details`.`product_count` as 'count' " +
    "FROM `Products_archive` INNER JOIN `Product_categories` " +
    "ON `Products_archive`.`category_name` = `Product_categories`.`category` " +
    "INNER JOIN `Orders_details` ON `Products_archive`.`product_id` = `Orders_details`.`product_id` " +
    "WHERE `Orders_details`.`order_id` = ?",
    [orderId]
  )
  return {
    orderInfo: orderInfo[0],
    orderProducts: orderProducts.map(element => {
      return {
        product: {
          id: element.id,
          categoryId: element.categoryId,
          name: element.name,
          photo: element.photo,
          price: element.price,
          weight: element.weight,
          description: element.description
        },
        count: element.count
      }
    })
  }
}

const changeOrderStatus = async (orderId, orderStatus) => {
  await pool.query("UPDATE `Orders` SET `order_status` = ? WHERE `order_id` = ?", [orderStatus, orderId])
  return "Статус змінено!"
}

module.exports = {
  createOrder,
  getOrders,
  getOrderData,
  changeOrderStatus
}