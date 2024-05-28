import { FC, useContext, useState } from "react"
import { Context } from "@/main"
import { observer } from "mobx-react-lite"
import { Navigate } from "react-router-dom"
// import LoginForm from "@/components/LoginForm/LoginForm";

const LoginPage: FC = () => {
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { store } = useContext(Context)

  if (store.isAuth) {
    return (
      <div>
        {store.userId}
        <h1>{store.isAuth ? `Yes ${store.user.userId}, ${store.user.role}` : `NO!!!`}</h1>
        <button onClick={() => store.logout()}>Logout</button>
      </div>
  
      // <Navigate to={'/'}/>
    )
  }
  return (
    <>
      <input 
        onChange={e => {
          setPassword(e.target.value)
          setError('')
        }}
        value={password}
        type="password" 
        placeholder="Пароль" 
      />
      {error && error}
      <button onClick={async () => {
        try {
          await store.login(store.userId, password)
          setPassword('')
        } catch (e) {
          setError(e.response?.data?.message)
        }
      }}>Увійти</button>
    </>
  )
}

export default observer(LoginPage)