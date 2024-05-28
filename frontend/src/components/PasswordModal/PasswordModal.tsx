import { FC, useState } from "react"
import styles from "./PasswordModal.module.scss"
// import ErrorIcon from "@/images/errorModal/ErrorIcon.svg"
// import OkButton from "@/components/OkButton"
import CloseButton from "@/components/CloseButton"
import OkButton from "@/components/OkButton"

interface GeneratedPassword {
  message: string
  password: string
  showModal: boolean
}

interface PasswordModalProps {
  generatedPassword: GeneratedPassword
  onOk: () => void
}

const PasswordModal: FC<PasswordModalProps> = ({ generatedPassword, onOk }) => {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false)

  return (
    <div className={styles.container} onClick={() => setShowCopiedTooltip(false)}>
      {/* setShowCopiedTooltip(false) */}
      {/* <CloseButton onButtonClick={onClose}/> */}
      {generatedPassword.message}
      <div className={styles.password} onClick={(e) => {
        e.stopPropagation()
        setShowCopiedTooltip(true)
        navigator.clipboard.writeText(generatedPassword.password)
        setTimeout(() => {
          setShowCopiedTooltip(false)
        }, 2000)
      }}>
        <span className={`${styles.copiedTooltip} ${showCopiedTooltip ? styles.show : null}`}>Пароль скопійовано!</span>
        {generatedPassword.password}
      </div>
      <OkButton onButtonClick={onOk}/>
      <div className={styles.buttons}>
        {/* <button className={`${styles.button} ${styles.yes}`} onClick={onYes}>Так</button> */}
        {/* <button className={`${styles.button} ${styles.no}`} onClick={onNo}>Ні</button> */}
      </div>
    </div>
  )
}

export default PasswordModal