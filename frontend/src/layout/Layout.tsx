import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import { useAppSelector } from "../store/Hooks"

const Layout = () => {
  const {isauth}= useAppSelector(state=>state.user)
  const {showstory}= useAppSelector(state=>state.post)
  return (
<div className={`layout   flex gap-9 w-screen px-2 relative  top-5 ${showstory && "opa"}`}>
{isauth &&  <Navbar/>}
   
    <div className={`${ isauth && "oulet ml-65  w-full"}  `}>

    <Outlet/>
    </div>
</div>
  )
}

export default Layout