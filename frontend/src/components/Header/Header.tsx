import { Dispatch, FC, SetStateAction, useState } from "react"
import BurgerButton from "@/images/burgerMenu/BurgerButton.svg"
import BasketButton from "@/images/basketButton/BasketButton.svg"
import styles from "./Header.module.scss"
import ModalContainer from "@/components/ModalContainer"
import SlideDownModal from "@/components/SlideDownModal"
import BasketModal from "@/components/BasketModal"
// import BasketModal from "@/components/BasketModal"

interface HeaderProps {
  showNavBar: boolean
  setShowNavBar: Dispatch<SetStateAction<boolean>>
  // setShowBasket: Dispatch<SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({ showNavBar, setShowNavBar }) => {
  const changeShowNavBar = () => setShowNavBar(!showNavBar)
  const [showBasket, setShowBasket] = useState<boolean>(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false)
  const [isModalOpenAnimation, setIsModalOpenAnimation] = useState<boolean>(false)
  return (
    <>
      <ModalContainer showModal={showBasket} blockScroll={true} onClose={() => {
          setIsModalOpenAnimation(false)
          setTimeout(() => {
            setShowBasket(false)
          }, 300)
        }} >
          {/* {document.body.style.setProperty('overflow', showBasket ? 'hidden' : 'visible', 'important')} */}
          <SlideDownModal isFullscreenOpen={isFullscreenOpen} setIsFullscreenOpen={setIsFullscreenOpen} isModalOpenAnimation={isModalOpenAnimation} setIsModalOpenAnimation={setIsModalOpenAnimation} >
            <BasketModal setIsFullscreenOpen={setIsFullscreenOpen} onBack={() => {
              setIsModalOpenAnimation(false)
              setTimeout(() => {
                setShowBasket(false)
              }, 300)
            }} />
          </SlideDownModal>
        </ModalContainer>

      <div className={styles.buttonContainer}>
        <img src={BurgerButton} alt="Burger" onClick={changeShowNavBar} className={showNavBar ? `${styles.burgerButton} ${styles.clicked}` : `${styles.burgerButton}`}/>
      </div>
      <div className={styles.header}>
        <h1 className={styles.logo}>Soloha</h1>
      </div>
      <div className={styles.basketButtonContainer}>
        {/* <img src={BurgerButton} alt="Burger" onClick={changeShowNavBar} className={showNavBar ? `${styles.burger_button} ${styles.clicked}` : `${styles.burger_button}`}/> */}
        <img src={BasketButton} alt="Burger" onClick={() => setShowBasket(true)} className={styles.basketButton} />
        {/* <p className={styles.title}>Кошик</p> */}
      </div>
    </>
  )
}

export default Header