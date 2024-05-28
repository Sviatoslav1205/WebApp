import { CSSProperties, FC } from "react"
import icon from "@/images/backButton/backButtonIcon.svg"
import styles from "./BackButton.module.scss"

interface BackButtonProps {
  theme: 'grey' | 'red'
  // size?: 'small' | 'big'
  style?: CSSProperties
  onButtonClick: () => void
}

const BackButton: FC<BackButtonProps> = ({ theme, style, onButtonClick }) => {
  return (
    <button 
      onClick={onButtonClick} 
      className={`${styles.button} ${theme === 'grey' ? styles.grey : theme === 'red' ? styles.red : null}`} style={{ 
          ...style
        }}
      >
        <img className={styles.icon} src={icon} alt="" />
      </button>
  )
}

export default BackButton