import { useContext, useState } from "react"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"

const LoginForm = () => {
  const [password, setPassword] = useState<string>('')

  const { store } = useContext(Context)

  return (
    <>
      <input 
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password" 
        placeholder="Пароль" 
      />
      <button onClick={() => store.login(store.userId, password)}>Логін</button>
    </>
  )
}

export default observer(LoginForm)