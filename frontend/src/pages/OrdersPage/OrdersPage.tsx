import { FC, useEffect, useState } from "react"
import styles from "./OrdersPage.module.scss"
import { observer } from "mobx-react-lite"
import { Order } from "@/types/Order"
import OrdersService from "@/services/Orders.service"
import TextContainer from "@/components/TextContainer"
import TextInput from "@/components/TextInput"
import OrderCard from "@/components/OrderCard"
import { useNavigate } from "react-router-dom"

const OrdersPage: FC = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')
  const [orders, setOrders] = useState<Order[]>([])
  const [groupedOrders, setGroupedOrders] = useState<{[key: string]: Order[]}>({})
  
  useEffect(() => {
    const fetchOrders = async () => {
      setOrders((await OrdersService.getOrders()).data.orders)
    }
    fetchOrders()
    document.body.style.overflow = 'visible'
  }, [])

  useEffect(() => {
    const grouped: { [key: string]: Order[] } = {}

    orders
      .filter(order => {
        return (order.id+"/"+order.userId+"/"+order.phoneNumber+"/"+order.address+"/"+new Date(order.orderDate).toLocaleDateString())
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      })
      .forEach(order => {
        const dateKey = new Date(order.orderDate).toLocaleDateString()
        if (!grouped[dateKey]) {
          grouped[dateKey] = []
        }
        grouped[dateKey].push(order)
      })
    setGroupedOrders(grouped)
    
  }, [orders, searchValue])

  return (
    <>
      <div className={styles.headContainer}>
        <TextContainer text="Замовлення" theme="red" style={{width: "75vw", margin: "0 auto"}} />
        <TextInput style={{width: "75vw"}} placeholder="Пошук..." theme="white" size="small" inputType='singleLine' value={searchValue} onValueChange={(e) => setSearchValue(e.target.value)} />
      </div>

      <div className={styles.ordersContainer}>
        {
          Object.keys(groupedOrders).map(date => (
            <div key={date}>
              <h2 className={styles.date}>{date}</h2>
              <div className={styles.groupedOrders}>
                {groupedOrders[date].map(order => (
                  <OrderCard order={order} key={order.id} onCardClick={() => navigate(`/orders/${order.id}`)}/>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default observer(OrdersPage)