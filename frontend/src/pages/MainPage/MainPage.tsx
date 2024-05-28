import { Context } from "@/main"
import UserService from "@/services/User.service"
import { FC, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

const MainPage: FC = () => {
  const { productStore } = useContext(Context)
  
  useEffect(() => {
    UserService.getProducts().then(response => productStore.setProducts(response.data.products))
  }, [])

  return (
    <>
      <Link to={'/login'}>
        <button style={{background: '#3c3c3c', height:'50px', width:'150px'}}>Login</button>
      </Link>
      <Link to={'/admin/users'}></Link>
    </>
  )
}

export default MainPage