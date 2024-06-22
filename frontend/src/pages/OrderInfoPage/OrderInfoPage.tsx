import { FC, useEffect, useState } from "react"
import styles from "./OrderInfoPage.module.scss"
import { observer } from "mobx-react-lite"
import { Order } from "@/types/Order"
import OrdersService from "@/services/Orders.service"
import TextContainer from "@/components/TextContainer"
import TextInput from "@/components/TextInput"
import OrderCard from "@/components/OrderCard"
import BackButton from "@/components/BackButton"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ProductData } from "@/types/ProductData"
import { IMAGES_URL } from "@/https"
import Select, { OnChangeValue } from "react-select"
import OrderInfoProductCard from "@/components/OrderInfoProductCard"
import Button from "@/components/Button"
import ModalContainer from "@/components/ModalContainer"
import ConfirmationModal from "@/components/ConfirmationModal"

const OrderInfoPage: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
  }, [pathname])
  
  const navigate = useNavigate()
  const { orderId } = useParams()
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
  const [orderInfo, setOrderInfo] = useState<Order>({
    id: 0,
    userId: 0,
    recipientName: '',
    phoneNumber: '',
    address: '',
    orderStatus: '',
    orderDate: new Date(),
    totalPrice: 0,
    deliveryType: '',
    shippingCost: 0
  })
  const [editedOrderStatus, setEditedOrderStatus] = useState<string>('')
  const [orderProducts, setOrderProducts] = useState<{product: ProductData, count: number}[]>([])
  const orderStatusOptions = [
    {
      value: "Оплачено",
      label: "Оплачено",
      color: "#D39800"
    },
    {
      value: "Готове до видачі",
      label: "Готове до видачі",
      color: "#009106"
    },
    {
      value: "В дорозі",
      label: "В дорозі",
      color: "#0082AC"
    },
    {
      value: "Отримано",
      label: "Отримано",
      color: "#000000"
    }
  ]
  
  useEffect(() => {
    const fetchOrderInfo = async () => {
      const orderData = (await OrdersService.getOrderData(orderId ? +orderId : 0)).data
      setOrderInfo(orderData.orderInfo)
      setEditedOrderStatus(orderData.orderInfo.orderStatus)
      setOrderProducts([...orderData.orderProducts.map(({product: {photo: value, ...rest}, count: count}) => ({product: {photo: IMAGES_URL+'/'+value, ...rest}, count: count}))])
    }
    fetchOrderInfo()
  }, [])

  return (
    <>
      <ModalContainer showModal={showConfirmationModal} blockScroll={true} onClose={() => setShowConfirmationModal(false)}> 
        <ConfirmationModal 
          onYes={async () => {
            await OrdersService.changeOrderStatus(orderInfo.id, editedOrderStatus)
            navigate('/orders')
          }} 
          onNo={() => {
            setEditedOrderStatus(orderInfo.orderStatus)
            setShowConfirmationModal(false)
          }} 
        />
      </ModalContainer>

      <div className={styles.headContainer}>
        <div className={styles.block}>
          <BackButton theme="red" onButtonClick={() => navigate('/orders')} />
          <TextContainer text={`Замовлення №${orderId}`} theme="red" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <OrderCard order={orderInfo} />
        </div>

        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={orderInfo.userId} onValueChange={() => {}} readonly={true} border={true} label="ID користувача" />
        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={orderInfo.recipientName} onValueChange={() => {}} readonly={true} border={true} label="Імʼя користувача" />
        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={orderInfo.phoneNumber} onValueChange={() => {}} readonly={true} border={true} label="Номер телефону" />
        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={orderInfo.address} onValueChange={() => {}} readonly={true} border={true} label="Адреса" />
        
        <div style={{position: 'relative', margin: 'auto'}}>
          <span className={styles.label}>Статус замовлення</span>
          <Select 
            placeholder='Статус замовлення'
            isClearable={false}
            isSearchable={false}
            value={
              orderStatusOptions.filter(({ value }) => value === editedOrderStatus)
            }
            options={orderStatusOptions}
            styles={{
              singleValue: (baseStyles, { data }) => {
                return {
                  ...baseStyles,
                  color: data.color,
                }
              },
              option: (baseStyles, { data, isFocused, isSelected }) => {
                return {
                  ...baseStyles,
                  backgroundColor: isSelected
                    ? data.color
                    : isFocused 
                    ? '#dddddd' : undefined,
                  color: isSelected
                    ? 'white'
                    : data.color,
                }
              },
              container: (baseStyles) => ({
                ...baseStyles,
                zIndex: 2,
                width: '85vw',
              })
            }}
            onChange={(e: OnChangeValue<{value: string, label: string, color: string}, false>) => {
              setEditedOrderStatus(e?.value || '')
            }}
          />
        </div>

        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={`${new Date(orderInfo.orderDate).toLocaleString()}`} onValueChange={() => {}} readonly={true} border={true} label="Дата замовлення" />
        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={`${orderInfo.totalPrice}.00 грн`} onValueChange={() => {}} readonly={true} border={true} label="Загальна ціна" />
        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={orderInfo.deliveryType} onValueChange={() => {}} readonly={true} border={true} label="Тип доставки" />
        <TextInput theme="white" labelTheme="white" size="big" inputType="singleLine" value={`${orderInfo.shippingCost}.00 грн`} onValueChange={() => {}} readonly={true} border={true} label="Вартість доставки" />
        
        <div className={styles.ordersContainer}>
          <span className={styles.label}>Cписок товарів</span>
          {
            orderProducts.map(element => (
              <OrderInfoProductCard key={element.product.id} product={element.product} count={element.count}/>
            ))
          }
        </div>

        <Button text="Зберегти" theme="red" borders="square" style={{margin: '0 auto 20px'}} onButtonClick={() => {
          if (orderInfo.orderStatus !== editedOrderStatus) {
            setShowConfirmationModal(true)
          } else {
            navigate('/orders')
          }
        }} />
      </div>
    </>
  )
}

export default observer(OrderInfoPage)