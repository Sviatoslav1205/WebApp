import { Link } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import { Context } from '@/main'
import { NavItem } from "@/types/NavItem"
import getNavItems from "./getNavItems"
import LoginButton from "@/components/LoginButton"
import styles from "./NavBar.module.scss"

interface NavBarProps {
  showNavBar: boolean
  setShowNavBar: Dispatch<SetStateAction<boolean>>
}

const NavBar: FC<NavBarProps> = ({ showNavBar, setShowNavBar }) => {
  const { store } = useContext(Context)
  const [navItems, setNavItems] = useState<NavItem[]>([])

  useEffect(() => {
    setNavItems(getNavItems(store.user.role))
  }, [store.user])

  document.body.style.overflow = showNavBar ? 'hidden' : 'visible'

  return (
    <>
      <div className={showNavBar ? `${styles.background} ${styles.active}` : styles.background} 
        onClick={() => setShowNavBar(false)}></div>
      <nav className={showNavBar ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu}>
        {/* <button>Login</button> */}
        {/* <LoginButton />
        <LoginButton /> */}
        <LoginButton setShowNavBar={setShowNavBar}/>
        
        {/* <button onClick={() => setShowNavBar(false)}>
          <img src={BurgerButton} alt="Burger" className={styles.burger_button}/>
        </button> */}
        <ul className={styles.nav_links}>
          {navItems.map((item, index) => {
            return (
              // <li key={index} onClick={() => setShowNavBar(false)}>
              //   <Link to={item.path}> 
              //     {item.title}
              //   </Link>
              // </li>
              <li key={index} onClick={() => setShowNavBar(false)}>
                <Link to={item.path}> 
                  <h2>
                    {item.title}
                  </h2>
                </Link>
              </li>
            )
          })}
        </ul> 
      </nav>
    </>
  )
}

export default observer(NavBar)