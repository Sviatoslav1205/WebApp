import { ChangeEvent, FC, useContext, useState } from "react"
import UsersTable from "@/components/UsersTable/UsersTable"
import ModalContainer from "@/components/ModalContainer"
import ErrorModal from "@/components/ErrorModal"
import ChangeRoleModal from "@/components/ChangeRoleModal"
import { IUser } from "@/types/IUser"
import { Context } from "@/main"
import ConfirmationModal from "@/components/ConfirmationModal"
import PasswordModal from "@/components/PasswordModal"
import AdminService from "@/services/Admin.service"
import { GeneratePasswordResponse } from "@/types/responses/GeneratePasswordResponse"
import Button from "@/components/Button"
import styles from "./UsersPage.module.scss"
import TextInput from "@/components/TextInput"
import Select from "react-select"

interface Error {
  showError: boolean
  message: string
}

interface GeneratedPassword {
  message: string
  password: string
  showModal: boolean
}

const UsersPage: FC = () => {
  const { store } = useContext(Context)
  const [error, setError] = useState<Error>({ showError: false, message: "" })
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<GeneratedPassword>({ message:"", password: "", showModal: false })
  const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser)

  const [search, setSearch] = useState<string>('')

  return (
    <>
      <ModalContainer showModal={error.showError} blockScroll={true} onClose={() => setError({ showError:false, message:"" })}>
        <ErrorModal message={error.message} onOk={() => setError({ showError:false, message:"" })}/>
      </ModalContainer>
      <ModalContainer showModal={showEditModal} blockScroll={true} onClose={() => setShowEditModal(false)}>
        <ChangeRoleModal adminId={store.userId} user={selectedUser} onClose={() => setShowEditModal(false)}/>
      </ModalContainer>

      <ModalContainer showModal={showConfirmationModal} blockScroll={true} onClose={() => setShowConfirmationModal(false)}>
        <ConfirmationModal onYes={async () => {
          await AdminService.generatePassword(selectedUser.userId).then(response => {
            setShowPassword({message:response.data.message, password: response.data.password, showModal: true})
          })
          setShowConfirmationModal(false)
        }} onNo={() => setShowConfirmationModal(false)}/>
      </ModalContainer>

      <ModalContainer showModal={showPassword.showModal} blockScroll={true} onClose={() => setShowPassword({ message:'', password: '', showModal: false })}>
        <PasswordModal generatedPassword={showPassword} onOk={() => setShowPassword({ message:'', password: '', showModal: false })}/>
      </ModalContainer>

      <div className={styles.inputContainer}>
        <TextInput theme="white" size="small" inputType="singleLine" maxLength={20} placeholder="Пошук по ID" inputMode="numeric" value={search} onValueChange={(e) => {
          let a = e.target.value.replace(/[^0-9]/g, "")
          setSearch(a)
        }}/>
      </div>

      <UsersTable searchId={search} setError={setError} setSelectedUser={setSelectedUser} showEditModal={showEditModal} 
        setShowEditModal={setShowEditModal} setShowConfirmationModal={setShowConfirmationModal}
      />

      <div className={styles.buttonContainer}>
        {/* <Button text="TEST" color="red" onButtonClick={() => console.log('btn click')}/> */}
        <Button text="Змінити власний пароль" theme="grey" size="big" onButtonClick={() => {
          setSelectedUser(store.user)
          setShowConfirmationModal(true)
        }}/>
      </div>
    </>
  )
}

export default UsersPage