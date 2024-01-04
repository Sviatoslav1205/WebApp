import './App.scss'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react'

import BirthDateSelect from './components/BirthDateSelect/BirthDateSelect'

const tg: WebApp = Telegram.WebApp

const App = () => {
  useEffect(() => {
    tg.ready()
  }, [])

  tg.expand()
  tg.setHeaderColor("secondary_bg_color")
  tg.setBackgroundColor("secondary_bg_color")
  // tg.sendData(JSON.stringify({
  //   userId: 1,
  //   birthDate: '2002-10-14'
  // }))

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path='/' element={}/> */}
          <Route path='/birh-date-select/:userId' element={<BirthDateSelect tg={tg}/>}/>
          {/* <Route path='/about_us' element={<AboutUsPage />}/> */}
          {/* <Route path='*' element={<Navigate to='/'/>}/> */}
        </Routes>
      </Router>
      {/* <div className='f'>
      <h1>RRR</h1>
      <button onClick={() => tg.HapticFeedback.notificationOccurred("error")}>Click</button>
    </div> */}
    </div>
  )
    
  
}

export default App
