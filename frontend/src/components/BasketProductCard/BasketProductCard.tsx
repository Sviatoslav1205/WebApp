import { FC } from "react"
import styles from "./BasketProductCard.module.scss"
import DeleteIcon from "@/images/deleteButton/DeleteButton.svg"
import { ProductData } from "@/types/ProductData"

interface BasketProductCardProps {
  product: ProductData
  count: number
  onAdd: () => void
  onRemove: () => void
  onDelete: () => void
  // onCardClick: () => void
}

const BasketProductCard: FC<BasketProductCardProps> = ({ product, count, onAdd, onRemove, onDelete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <img src={product.photo} alt="" className={styles.image} />
        <div className={styles.block} id={styles.nameBlock}>
          <p className={styles.name}>
            {product.name}
          </p>
          <div className={styles.price}>{product.price} грн.</div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.block} id={styles.priceBlock}>
          {count * product.price} грн.
        </div>
      </div>
        <hr className={styles.separator} />
      <div className={styles.secondRow}>
        <button className={styles.button} onClick={onRemove}>-</button>
        <p className={styles.count}>
          x{count}
        </p>
        <button className={styles.button} onClick={onAdd}>+</button>
        
        {/* <div className={styles.block}>
        </div> */}
      </div>
      <img src={DeleteIcon} className={styles.deleteButton} onClick={onDelete} alt="" />
      
      {/* Test */}
      {/* 
      <div className={styles.body}>
        <p className={styles.title}>{product.name}</p>
        <div className={styles.info}>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.bottomBlocks}>
            <div className={styles.weight}>{product.weight} г.</div>
            <div className={styles.price}>{product.price} грн.</div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default BasketProductCard