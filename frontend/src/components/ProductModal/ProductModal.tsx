import { FC, useContext, useState } from "react"
import styles from "./ProductModal.module.scss"
import { Context } from "@/main"
import { ProductData } from "@/types/ProductData"
import Button from "../Button"
import { observer } from "mobx-react-lite"
import BackButton from "../BackButton"

interface ProductModalProps {
  product: ProductData
  onBack: () => void
}

  const ProductModal: FC<ProductModalProps> = ({ product, onBack }) => {
  const { basketStore } = useContext(Context)
  const [buttonText, setButtonText] = useState<string>('Додати в кошик')

  return (
    <div className={styles.container}>
      <img src={product.photo} alt="" className={styles.photo} />

      <div className={styles.body}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.bottomBlocks}>
          <div className={styles.weight}>{product.weight} г.</div>
          <div className={styles.price}>{product.price} грн.</div>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <BackButton theme="red" onButtonClick={onBack} style={{width: '35px', height: '35px'}} iconStyle={{width: '35px', height: '35px'}} />
        <Button text={buttonText} theme="red" borders="square" onButtonClick={async () => {
          basketStore.addProduct(product)
          setButtonText('Додано!')
          setTimeout(() => {
            setButtonText('Додати в кошик')
          }, 1500)
        }} />
      </div>
    </div>
  )
}

export default observer(ProductModal)