import { FC } from "react"
import styles from "./OrderInfoProductCard.module.scss"
import { ProductData } from "@/types/ProductData"

interface OrderInfoProductCardProps {
  product: ProductData
  count: number
}

const OrderInfoProductCard: FC<OrderInfoProductCardProps> = ({ product, count }) => {
  return (
    <div className={styles.container}>
      <img src={product.photo} alt="" className={styles.image}/>
      <div className={styles.block}>
        <div className={styles.title}>
          <p className={styles.titleText}>{product.name}</p>
        </div>
        <div className={styles.price}>{product.price} грн.</div>
      </div>
      <hr className={styles.bigHr} />
      <p className={styles.count}>x{count}</p>
      <hr className={styles.smallHr} />
      <p className={styles.totalPrice}>{product.price * count}.00 грн</p>
    </div>
  )
}

export default OrderInfoProductCard