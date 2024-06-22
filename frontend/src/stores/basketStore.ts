import { ProductData } from "@/types/ProductData"
import _ from "lodash"
import { makeAutoObservable } from "mobx"
import { makePersistable } from 'mobx-persist-store';


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
        debugMode: false,
      }
    )
    
  }

  addProduct(productToAdd: ProductData) {
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
  }

  removeProduct(productToRemove: ProductData) {
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
      this.products = [...tempArray]
    } else {
      return
    }
  }

  clear() {
    this.products = []
  }
}