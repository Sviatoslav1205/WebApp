import { Context } from "@/main"
import { FC, useContext, useEffect, useRef, useState } from "react"
import solohaImage from "@/images/solohaMainImage/solohaImage.png"
import styles from "./MainPage.module.scss"
import SearchInput from "@/components/SearchInput"
import ProductCard from "@/components/ProductCard"
import { ProductData } from "@/types/ProductData"
import { Category } from "@/types/Category"
import ModalContainer from "@/components/ModalContainer"
import SlideDownModal from "@/components/SlideDownModal"
import ProductModal from "@/components/ProductModal"

const MainPage: FC = () => {
  const { productStore } = useContext(Context)
  const [rerender, setRerender] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(-1)
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: -1,
    name: 'Усі'
  })
  const [selectedProduct, setSelectedProduct] = useState<{
    product: ProductData
    showModal: boolean
  }>({
    product: {} as ProductData,
    showModal: false
  })
  const [, setIsFullscreenOpen] = useState<boolean>(false)
  const [isModalOpenAnimation, setIsModalOpenAnimation] = useState<boolean>(false)
  const categoriesListRef = useRef<HTMLUListElement>(null)

  const setFade = () => {
    const element = categoriesListRef.current
    if (!element) return

    const isScrollable = (element.scrollWidth) > (element.clientHeight)
    
    if (!isScrollable) {
      element.classList.remove(styles.isLeftOverflowing, styles.isRightOverflowing)
      return
    }

    const isScrolledToRight = element.scrollWidth < element.clientWidth + element.scrollLeft + 5
    const isScrolledToLeft = (element.scrollWidth < element.clientWidth + element.scrollLeft) ? false : element.scrollLeft <= 5

    element.classList.toggle(styles.isRightOverflowing, !isScrolledToRight)
    element.classList.toggle(styles.isLeftOverflowing, !isScrolledToLeft)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await productStore.fetchCategories()
      await productStore.fetchProducts()
      setRerender(rerender+1)
    }
    fetchData()
    
    setFade()
  }, [])

  useEffect(() => {
    if (selectedCategoryIndex === -1) {
      setSelectedCategory({
        id: -1,
        name: 'Усі'
      })
    } else {
      setSelectedCategory(productStore.categories[selectedCategoryIndex])
    }
  }, [selectedCategoryIndex])

  return (
    <>
      <ModalContainer showModal={selectedProduct.showModal} blockScroll={true} onClose={() => {
        setIsModalOpenAnimation(false)
        setTimeout(() => {
          setSelectedProduct({
            product: {} as ProductData,
            showModal: false
          })
        }, 300)
      }}>
        <SlideDownModal isFullscreenOpen={false} setIsFullscreenOpen={setIsFullscreenOpen} isModalOpenAnimation={isModalOpenAnimation} 
          setIsModalOpenAnimation={setIsModalOpenAnimation} isProductModal={true}
        >
          <ProductModal product={selectedProduct.product} onBack={() => {
            setIsModalOpenAnimation(false)
            setTimeout(() => {
              setSelectedProduct({
                product: {} as ProductData,
                showModal: false
              })
            }, 300)}
          } />
        </SlideDownModal>
      </ModalContainer>

      <div className={styles.searchContainer}>
        <img src={solohaImage} alt="" className={styles.solohaImage} />
        <SearchInput value={searchValue} onValueChange={(e) => {
          setSearchValue(e.target.value)
          setSelectedCategoryIndex(-1)
        }} />
      </div>
      <div className={styles.categorySelectorContainer}>
        <div className={styles.categoryIndicatorsContainer}>
          <div className={`${styles.categoryIndicator} ${selectedCategoryIndex === -1 ? styles.selectedIndicator : null}`}
            onClick={() => setSelectedCategoryIndex(-1)}
          ></div>
          {productStore.categories.map((category, index) => {
            return (
              <div className={`${styles.categoryIndicator} ${selectedCategoryIndex === index ? styles.selectedIndicator : null}`} key={category.id}
                onClick={() => setSelectedCategoryIndex(index)}
              ></div>
            )
          })}
        </div>
        <ul className={styles.categoriesList} ref={categoriesListRef} onScroll={setFade}>
          <li className={`${styles.listItem} ${selectedCategoryIndex === -1 ? styles.selectedCategory : null}`}
            onClick={() => setSelectedCategoryIndex(-1)}
          >Усі</li>
          {productStore.categories.map((category, index) => {
            return (
              <li key={category.id} className={`${styles.listItem} ${selectedCategoryIndex === index ? styles.selectedCategory : null}`}
                onClick={() => setSelectedCategoryIndex(index)}
              >{category.name}</li>
            )
          })}
        </ul>
      </div>
      <div className={styles.productsContainer}>
        {searchValue ? 
        productStore.searchProducts(searchValue).map(product => {
          return (
            <ProductCard product={product} onCardClick={() => setSelectedProduct({
              product: product,
              showModal: true
            })} key={product.id}/>
          )
        }) :
        productStore.getProductsByCategory(selectedCategory.id).map(product => {
          return (
            <ProductCard product={product} onCardClick={() => setSelectedProduct({
              product: product,
              showModal: true
            })} key={product.id}/>
          )
        })}
      </div>
    </>
  )
}

export default MainPage