import { FC, useState } from "react"
import AdminService from "@/services/Admin.service"
import styles from "./ChangeRoleModal.module.scss"
import { IUser } from "@/types/IUser"
import Select, { StylesConfig } from 'react-select'
import OkButton from "@/components/OkButton"
import CloseButton from "@/components/CloseButton"
import ModalContainer from "@/components/ModalContainer"
import ConfirmationModal from "@/components/ConfirmationModal"
import { SelectOption } from "@/types/SelectOption"


interface ChangeRoleModalProps {
  adminId: number
  user: IUser
  onClose: () => void
}

const ChangeRoleModal: FC<ChangeRoleModalProps> = ({ adminId, user, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(user.role)
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)

  const options: SelectOption[] = [
    {
      value: "",
      label: "Користувач"
    },
    {
      value: "manager",
      label: "Менеджер оформлення замовлення"
    },
    {
      value: "support",
      label: "Техпідтримка"
    },
    {
      value: "courier",
      label: "Курʼєр"
    }
  ]

  const selectStyles: StylesConfig<SelectOption, false> = {
    container: (baseStyles) => ({
      ...baseStyles,
      width: 300
    })
  }

  return (
    <>
      <ModalContainer showModal={showConfirmationModal} blockScroll={true} onClose={() => setShowConfirmationModal(false)}>
        <ConfirmationModal onYes={async () => {
          await AdminService.changeUserRole(adminId, user.userId, selectedRole)
          setShowConfirmationModal(false)
          onClose()
        }} onNo={() => setShowConfirmationModal(false)}/>
      </ModalContainer>

      <div className={styles.container}>
        <CloseButton onButtonClick={onClose}/>
        <div className={styles.title}>
          ID користувача: {user.userId}
        </div>
        <Select 
          placeholder={"Роль користувача"}
          isSearchable={false}
          defaultValue={options.filter(option => (option.value || null) === user.role)}
          options={options}
          styles={selectStyles}
          onChange={(e: any) => setSelectedRole(e.value || null)}
        />

        <OkButton onButtonClick={() => {
          if (user.role !== selectedRole) {
            setShowConfirmationModal(true)
          } else {
            onClose()
          }
        }}/>
      </div>   
    </>
  )
}

export default ChangeRoleModal