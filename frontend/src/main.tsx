import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import Store from '@/stores/store.ts'
import ProductStore from '@/stores/productStore.ts'
import BasketStore from '@/stores/basketStore.ts'

interface StoreType {
  store: Store
  productStore: ProductStore
  basketStore: BasketStore
}

const store = new Store()
const productStore = new ProductStore()
const basketStore = new BasketStore

export const Context = createContext<StoreType>({
  store,
  productStore,
  basketStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider value={{
      store,
      productStore,
      basketStore
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
)
