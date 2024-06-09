import { FC } from "react"
import styles from "./OrderCard.module.scss"
import { Order } from "@/types/Order"

interface OrderCardProps {
  order: Order
  onCardClick?: () => void
}

const statusColors: {[key: string]: string} = {
  "Оплачено": '#D39800',
  "Готове до видачі": '#009106',
  "В дорозі": '#0082AC',
  "Отримано": '#000000'
}

const OrderCard: FC<OrderCardProps> = ({ order, onCardClick }) => {
  return (
    <div className={`${styles.container} ${onCardClick ? styles.clickable : null}`} onClick={onCardClick} >
      <div className={styles.row}>
        <div className={styles.id}>{order.id}</div>
        <hr className={styles.hr} />
        <div className={styles.phoneNumber}>{order.phoneNumber}</div>
      </div>
      <hr className={styles.rowSplit} />
      <div className={styles.row}>
        <div className={styles.orderStatus} style={{color: statusColors[order.orderStatus]}}>{order.orderStatus}</div>
      </div>
      <hr className={styles.rowSplit} />
      <div className={styles.row}>
        <div className={styles.price}>{(order.totalPrice + order.shippingCost).toFixed(2)} грн</div>
      </div>
    </div>
  )
}

export default OrderCard