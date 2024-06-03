import { API_URL, IMAGES_URL } from "@/https"
import UserService from "@/services/User.service"
import { Category } from "@/types/Category"
import { ProductData } from "@/types/ProductData"
import { SelectedCategory } from "@/types/SelectedCategory"
import { makeAutoObservable } from "mobx"

export default class ProductStore {
  categories: Category[] = []
  selectedCategory: SelectedCategory = {category: {id: 0, name: ''}, next: false}
  products: ProductData[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setCategories(categories: Category[]) {
    this.categories = categories
  }

  setSelectedCategory(category: SelectedCategory) {
    this.selectedCategory = category
  }

  setProducts(products: ProductData[]) {
    this.products = products
  }

  async fetchCategories() {
    await UserService.getCategories().then(response => {
      this.setCategories(response.data.categories)
    })
  }

  async fetchProducts() {
    await UserService.getProducts().then(response => {
      this.setProducts([...response.data.products.map(({photo: value, ...rest}) => ({photo: IMAGES_URL+'/'+value, ...rest}))])
    })
  }

  getProductsByCategory = (categoryId: number = this.selectedCategory.category.id) => {
    if (categoryId === -1) {
      return this.products
    } else {
      return this.products.filter(product => product.categoryId === categoryId)
    }
  }
}


// import { API_URL, IMAGES_URL } from "@/https"
// import UserService from "@/services/User.service"
// import { Category } from "@/types/Category"
// import { ProductData } from "@/types/ProductData"
// import { SelectedCategory } from "@/types/SelectedCategory"
// import { makeAutoObservable } from "mobx"

// export default class ProductStore {
//   categories: Category[] = []
//   selectedCategory: SelectedCategory = { category: { id: 0, name: '' }, next: false }
//   products: ProductData[] = []

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true })
//   }

//   setCategories(categories: Category[]) {
//     this.categories = categories
//   }

//   setSelectedCategory(category: SelectedCategory) {
//     this.selectedCategory = category
//   }

//   setProducts(products: ProductData[]) {
//     this.products = products
//   }

//   async fetchCategories() {
//     try {
//       const response = await UserService.getCategories()
//       this.setCategories(response.data.categories)
//     } catch (error) {
//       console.error('Failed to fetch categories', error)
//       // Handle error appropriately (e.g., set an error state, show a notification)
//     }
//   }

//   async fetchProducts() {
//     try {
//       const response = await UserService.getProducts()
//       const products = response.data.products.map(({ photo: value, ...rest }) => ({
//         photo: `${IMAGES_URL}/${value}`,
//         ...rest
//       }))
//       this.setProducts(products)
//     } catch (error) {
//       console.error('Failed to fetch products', error)
//       // Handle error appropriately (e.g., set an error state, show a notification)
//     }
//   }

//   getProductsByCategory(categoryId: number = this.selectedCategory.category.id) {
//     return this.products.filter(product => product.categoryId === categoryId)
//   }
// }