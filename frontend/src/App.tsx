import './App.scss'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'

import BirthDateSelectPage from './pages/BirthDateSelectPage/BirthDateSelectPage'
import LoginForm from './components/LoginForm/LoginForm';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import LoginPage from './pages/LoginPage/LoginPage';

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
        <Routes>
          {/* <Route path='/' element={<LoginForm />}/> */}
          <Route path='/' element={<LoginPage />}/>
          <Route path='/birh-date-select/:userId' element={<BirthDateSelectPage tg={tg}/>}/>
          {/* <Route path='/about_us' element={<AboutUsPage />}/> */}
          {/* <Route path='*' element={<Navigate to='/'/>}/> */}
        </Routes>
      </Router>
    </div>
  )
    
  
}

export default observer(App)
