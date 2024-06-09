import { IMAGES_URL } from "@/https"
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

  searchProducts = (str: string) => {
    if (str === "") {
      return this.products
    } else {
      return this.products.filter(product => [product.name, product.description, product.price, product.weight].join('/').toLowerCase().includes(str.toLowerCase()))
    }
  }
}