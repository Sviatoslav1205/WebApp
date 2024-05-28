import { useNavigate } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction, useContext } from "react"
import { Context } from '@/main'
import userIcon from '@/images/loginButton/userIcon.svg'
import styles from "./LoginButton.module.scss"

interface LoginButtonProps {
  setShowNavBar: Dispatch<SetStateAction<boolean>>
}

const LoginButton: FC<LoginButtonProps> = ({ setShowNavBar }) => {
  const navigate = useNavigate()
  const { store } = useContext(Context)

  return (
    <div className={styles.container}>
      <img src={userIcon} alt="" className={styles.icon}/>
      <button className={styles.btn} onClick={() => {
          !store.isAuth ? navigate('/login') : store.logout()
          setShowNavBar(false)
        }}>
        {!store.isAuth ? 'Увійти' : 'Вийти'}
      </button>
    </div>
  )
}

export default observer(LoginButton)