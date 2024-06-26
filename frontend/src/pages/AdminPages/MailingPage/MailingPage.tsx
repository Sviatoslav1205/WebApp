import { ChangeEvent, FC, useState } from "react"
import ModalContainer from "@/components/ModalContainer"
import ConfirmationModal from "@/components/ConfirmationModal"
import AdminService from "@/services/Admin.service"
import Button from "@/components/Button"
import styles from "./MailingPage.module.scss"
import TextInput from "@/components/TextInput"
import { Mail } from "@/types/Mail"
import ImageInput from "@/components/ImageInput"

const MailingPage: FC = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)

  const [mail, setMail] = useState<Mail>({
    title: '',
    image: null,
    message: ''
  })

  const clearMail = () => {
    setMail({
      title: '',
      image: null,
      message: ''
    })
  }

  return (
    <>
      <ModalContainer showModal={showConfirmationModal} blockScroll={true} onClose={() => setShowConfirmationModal(false)}>
        <ConfirmationModal onYes={async () => {
          const formData = new FormData()
          formData.append("title", mail.title)
          mail.image && formData.append("image", mail.image)
          formData.append("message", mail.message)
          await AdminService.sendMailing(formData)

          clearMail()
          setShowConfirmationModal(false)
        }} onNo={() => setShowConfirmationModal(false)}/>
      </ModalContainer>

      <div className={styles.form}>
          <TextInput theme="red" size="big" inputType="singleLine" placeholder="Заголовок" inputMode="text" value={mail.title} onValueChange={(e) => {
            setMail((prevState) => {
              return {
                ...prevState,
                title: e.target.value
              }
            })
          }}/>

          <ImageInput theme="red" size="big" image={mail.image} onSelect={(e: ChangeEvent<HTMLInputElement>) => setMail((prevState) => {
            return {
              ...prevState,
              image: e.target.files ? e.target.files[0] : null
            }
          })} onDelete={() => setMail((prevState) => {
            return {
              ...prevState,
              image: null
            }
          })}/>

          <TextInput theme="red" size="big" inputType="multiLine" placeholder="Повідомлення..." inputMode="text" value={mail.message} onValueChange={(e) => {
            setMail((prevState) => {
              return {
                ...prevState,
                message: e.target.value
              }
            })
          }}/>
          <Button text="Надіслати" theme="grey" size="big" onButtonClick={() => {
            if (mail.title === '' || mail.message === '') {
              alert("Заголовок та повідомлення не повинні бути порожніми!")
              return
            } else {
              setShowConfirmationModal(true)
            }
          }}/>
      </div>
    </>
  )
}

export default MailingPage