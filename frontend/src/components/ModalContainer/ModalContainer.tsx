import { FC, ReactElement } from "react"
import styles from "./ModalContainer.module.scss"

interface ModalContainerProps {
  showModal: boolean
  onClose: () => void
  children: ReactElement
  blockScroll: boolean
}

const ModalContainer: FC<ModalContainerProps> = ({ showModal, onClose, children, blockScroll }) => {
  if (blockScroll) {
    document.body.style.overflow = showModal ? 'hidden' : 'visible'
  }
  // document.body.style.overflow = showModal ? 'hidden' : 'visible'

  return showModal ? (
    <div className={styles.container}>
      <div className={styles.background} onClick={onClose}></div>
      <div className={styles.children_container}>
        {children}
      </div>
    </div>
  ) : null
}

export default ModalContainer