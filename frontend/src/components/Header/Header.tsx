import { Dispatch, FC, SetStateAction } from "react"
import BurgerButton from "@/images/burgerMenu/BurgerButton.svg"
import styles from "./Header.module.scss"

interface HeaderProps {
  showNavBar: boolean
  setShowNavBar: Dispatch<SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({ showNavBar, setShowNavBar }) => {
  const changeShowNavBar = () => setShowNavBar(!showNavBar)
  return (
    <div className={styles.header}>
      <img src={BurgerButton} alt="Burger" onClick={changeShowNavBar} className={showNavBar ? `${styles.burger_button} ${styles.clicked}` : `${styles.burger_button}`}/>

      {/* <button onClick={changeShowNavBar} className={showNavBar ? `${styles.burger_button} ${styles.clicked}` : `${styles.burger_button}`}>
        <img src={BurgerButton} alt="Burger" />
      </button> */}
      
      <h1 className={styles.logo}>Soloha</h1>
    </div>
  )
}

export default Header