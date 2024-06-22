import { CSSProperties, FC } from "react"
import icon from "@/images/backButton/backButtonIcon.svg"
import styles from "./BackButton.module.scss"

interface BackButtonProps {
  theme: 'grey' | 'red'
  style?: CSSProperties
  iconStyle?: CSSProperties
  onButtonClick: () => void
}

const BackButton: FC<BackButtonProps> = ({ theme, style, iconStyle, onButtonClick }) => {
  return (
    <button 
      onClick={onButtonClick} 
      className={`${styles.button} ${theme === 'grey' ? styles.grey : theme === 'red' ? styles.red : null}`} style={{ 
          ...style
        }}
      >
        <img className={styles.icon} src={icon} alt="" style={{ 
          ...iconStyle
        }}/>
      </button>
  )
}

export default BackButton