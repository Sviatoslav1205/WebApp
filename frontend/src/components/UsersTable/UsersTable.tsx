import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import AdminService from "@/services/Admin.service"
import { IUser } from "@/types/IUser"

import { Context } from '@/main'
import styles from "./UsersTable.module.scss"

interface Error {
  showError: boolean
  message: string
}

interface UsersTableProps {
  searchId: string
  setError: Dispatch<SetStateAction<Error>>
  setSelectedUser: Dispatch<SetStateAction<IUser>>
  showEditModal: boolean
  setShowEditModal: Dispatch<SetStateAction<boolean>>
  setShowConfirmationModal: Dispatch<SetStateAction<boolean>>
}

const UsersTable: FC<UsersTableProps> = ({ searchId, setError, setSelectedUser, showEditModal, setShowEditModal, setShowConfirmationModal }) => {
  const { store } = useContext(Context)
  
  const [users, setUsers] = useState<IUser[]>([])
  const fetchUsers = async () => {
    await AdminService.getUsers().then(response => users != response.data.users && (setUsers(response.data.users)))
  }

  useEffect(() => {
    fetchUsers()
  }, [showEditModal])

  const array = users.filter((user) => (user.userId+'').includes(searchId))

  return (
    <>
      <table border={1} className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th>ID користувача</th>
            <th>Роль</th>
            <th colSpan={2}>Операції</th>
          </tr>
        </thead>
        <tbody>
          {array.length !== 0 ? array.map((user, index) => {
            return (
              <tr className={styles.tr} key={index}>
                <td>{user.userId}</td>
                <td>{user.role}</td>
                <td className={styles.operation} onClick={() => {
                  if (user.userId === store.userId) {
                    setError({showError: true, message: "Неможливо змінити власну роль!"})
                    return
                  }
                  setSelectedUser(users[index])
                  setShowEditModal(true)
                }}>Змінити роль</td>
                <td className={styles.operation} onClick={() => {
                  setSelectedUser(users[index])
                  setShowConfirmationModal(true)
                }}>Згенерувати пароль</td>
              </tr>
            )
          }) : 
          <tr className={styles.tr}>
            <td colSpan={4}>Користувача з таким ID не знайдено!</td>
          </tr>
          }
        </tbody>
      </table>
    </>
  )
}

export default UsersTable