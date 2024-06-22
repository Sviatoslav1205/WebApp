import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import styles from "./BasketModal.module.scss"
import { Context } from "@/main"
import Button from "../Button"
import { observer } from "mobx-react-lite"
import BasketProductCard from "../BasketProductCard"
import UserService from "@/services/User.service"
import OrdersService from "@/services/Orders.service"

interface BasketModalProps {  
  setIsFullscreenOpen: Dispatch<SetStateAction<boolean>>
}

const tg: WebApp = Telegram.WebApp

const BasketModal: FC<BasketModalProps> = ({ setIsFullscreenOpen }) => {
  const { store, basketStore } = useContext(Context)
  const [basketError, setBasketError] = useState<boolean>(false)
  const invoiceClosedHandlerRef = useRef<({ url, status }: {url: string; status: "paid" | "cancelled" | "failed" | "pending"}) => void>()
  const [date, setDate] = useState<string>('')
  useEffect(() => {
    if (basketStore.products.length <= 2) {
      setIsFullscreenOpen(false)
    }
  }, [basketStore.products])

  useEffect(() => {
    invoiceClosedHandlerRef.current = ({ status }: { status: "paid" | "cancelled" | "failed" | "pending" }) => {
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
              <BasketProductCard key={index} product={element.product} count={element.count} 
                onAdd={() => basketStore.addProduct(element.product)} 
                onRemove={() => basketStore.removeProduct(element.product)} 
                onDelete={() => basketStore.deleteProduct(element.product)} 
              />
            )
          })
        }
      </div>
      <div className={styles.buttonContainer}>
        {basketError && <div className={styles.basketError}>Кошик порожній!</div>}
        <Button text="Замовити" theme="red" borders="square" onButtonClick={async () => {
          if (basketStore.products.length !== 0) {
            const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000
            const orderDate = new Date(Date.now() - timeZoneOffset).toISOString().replace('T', ' ').replace('Z', '')
            setDate(orderDate)
            tg.openInvoice((await UserService.createInvoiceLink(orderDate, basketStore.products)).data.invoiceUrl)
          } else {
            setBasketError(true)
          }          
        }} />
      </div>
    </div>
  )
}

export default observer(BasketModal)