module.exports = {
  shipping_options: [
    {
      id: 'selfPickup',
      title: 'Самовивіз',
      prices: [{ label: 'Самовивіз', amount: 0 }]
    },
    {
      id: 'courier',
      title: 'Доставка курʼєром',
      prices: [{ label: 'Доставка курʼєром', amount: 140*100 }]
    }
  ]
}