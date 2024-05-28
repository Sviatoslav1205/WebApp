import { FC } from "react"
import styles from "./ConfirmationModal.module.scss"
// import ErrorIcon from "@/images/errorModal/ErrorIcon.svg"
// import OkButton from "@/components/OkButton"
import CloseButton from "@/components/CloseButton"

interface ConfirmationModalProps {
  text?: string
  onYes: () => void
  onNo: () => void
  onClose?: () => void
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ text, onYes, onNo, onClose = onNo }) => {
  return (
    <div className={styles.container}>
      <CloseButton onButtonClick={onClose}/>
      {text || "Ви впевнені у цій дії?"}
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.yes}`} onClick={onYes}>Так</button>
        <button className={`${styles.button} ${styles.no}`} onClick={onNo}>Ні</button>
      </div>
    </div>
  )
}

export default ConfirmationModal