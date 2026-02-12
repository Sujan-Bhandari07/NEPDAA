import type { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/userapi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { errortype } from "../../types/loginpagetypes";
import { useAppDispatch } from "../../store/Hooks";
import { setisauth } from "../../store/Userslice";


const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [logout,{data,isError,isLoading,isSuccess,error}]= useLogoutMutation()

   

    interface optonss{
        name:string,
        icon:IconType,
        path:string
    }

    const options:Array<optonss> =[{
        name:"home",
        icon:AiFillHome,
        path:"/"
    },
    {
        name:"search",
        icon:BiSearch,
        path:"/search"
    },
    {
        name:"message",
        icon:RiMessage2Fill,
        path:"/message"
    },
    {
        name:"notification",
        icon:IoMdNotifications,
        path:"/notification"
    },
    {
        name:"create",
        icon:MdAddBox,
        path:"/create"
    },
    {
        name:"profile",
        icon:FaUserCircle,
        path:"/profile"
    },
    ]


useEffect(() => {
  let id:string

  if(isLoading){
   id= toast.loading("")
  }

  if(isSuccess){
    dispatch(setisauth(false))
    navigate("/login")
    toast.success(data.message)
  }
  
  if(isError && error && "data" in error){
    const err = error.data as errortype
    toast.error(err.message)
  }
  return () => {
  if(id)toast.dismiss(id)
  }
}, [data,isError,isLoading,isSuccess,error,navigate,dispatch])



    const handlelogout = ()=>{
logout({a:"hello"})
    }


  return (
<div className="sidebar border-r border-r-gray-500 w-60 fixed top-5 flex h-full  flex-col gap-7">
    <div className="uppercase text-3xl font-bold">NEPDAA</div>
    <div className=" flex flex-col gap-10  ">
        
       {
        options.map((item,id)=>
        (
            <NavLink  to={item.path} key={id} className="option flex gap-7 h-fit item-center py-1 pl-5  rounded-2xl w-45">
                
                <div className="flex justify-center items-center">{<item.icon size={20}/>}</div>
                <div className="capitalize">{item.name}</div>
            </NavLink>
        ))
       }
       <div onClick={handlelogout} className="option cursor-pointer flex gap-7 h-fit item-center py-1 pl-5  rounded-2xl w-45">
        <div  className="flex justify-center items-center">

        <FiLogOut size={20}/>
        </div>
        <div >Logout</div>
       </div>
        
        
    </div>

</div>
  )
}

export default Navbar