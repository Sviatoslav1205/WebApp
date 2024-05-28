import { CSSProperties, FC } from "react"
import styles from "./TextContainer.module.scss"

interface TextContainerProps {
  text: string
  theme: 'grey' | 'red'
  style?: CSSProperties
}

const TextContainer: FC<TextContainerProps> = ({ text, theme, style }) => {
  return (
    <div 
      className={`${styles.textContainer} ${theme === 'grey' ? styles.grey : theme === 'red' ? styles.red : null}`} style={{ 
          ...style
        }}
      >
        {text}
    </div>
  )
}

export default TextContainer