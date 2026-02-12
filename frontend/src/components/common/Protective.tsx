import {  useEffect } from "react"
import { useAppSelector } from "../../store/Hooks"
import { useLocation, useNavigate } from "react-router-dom"

const Protective = ({children}:{children:React.ReactNode}) => {

    const {isauth} = useAppSelector(state=>state.user)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
      if(isauth && location.pathname == "/login"){
        navigate("/")
      }else if(!isauth && location.pathname !== "/login"){
        navigate("/login")
      }
    

    }, [navigate,location,isauth])
    
  return (
      <>
          {children}
      </>
  )
}

export default Protective