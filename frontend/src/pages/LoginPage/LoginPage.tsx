// import { FC, useContext, useState } from "react"
// import { Context } from "@/main"
// import { observer } from "mobx-react-lite"
// import { Navigate, useNavigate } from "react-router-dom"
// import styles from "./LoginPage.module.scss"
// import { CustomError } from "@/types/CustomError"
// import TextInput from "@/components/TextInput"
// import Button from "@/components/Button"
// // import LoginForm from "@/components/LoginForm/LoginForm";

// const LoginPage: FC = () => {
//   const navigate = useNavigate()
//   const [password, setPassword] = useState<string>('')
//   const [inputType, setInputType] = useState<"text"|"password">("password")
//   const [error, setError] = useState<CustomError>({} as CustomError)

//   const { store } = useContext(Context)

//   if (store.isAuth) {
//     navigate('/')
//     return
//   }
//   return (
//     <div >
//       <TextInput type={inputType} placeholder="Пароль" inputMode="text" value={password} onValueChange={e => {
//           setPassword(e.target.value)
//           setError({
//             message: '',
//             show: false
//           })
//         }} 
//         error={error} theme="red" size="small" inputType="singleLine"
//       />
//       {/* <input 
//         // onChange={e => {
//         //   setPassword(e.target.value)
//         //   setError('')
//         // }}
//         value={password}
//         type="password" 
//         placeholder="Пароль" 
//       /> */}
//       {/* {error && error} */}
//       <Button text="Увійти" theme="grey" borders="square" onButtonClick={async () => {
//         try {
//           await store.login(store.userId, password)
//           setPassword('')
//         } catch (e) {
//           setError({
//             message: e.response?.data?.message, 
//             show: true
//           })
//         }
//       }} />
//     </div>



//   )
// }

// export default observer(LoginPage)


import { FC, useContext, useEffect, useState } from "react"
import { Context } from "@/main"
import { observer } from "mobx-react-lite"
import { Navigate, useNavigate } from "react-router-dom"
import styles from "./LoginPage.module.scss"
import { CustomError } from "@/types/CustomError"
import TextInput from "@/components/TextInput"
import Button from "@/components/Button"
import showPasswordIcon from "@/images/passwordInputIcons/show.png"
import hidePasswordIcon from "@/images/passwordInputIcons/hide.png"
// import LoginForm from "@/components/LoginForm/LoginForm";

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState<string>('')
  const [inputType, setInputType] = useState<"text"|"password">("password")
  const [error, setError] = useState<CustomError>({} as CustomError)

  const { store } = useContext(Context)

  useEffect(() => {
    if (store.isAuth) {
      navigate('/')
    }
  }, [store.isAuth])

  if (store.isAuth) {
    // navigate('/')
    return null
  }
  return (
    <div className={styles.container}>
      <div className={styles.passwordInputContainer}>
        <TextInput type={inputType} placeholder="Пароль" inputMode="text" value={password} onValueChange={e => {
            setPassword(e.target.value)
            setError({
              message: '',
              show: false
            })
          }} 
          error={error} theme="red" size="small" inputType="singleLine"
        />
        <div className={styles.passwordIconContainer}>
          <img className={styles.passwordIcon} src={inputType === "password" ? showPasswordIcon : hidePasswordIcon} alt="" onClick={() => setInputType(inputType === "password" ? "text" : "password")} />
        </div>
      </div>
      {/* <input 
        // onChange={e => {
        //   setPassword(e.target.value)
        //   setError('')
        // }}
        value={password}
        type="password" 
        placeholder="Пароль" 
      /> */}
      {/* {error && error} */}
      <Button text="Увійти" theme="grey" borders="square" onButtonClick={async () => {
        try {
          await store.login(store.userId, password)
          setPassword('')
        } catch (e) {
          setError({
            message: e.response?.data?.message, 
            show: true
          })
        }
      }} />
    </div>
  )
}

export default observer(LoginPage)