import { FC } from "react"
import styles from "./CloseButton.module.scss"

interface CloseButtonProps {
  onButtonClick: () => void
}

const CloseButton: FC<CloseButtonProps> = ({ onButtonClick }) => {
  return (
    <button onClick={onButtonClick} className={styles.button}>X</button>
  )
}

export default CloseButton