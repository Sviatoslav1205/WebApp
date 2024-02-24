import { useContext } from "react"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  const { store } = useContext(Context)

  if (!store.isAuth) {
    return (
     <LoginForm />
    )
  }
  return (
    <div>
      {store.userId}
      <h1>{store.isAuth ? `Yes ${store.user.userId}, ${store.user.role}` : `NO!!!`}</h1>
      <button onClick={() => store.logout()}>Logout</button>
    </div>
  )
}

export default observer(LoginPage)