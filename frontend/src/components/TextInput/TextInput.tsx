import { CSSProperties, ChangeEvent, FC } from "react"
import styles from "./TextInput.module.scss"
import { CustomError } from "@/types/CustomError"

interface TextInputProps {
  border?: boolean
  error?: CustomError
  label?: string
  theme: "red" | "white"
  size: "small" | "big" | "relative"
  isFocusEnabled?: boolean
  inputType: "singleLine" | "multiLine"
  type?: "text" | "password"
  maxLength?: number
  placeholder?: string | undefined
  value: string | number | readonly string[] | undefined
  style?: CSSProperties
  readonly?: boolean
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "numeric" | "none" | "decimal" | undefined
  onValueChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const TextInput: FC<TextInputProps> = ({ border, error, label, theme, size, isFocusEnabled, inputType, type="text", maxLength, placeholder, value, style, readonly, inputMode, onValueChange }) => {

  const className = `${styles.input} 
    ${size === "big" ? styles.big : size === "small" ? styles.small : size === "relative" ? styles.relative : null}
    ${isFocusEnabled ? null : styles.disableFocus}
    ${theme === "red" ? styles.red : theme === "white" ? styles.white : null}
    ${border ? styles.border : null} ${error?.show ? styles.incorrect : null}`

  if (inputType === "singleLine") {
    return (
      <div className={styles.container}>
        <div className={`${size === "big" ? styles.big : size === "small" ? styles.small : null}`} style={{...style, position: 'relative'}}>
          {error?.show ? 
            <span className={styles.errorMessage}>{error.message}</span> 
            : 
            <span className={`${styles.label} ${theme === "white" ? styles.whiteLabel : null}`}>{label}</span>
          }
          <input type={type} placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} value={value} onChange={onValueChange} 
            className={className} style={{...style}} readOnly={readonly}
          />
        </div>
      </div>
    )
  } else if (inputType === "multiLine") {
    return (
      <div className={styles.container}>
        <div className={`${size === "big" ? styles.big : size === "small" ? styles.small : null}`} style={{...style, position: 'relative'}}>
          {error?.show ? 
            <span className={styles.errorMessage}>{error.message}</span> 
            : 
            <span className={`${styles.label} ${theme === "white" ? styles.whiteLabel : null}`}>{label}</span>
          }
          <textarea placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} value={value} onChange={onValueChange} 
            className={className}
            style={{...style, position: 'relative', padding: '10px'}}
            cols={30} rows={9} readOnly={readonly}
          />
        </div>
      </div>
    )
  } else return null
  
}

export default TextInput