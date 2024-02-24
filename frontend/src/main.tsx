import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import Store from './store/store.ts'

interface StoreType {
  store: Store
}

const store = new Store()

export const Context = createContext<StoreType>({
  store
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider value={{
      store
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
