import { FC } from "react"
import styles from "./OkButton.module.scss"

interface OkButtonProps {
  onButtonClick: () => void
}

const OkButton: FC<OkButtonProps> = ({ onButtonClick }) => {
  return (
    <button onClick={onButtonClick} className={styles.button}>OK</button>
  )
}

export default OkButton