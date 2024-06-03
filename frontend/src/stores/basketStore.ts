import { API_URL, IMAGES_URL } from "@/https"
import UserService from "@/services/User.service"
import { Category } from "@/types/Category"
import { ProductData } from "@/types/ProductData"
import { SelectedCategory } from "@/types/SelectedCategory"
import _ from "lodash"
import { makeAutoObservable } from "mobx"
import { makePersistable } from 'mobx-persist-store';
// import localForage from "localforage";


export default class BasketStore {
  products: {
    product: ProductData
    count: number
  }[] = []

  constructor() {
    makeAutoObservable(this)
    makePersistable(
      this,
      {
        name: 'SampleStore',
        properties: ['products'],
        storage: localStorage,
        expireIn: 259200000,
        // stringify: false,
        debugMode: true,
      },
      // { delay: 200, fireImmediately: false },
    )
    
  }

  addProduct(productToAdd: ProductData) {
    // this.products = this.products.indexOf({product: productToAdd, count: })
    if (this.products.length === 0) {
      this.products = [{product: productToAdd, count: 1}]
      return
    }
    
    let tempArray = [...this.products]
    let tempArrayIndex = -1
    if (tempArray.filter((product, index) => {
      if (_.isEqual(product.product, productToAdd)) {
        tempArrayIndex = index
        return true
      } else {
        return false
      }
    }).length !== 0) {
      tempArray[tempArrayIndex] = {
        product: tempArray[tempArrayIndex].product,
        count: tempArray[tempArrayIndex].count+1
      }
      this.products = [...tempArray]
    } else {
      this.products = [...tempArray, {product: productToAdd, count: 1}]
    }
    // this.products = (tempArray.filter((product) => _.isEqual(product.product, productToAdd))) ? [] : [...tempArray, {product: productToAdd, count: 1}]
    // [...this.products, product]
  }

  removeProduct(productToRemove: ProductData) {
    // this.products = [...this.products.filter((product) => {

    // })]

    if (this.products.length === 0) {
      return
    }
    
    let tempArray = [...this.products]
    let tempArrayIndex = -1
    if (tempArray.filter((product, index) => {
      if (_.isEqual(product.product, productToRemove)) {
        tempArrayIndex = index
        return true
      } else {
        return false
      }
    }).length !== 0) {
      if (tempArray[tempArrayIndex].count === 1) {
        this.deleteProduct(productToRemove)
      } else {
        tempArray[tempArrayIndex] = {
          product: tempArray[tempArrayIndex].product,
          count: tempArray[tempArrayIndex].count-1
        }
        this.products = [...tempArray]
      }
    } else {
      return
    }
  }

  deleteProduct(productToDelete: ProductData) {
    // this.products = this.products.indexOf({product: productToAdd, count: })
    
    // console.log('delete')

    if (this.products.length === 0) {
      return
    }
    
    let tempArray = [...this.products]
    let tempArrayIndex = -1
    if (tempArray.filter((product, index) => {
      if (_.isEqual(product.product, productToDelete)) {
        tempArrayIndex = index
        return true
      } else {
        return false
      }
    }).length !== 0) {
      tempArray.splice(tempArrayIndex, 1)
      // console.log(tempArray)
      // console.log()
      this.products = [...tempArray]
    } else {
      return
      // this.products = [...tempArray, {product: productToDelete, count: 1}]
    }


    // this.products = (tempArray.filter((product) => _.isEqual(product.product, productToAdd))) ? [] : [...tempArray, {product: productToAdd, count: 1}]
    // [...this.products, product]
  }

  // setProducts(products: ProductData[]) {
  //   this.products = products
  // }

  // async fetchCategories() {
  //   await UserService.getCategories().then(response => {
  //     this.setCategories(response.data.categories)
  //   })
  // }

  // async fetchProducts() {
  //   await UserService.getProducts().then(response => {
  //     this.setProducts([...response.data.products.map(({photo: value, ...rest}) => ({photo: IMAGES_URL+'/'+value, ...rest}))])
  //   })
  // }

  // getProductsByCategory = (categoryId: number = this.selectedCategory.category.id) => {
  //   if (categoryId === -1) {
  //     return this.products
  //   } else {
  //     return this.products.filter(product => product.categoryId === categoryId)
  //   }
  // }
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