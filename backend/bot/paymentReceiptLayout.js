module.exports = ({orderId, userId, recipientName, phoneNumber, address, orderStatus, orderDate, totalPrice, deliveryType, shippingCost}, products) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Чек</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      width: 80%;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1, h2, h3 {
      text-align: center;
    }
    .details, .products, .summary {
      margin-bottom: 20px;
    }
    .details div, .summary div {
      margin: 5px 0;
    }
    .products table {
      width: 100%;
      border-collapse: collapse;
    }
    .products th, .products td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .products th {
      background-color: #f2f2f2;
    }
    .total {
      text-align: right;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Фіскальний чек</h1>
    
    <div class="details">
      <h2>Деталі замовлення</h2>
      <div><strong>ID замовлення:</strong> <span id="orderId">${orderId}</span></div>
      <div><strong>ID користувача:</strong> <span id="userId">${userId}</span></div>
      <div><strong>Імʼя одержувача:</strong> <span id="userId">${recipientName}</span></div>
      <div><strong>Номер телефону:</strong> <span id="phoneNumber">${phoneNumber}</span></div>
      <div><strong>Адреса:</strong> <span id="address">${address}</span></div>
      <div><strong>Статус:</strong> <span id="orderStatus">${orderStatus}</span></div>
      <div><strong>Дата:</strong> <span id="orderCreateDate">${orderDate.toLocaleDateString()}</span></div>
      <div><strong>Час:</strong> <span id="orderCreateTime">${orderDate.toLocaleTimeString()}</span></div>
    </div>
    
    <div class="products">
      <h2>Товари</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Назва</th>
            <th>К-сть</th>
            <th>Ціна, грн.</th>
            <th>Сума, грн.</th>
          </tr>
        </thead>
        <tbody>
          ${products.map((product, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>${product.count}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>${product.totalPrice.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="summary">
      <h2>Підсумок</h2>
      <div>Загальна ціна (без доставки): <span id="totalPrice">${totalPrice.toFixed(2)} грн.</span></div>
      <div>Тип доставки: <span id="deliveryType">${deliveryType}</span></div>
      <div>Вартість доставки: <span id="shippingCost">${shippingCost.toFixed(2)} грн.</span></div>
      <div class="total"><strong>Загальна сума: <span id="totalAmount">${(totalPrice + shippingCost).toFixed(2)} грн.</span></strong></div>
    </div>
  </div>
</body>
</html>
`
