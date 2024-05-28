import { FC } from "react"
import styles from "./ProductCard.module.scss"
import { ProductData } from "@/types/ProductData"

interface LoginButtonProps {
  product: ProductData
  onCardClick: () => void
}

const ProductCard: FC<LoginButtonProps> = ({ product, onCardClick }) => {
  return (
    <div className={styles.container} onClick={onCardClick}>
      <img src={product.photo} alt="" className={styles.image}/>
      <div className={styles.body}>
        <p className={styles.title}>{product.name}</p>
        <div className={styles.info}>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.bottomBlocks}>
            <div className={styles.weight}>{product.weight} г.</div>
            <div className={styles.price}>{product.price} грн.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard