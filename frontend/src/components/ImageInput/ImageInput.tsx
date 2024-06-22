import { ChangeEvent, FC, useRef } from "react"
import cameraIcon from "@/images/imageInput/placeholder.svg"
import styles from "./ImageInput.module.scss"
import { CustomError } from "@/types/CustomError"

interface ImageInputProps {
  theme: "red" | "white"
  size: "small" | "big" | "huge"
  error?: CustomError
  image: File | null
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
}

const ImageInput: FC<ImageInputProps> = ({ theme, size, error, image, onSelect, onDelete }) => {
  const imageTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const truncateFileName = (fileName: string, n: number) => {
    if (fileName.length <= n) { return fileName }
    const subStringFileName = fileName.slice(0, n-1)
    return subStringFileName + '... .' + fileName.split('.').slice(-1)
  }
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div className={`${styles.container} ${size === "huge" ? styles.huge : size === "big" ? styles.big : size === "small" ? styles.small : null}
        ${theme === "red" ? styles.red : theme === "white" ? styles.white : null}
        ${error?.show ? styles.incorrect : null}`} tabIndex={0}
        ref={containerRef} onClick={() => containerRef.current?.focus()}
      >
        {error?.show && <span className={styles.errorMessage}>{error.message}</span>}
        <input type="file" ref={inputRef} style={{ display: "none" }} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (imageTypes.filter(type => e.target.files ? type === e.target.files[0].type : null).length === 0) return
          onSelect(e)
        }} accept="image/*"/>
        <img src={image ? URL.createObjectURL(image) : cameraIcon} alt="" className={styles.image}/>

        <div className={styles.block}>
          <p className={styles.fileName}>
            {image?.name ? 
              truncateFileName(image.name, 35)
              : 
              "Назва файлу"
            }
          </p>
          <div className={styles.buttonsContainer}>
            <button className={styles.button} onClick={(e) => {
              e.preventDefault()
              inputRef.current?.click()
            }}>Завантажити</button>
            <button className={styles.button} onClick={(e) => {
              e.preventDefault()
              if (inputRef.current) {
                inputRef.current.value = ''
              }
              onDelete()
            }}>Видалити</button>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default ImageInput