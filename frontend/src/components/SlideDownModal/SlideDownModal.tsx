import { FC, ReactElement, useState, UIEvent, useEffect, SetStateAction, Dispatch } from "react"
import styles from "./SlideDownModal.module.scss"

interface SlideDownModalProps {
  isProductModal?: boolean
  isFullscreenOpen?: boolean
  setIsFullscreenOpen?: Dispatch<SetStateAction<boolean>>
  isModalOpenAnimation: boolean
  setIsModalOpenAnimation: Dispatch<SetStateAction<boolean>>
  children: ReactElement | null
}

const SlideDownModal: FC<SlideDownModalProps> = ({ isProductModal, isFullscreenOpen, setIsFullscreenOpen, isModalOpenAnimation, setIsModalOpenAnimation, children }) => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(isFullscreenOpen || false)

  useEffect(() => {
    setIsFullscreen(isFullscreenOpen || false)
  }, [isFullscreenOpen])
  
  const isScrollingDown = (scrollTop: number) => {
    let goingDown = false
    if (scrollTop > lastScrollTop) {
      goingDown = true
    }
    setLastScrollTop(scrollTop)
    return goingDown
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement)
    const scrollHeight = target.scrollHeight
    const windowHeight = window.innerHeight
    if (scrollHeight > windowHeight) {
      const scrollTop = target.scrollTop
      if (isScrollingDown(scrollTop) && scrollTop > 20) {
        setIsFullscreen(true)
      } else if (!isScrollingDown(scrollTop) && scrollTop === 0) {
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    setIsModalOpenAnimation(true)
  }, [])

  useEffect(() => {
    setIsFullscreenOpen && setIsFullscreenOpen(isFullscreen)
    if (isFullscreen) {
      document.getElementById('slideDownScrollPanel')?.scrollTo({
        top: 20
      })
    } else {
      document.getElementById('slideDownScrollPanel')?.scrollTo({
        top: 1
      })
    }
  }, [isFullscreen])

  return (
    <div className={`${styles.base} ${isModalOpenAnimation ? styles.open : styles.closed}`}>
      <div className={`${styles.container} ${isFullscreen ? styles.fullscreen : isProductModal ? styles.productModal : styles.partscreen}`} onScroll={handleScroll} id="slideDownScrollPanel">
        {children}
      </div>
    </div>
  )
}

export default SlideDownModal