import { ChangeEvent, FC } from "react"
import styles from "./TextInput.module.scss"
import { CustomError } from "@/types/CustomError"

interface TextInputProps {
  border?: boolean
  error?: CustomError
  label?: string
  theme: "red" | "white"
  size: "small" | "big"
  inputType: "singleLine" | "multiLine"
  maxLength?: number
  placeholder?: string | undefined
  value: string | number | readonly string[] | undefined
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "numeric" | "none" | "decimal" | undefined
  onValueChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const TextInput: FC<TextInputProps> = ({ border, error, label, theme, size, inputType, maxLength, placeholder, value, inputMode, onValueChange }) => {

  const className = `${styles.input} ${size === "big" ? styles.big : size === "small" ? styles.small : null}
    ${theme === "red" ? styles.red : theme === "white" ? styles.white : null}
    ${border ? styles.border : null} ${error?.show ? styles.incorrect : null}`

  if (inputType === "singleLine") {
    return (
      <div className={styles.container}>
        <div className={`${size === "big" ? styles.big : size === "small" ? styles.small : null}`} style={{position: 'relative'}}>
          {error?.show ? 
            <span className={styles.errorMessage}>{error.message}</span> 
            : 
            <span className={styles.label}>{label}</span>
          }
          <input type="text" placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} value={value} onChange={onValueChange} 
            className={className}
          />
        </div>
      </div>
    )
  } else if (inputType === "multiLine") {
    return (
      <div className={styles.container}>
        <div className={`${size === "big" ? styles.big : size === "small" ? styles.small : null}`} style={{position: 'relative'}}>
          {error?.show ? 
            <span className={styles.errorMessage}>{error.message}</span> 
            : 
            <span className={styles.label}>{label}</span>
          }
          <textarea placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} value={value} onChange={onValueChange} 
            className={className}
            cols={30} rows={9}
          />
        </div>
      </div>
    )
  } else return null
  
}

export default TextInput