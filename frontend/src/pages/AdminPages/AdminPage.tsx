import { FC, useContext, useState } from "react"
import { Context } from "@/main"
import { redirect } from "react-router-dom"

const AdminPage: FC = () => {
  const { store } = useContext(Context)
  if (store.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <>
      11111 admin
    </>
  )
}

export default AdminPage