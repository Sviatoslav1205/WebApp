import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import BirthDateSelectPage from '@/pages/BirthDateSelectPage/BirthDateSelectPage'
import NavBar from '@/components/NavBar/NavBar'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import LoginPage from '@/pages/LoginPage'
import MainPage from '@/pages/MainPage'
import MailingPage from '@/pages/AdminPages/MailingPage'
import UsersPage from '@/pages/AdminPages/UsersPage'
import MenuPage from '@/pages/AdminPages/MenuPage'
// import AdminPage from '@/pages/AdminPages'
import CheckRole from '@/routes/CheckRole'
import Header from '@/components/Header'
import ModalContainer from '@/components/ModalContainer'
import SlideDownModal from '@/components/SlideDownModal'
import BasketModal from './components/BasketModal'
import ProductModal from './components/ProductModal'
import { ProductData } from './types/ProductData'

const tg: WebApp = Telegram.WebApp

const App = () => {
  const { store } = useContext(Context)
  useEffect(() => {
    tg.ready()
    if (tg.initDataUnsafe.user) {
      store.setUserId(
        tg.initDataUnsafe.user.id
      )
    }
    
    if (localStorage.getItem('accessToken')) {
      store.checkAuth()
    }

    document.body.style.setProperty('overflow', 'hidden', 'important')
    // useEffect(()=>{document.body.style.setProperty('overflow', showBasket ? 'hidden' : 'visible', 'important')}, [showBasket])
  }, [])

  const [showNavBar, setShowNavBar] = useState<boolean>(false)
  // const [showBasket, setShowBasket] = useState<boolean>(false)
  // const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false)
  // const [isModalOpenAnimation, setIsModalOpenAnimation] = useState<boolean>(false)
  tg.expand()
  tg.setHeaderColor("secondary_bg_color")
  tg.setBackgroundColor("secondary_bg_color")

  if(store.isLoading) {
    return (
      <div>Завантаження...</div>
    )
  }

  // useEffect(()=>document.body.style.setProperty('overflow', 'hidden'), [showBasket])
  // useEffect(()=>{}, [])
  // useEffect(()=>{document.body.style.overflow = showBasket ? 'hidden' : 'visible'}, [])
  

  return (
    <div className="App">
      <Router>
        <Header showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
        <NavBar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
        {/* <ModalContainer showModal={showBasket} blockScroll={true} onClose={() => {
          setIsModalOpenAnimation(false)
          setTimeout(() => {
            setShowBasket(false)
          }, 300)
        }} >
          {/* {document.body.style.setProperty('overflow', showBasket ? 'hidden' : 'visible', 'important')} *}
          <SlideDownModal isFullscreenOpen={false} setIsFullscreenOpen={setIsFullscreenOpen} isModalOpenAnimation={isModalOpenAnimation} setIsModalOpenAnimation={setIsModalOpenAnimation} >
            <BasketModal showBasket={showBasket} onBack={() => {
              setIsModalOpenAnimation(false)
              setTimeout(() => {
                setShowBasket(false)
              }, 300)
            }} />
          </SlideDownModal>
        </ModalContainer> */}

      {/* <ModalContainer showModal={showBasket} blockScroll={true} onClose={() => {
        setIsModalOpenAnimation(false)
        setTimeout(() => {
          setShowBasket(false)
        }, 300)
      }}>
        <SlideDownModal isFullscreenOpen={false} setIsFullscreenOpen={setIsFullscreenOpen} isModalOpenAnimation={isModalOpenAnimation} 
          setIsModalOpenAnimation={setIsModalOpenAnimation} isProductModal={true}
        >
          <ProductModal product={{} as ProductData} onBack={() => {
            setIsModalOpenAnimation(false)
            setTimeout(() => {
              setShowBasket(false)
            }, 300)}
          } />
        </SlideDownModal>
      </ModalContainer> */}


        <Routes>
          {/* <Route path='/' element={<LoginForm />}/> */}
          <Route path='/' element={<MainPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          {/* <Route path='/admin' element={<CheckRole roles={['admin']} />}> */}
          <Route path='/admin' element={<CheckRole roles={[]} />}>
            {/* <Route path='' element={<AdminPage />}/> */}
            <Route path='mailing' element={<MailingPage />}/>
            <Route path='users' element={<UsersPage />}/>
            <Route path='menu' element={<MenuPage />}/>
          </Route>
          <Route path='/birh-date-select/:userId' element={<BirthDateSelectPage tg={tg} />}/>
          {/* <Route path='/about_us' element={<AboutUsPage />}/> */}
          {/* <Route path='*' element={<Navigate to='/'/>}/> */}
        </Routes>
      </Router>
    </div>
  )
    
  
}

export default observer(App)
