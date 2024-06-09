import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react"
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
import { url } from "inspector"
import OrdersService from "@/services/Orders.service"

interface BasketModalProps {  
  setIsFullscreenOpen: Dispatch<SetStateAction<boolean>>
  onBack: () => void
}

const tg: WebApp = Telegram.WebApp

// const ProductModal: FC<ProductModalProps> = ({ product, rerenderProductList, isFullscreenOpen, onButtonClick, setConfirmationModalData }) => {
const BasketModal: FC<BasketModalProps> = ({ setIsFullscreenOpen, onBack }) => {
  const { store, basketStore } = useContext(Context)
  const [basketError, setBasketError] = useState<boolean>(false)
  const invoiceClosedHandlerRef = useRef<({ url, status }: {url: string; status: "paid" | "cancelled" | "failed" | "pending"}) => void>()
  const [date, setDate] = useState<string>('')
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

  

  useEffect(() => {
    invoiceClosedHandlerRef.current = ({ url, status }: { url: string; status: "paid" | "cancelled" | "failed" | "pending" }) => {
      // console.log(url, status)
      if (status === 'paid') {
        OrdersService.createOrder(store.userId, 'Оплачено', date, basketStore.products)
        console.log('create order')
        basketStore.clear()
        tg.close()
      } else {
        return
      }
    }
    tg.onEvent('invoiceClosed', invoiceClosedHandlerRef.current)

    return () => {
      if (invoiceClosedHandlerRef.current) {
        tg.offEvent('invoiceClosed', invoiceClosedHandlerRef.current);
      }
    };


  }, [date])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Кошик</h1>
      <div className={styles.productsContainer}>
        {basketStore.products.length === 0 ? 
          <p className={styles.emptyMessage}>Товарів не додано!</p> 
          : 
          basketStore.products.map((element, index) => {
            return (
              // element.product.name
              <BasketProductCard key={index} product={element.product} count={element.count} 
                onAdd={() => basketStore.addProduct(element.product)} 
                onRemove={() => basketStore.removeProduct(element.product)} 
                onDelete={() => basketStore.deleteProduct(element.product)} 
              />
            )
          })
        }
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
      <div className={styles.buttonContainer}>
        {basketError && <div className={styles.basketError}>Кошик порожній!</div>}
        <Button text="Замовити" theme="red" borders="square" onButtonClick={async () => {
          // tg.openInvoice((await UserService.createInvoiceLink(basketStore.products)).data.invoiceUrl, (url, status) => {
            // tg.sendData(JSON.stringify({type: 'test'}))
          if (basketStore.products.length !== 0) {
            const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000
            const orderDate = new Date(Date.now() - timeZoneOffset).toISOString().replace('T', ' ').replace('Z', '')
            // console.log(orderDate)
            setDate(orderDate)
            tg.openInvoice((await UserService.createInvoiceLink(orderDate, basketStore.products)).data.invoiceUrl)
            // const invoiceClosedHandler = ({ url, status }: { url: string; status: "paid" | "cancelled" | "failed" | "pending" }) => {
            //   console.log(url, status)
            //   if (status === 'paid') {
            //     OrdersService.createOrder(store.userId, 'Оплачено', orderDate, basketStore.products)
            //     // OrdersService.createOrder(store.userId, 'Оплачено', url.split('$')[1], basketStore.products)
            //     console.log('create order')
            //     basketStore.clear()
            //     // tg.close()
            //   } else {
            //     return
            //   }
            // }
            // window.Telegram.WebApp
            // tg.offEvent('invoiceClosed')
            // tg.onEvent('invoiceClosed', invoiceClosedHandler)
          } else {
            setBasketError(true)
          }

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
      </div>
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