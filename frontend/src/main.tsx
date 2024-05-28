import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import Store from './store/store.ts'
import ProductStore from './store/productStore.ts'

interface StoreType {
  store: Store
  productStore: ProductStore
}

const store = new Store()
const productStore = new ProductStore()

export const Context = createContext<StoreType>({
  store,
  productStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider value={{
      store,
      productStore
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
