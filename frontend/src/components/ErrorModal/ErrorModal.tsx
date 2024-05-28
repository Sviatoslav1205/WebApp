import { FC } from "react"
import styles from "./ErrorModal.module.scss"
import ErrorIcon from "@/images/errorModal/ErrorIcon.svg"
import OkButton from "@/components/OkButton"

interface ErrorModalProps {
  message: string
  onOk: () => void
}

const ErrorModal: FC<ErrorModalProps> = ({ message, onOk }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={ErrorIcon} alt="" />
        {message}
      </div>
      <OkButton onButtonClick={onOk}/>
      {/* <button onClick={onOk}>OK</button> */}
    </div>
  )
}

export default ErrorModal