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
  // const [ordersGroupDate, setOrdersGroupDate] = useState<string>('')
  const [orders, setOrders] = useState<Order[]>([])
  const [groupedOrders, setGroupedOrders] = useState<{[key: string]: Order[]}>({})
  // const { productStore } = useContext(Context)
  // const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false)
  // const [productAddTrigger, setProductAddTrigger] = useState<number>(0)
  // const [isModalOpenAnimation, setIsModalOpenAnimation] = useState<boolean>(false)
  // const [modal, setModal] = useState<MenuModal>({type: null, show: false})
  // const [confirmationModalData, setConfirmationModalData] = useState<{
  //   show: boolean
  //   text: string
  //   onYesCallback: () => void
  //   onNoCallback: () => void
  //   blockScroll: boolean
  // }>({
  //   show: false,
  //   text: '',
  //   onYesCallback: () => {},
  //   onNoCallback: () => {},
  //   blockScroll: false
  // })

  useEffect(() => {
    // productStore.fetchProducts()   
    
    const fetchOrders = async () => {
      setOrders((await OrdersService.getOrders()).data.orders)
    }
    fetchOrders()
    document.body.style.overflow = 'visible'


    // setOrders([
    //   {
    //     id: 0,
    //     userId: 100230,
    //     phoneNumber: '+380 93 876 9456',
    //     address: 'Львівська обл., м. Львів, вул. Січових Стрільців, 13',
    //     orderStatus: 'Оплачено',
    //     orderDate: new Date('02.13.2024'),
    //     totalPrice: 1444,
    //     shippingCost: 70,
    //     deliveryType: 'Cамовивіз'
    //   },
    //   {
    //     id: 1,
    //     userId: 12141230,
    //     phoneNumber: '+380 68 516 0715',
    //     address: 'Львівська обл., м. Львів, вул. Трускавецька, 133',
    //     orderStatus: 'В дорозі',
    //     orderDate: new Date('02.15.2024'),
    //     totalPrice: 20004,
    //     shippingCost: 70,
    //     deliveryType: 'Доставка курʼєром'
    //   },
    //   {
    //     id: 2,
    //     userId: 1002112530,
    //     phoneNumber: '+380 93 855 4326',
    //     address: 'Львівська обл., м. Львів, вул. Пасічна, 22',
    //     orderStatus: 'Отримано',
    //     orderDate: new Date(),
    //     totalPrice: 1414,
    //     shippingCost: 0,
    //     deliveryType: 'Cамовивіз'
    //   },
    //   {
    //     id: 3,
    //     userId: 3333333,
    //     phoneNumber: '+380 97 155 4516',
    //     address: 'Львівська обл., м. Львів, вул. Пасічна, 22',
    //     orderStatus: 'Отримано',
    //     orderDate: new Date('03.17.2024'),
    //     totalPrice: 1414,
    //     shippingCost: 0,
    //     deliveryType: 'Cамовивіз'
    //   }
    // ])
    // setSa
  }, [])

  // useEffect(() => {
  //   // setFilteredOrders()
  //   // const datesSet = [...new Set(filteredOrders.map(order => order.orderDate.toLocaleDateString()))]
  //   // setDates(datesSet.map(date => {
  //   //   let foundIndex = -1
  //   //   // let datesArray = []
  //   //   filteredOrders.forEach((order, index) => {
  //   //     if (order.orderDate.toLocaleDateString() === date) {
  //   //       console.log(index)
  //   //       foundIndex = index
  //   //       return
  //   //     }
  //   //   })
  //   //   return (
  //   //     {
  //   //       date: date,
  //   //       index: foundIndex,
  //   //       count: filteredOrders.filter((order, index) => order.orderDate.toLocaleDateString() === date).length
  //   //     }
  //   //   )
  //   // }))
  //   // setDates({
  //   //   date: [],

  //   // })

  //   orders
  //     .filter(order => {
  //       return (order.id+"/"+order.userId+"/"+order.phoneNumber+"/"+order.address+"/"+order.orderDate.toLocaleDateString())
  //           .toLowerCase()
  //           .includes(searchValue.toLowerCase())
  //     })
  //     .forEach(order => {
  //       const dateKey = order.orderDate.toLocaleDateString()
  //       if (!groupedOrders[dateKey]) {
  //         groupedOrders[dateKey] = []
  //       }
  //       groupedOrders[dateKey].push(order)
  //     })
  //   console.log(dates)
  // }, [searchValue])

  useEffect(() => {
    const grouped: { [key: string]: Order[] } = {}

    orders
      .filter(order => {
        // return (order.id+"/"+order.userId+"/"+order.phoneNumber+"/"+order.address+"/"+order.orderDate.toLocaleDateString())
        return (order.id+"/"+order.userId+"/"+order.phoneNumber+"/"+order.address+"/"+new Date(order.orderDate).toLocaleDateString())
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      })
      .forEach(order => {
        const dateKey = new Date(order.orderDate).toLocaleDateString()
        // const dateKey = order.orderDate
        if (!grouped[dateKey]) {
          grouped[dateKey] = []
        }
        grouped[dateKey].push(order)
      })
    // console.log(orders)
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