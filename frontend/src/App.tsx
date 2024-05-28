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
  }, [])

  const [showNavBar, setShowNavBar] = useState<boolean>(false)
  tg.expand()
  tg.setHeaderColor("secondary_bg_color")
  tg.setBackgroundColor("secondary_bg_color")

  if(store.isLoading) {
    return (
      <div>Завантаження...</div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Header showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
        <NavBar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
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
