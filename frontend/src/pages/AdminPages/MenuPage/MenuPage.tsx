import { FC, useContext, useEffect } from "react"
import CategoriesPage from "./CategoriesPage"
import ProductsPage from "./ProductsPage"
import { observer } from "mobx-react-lite"
import { Context } from "@/main"

const MenuPage: FC = () => {
  const { productStore } = useContext(Context)

  useEffect(() => {
    productStore.setSelectedCategory({
      category: {
        id: 0, 
        name: ''
      }, 
      next: false
    })
  }, [])

  return (
    <>
      {
        !productStore.selectedCategory.next ? 
          <CategoriesPage next={() => productStore.setSelectedCategory({
            category: productStore.selectedCategory.category,
            next: true
          })} 
        /> : 
        <ProductsPage back={() => productStore.setSelectedCategory({
            category: {
              id: 0, 
              name: ''
            }, 
            next: false
          })
        } />
      }
    </>
  )
}

export default observer(MenuPage)