import { CSSProperties, FC } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
  text: string
  theme: 'grey' | 'red' | 'green'
  size?: 'small' | 'big'
  borders?: 'rounded' | 'square'
  style?: CSSProperties
  onButtonClick: () => void
}

const Button: FC<ButtonProps> = ({ text, theme, size, borders, style, onButtonClick }) => {
  return (
    <button 
      onClick={onButtonClick} 
      className={`
        ${styles.button} 
        ${
          theme === 'grey' ? styles.grey : 
          theme === 'red' ? styles.red : 
          theme === 'green' ? styles.green : 
          null
        } 
        ${
          size === 'small' ? styles.small : 
          size === 'big' ? styles.big : 
          null
        }
        ${
          borders === 'rounded' ? styles.rounded : 
          borders === 'square' ? styles.square : 
          null
        }
      `} 
      style={{ 
          ...style
        }}
      >
        {text}
      </button>
  )
}

export default Button