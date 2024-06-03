import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import styles from "./BasketModal.module.scss"
import TextInput from "../TextInput"
import AdminService from "@/services/Admin.service"
import { Context } from "@/main"
import { ProductData } from "@/types/ProductData"
import ImageInput from "../ImageInput"
import Button from "../Button"
import { CustomError } from "@/types/CustomError"
import Select, { OnChangeValue } from "react-select"
import { SelectOption } from "@/types/SelectOption"
import { observer } from "mobx-react-lite"
import BackButton from "@/components/BackButton"
import BasketProductCard from "../BasketProductCard"
import UserService from "@/services/User.service"

interface BasketModalProps {  
  setIsFullscreenOpen: Dispatch<SetStateAction<boolean>>
  onBack: () => void
}

const tg: WebApp = Telegram.WebApp

// const ProductModal: FC<ProductModalProps> = ({ product, rerenderProductList, isFullscreenOpen, onButtonClick, setConfirmationModalData }) => {
const BasketModal: FC<BasketModalProps> = ({ setIsFullscreenOpen, onBack }) => {
  const { basketStore } = useContext(Context)
  const [buttonText, setButtonText] = useState<string>('Додати в кошик')
  // useEffect(()=>{
  //   console.log(showBasket ? 'block' : 'unlock')
  //   document.body.style.overflow = showBasket ? 'hidden' : 'visible'
  //   document.body.style.setProperty('overflow', showBasket ? 'hidden' : 'visible', 'important')
  // }, [showBasket])
  useEffect(() => {
    if (basketStore.products.length <= 2) {
      setIsFullscreenOpen(false)
    }
  }, [basketStore.products])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Кошик</h1>
      <div className={styles.productsContainer}>
        {basketStore.products.length !== 0 ? basketStore.products.map((element) => {
          return (
            // element.product.name
            <BasketProductCard product={element.product} count={element.count} 
              onAdd={() => basketStore.addProduct(element.product)} 
              onRemove={() => basketStore.removeProduct(element.product)} 
              onDelete={() => basketStore.deleteProduct(element.product)} 
            />
          )
        }) : ''}
      </div>
      {/* <BackButton theme="red" onButtonClick={onBack} style={{position: 'absolute', top: '0', left: '0'}} /> */}
      
      {/* <img src={product.photo} alt="" className={styles.photo} />

      <div className={styles.body}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.bottomBlocks}>
          <div className={styles.weight}>{product.weight} г.</div>
          <div className={styles.price}>{product.price} грн.</div>
        </div>
      </div> */}

      {/* <div style={{position: 'relative', width: '85vw'}} key={editedProduct.categoryId}>
        {errors[1]?.show ? 
          <span className={styles.errorMessage}>{errors[1].message}</span>
          : 
          <span className={styles.label}>Категорія</span>
        }
        
      </div> */}
      <Button text="Замовити" theme="red" borders="square" style={{marginTop: '15px'}} onButtonClick={async () => {
        await UserService.pay(basketStore.products)
        // basketStore.addProduct(product)
        // tg.openInvoice()
        // setButtonText('Додано!')
        // setTimeout(() => {
        //   setButtonText('Додати в кошик')
        // }, 1500)

        
        // if (checkEditedProduct()) {
        //   createFormData()
        //   await AdminService.createProduct(formData)
        //   rerenderProductList()
        //   onButtonClick()
        // }
        // productStore.fetchProducts()
        // changeEditedProduct('phot}o', editedProduct.photo ? (editedProduct.categoryId + '/' + editedProduct.photo) : null)
        
      }} />
      {/* <button onClick={() => {
        console.log(basketStore.products)
        basketStore.removeProduct(product)
        console.log(basketStore.products)
      }}>-1</button>
      <button onClick={() => {
        console.log(basketStore.products)
        basketStore.deleteProduct(product)
        console.log(basketStore.products)
      }}>delete</button> */}
      
      {/* <div className={styles.buttonsContainer}>
        <BackButton theme="red" onButtonClick={onBack} style={{width: '35px', height: '35px'}} iconStyle={{width: '35px', height: '35px'}} />
      </div> */}
    </div>
  )
}

export default observer(BasketModal)