import { useEffect, useState } from "react"
import Singlemes from "../components/message/Singlemes"
import User from "../components/message/User"
import { useAppDispatch, useAppSelector } from "../store/Hooks"
import { useSendmessageMutation } from "../store/conversationapi"
import { setconversation } from "../store/conversationslice"
import toast from "react-hot-toast"
import type { errortype } from "../types/loginpagetypes"
import type { Message } from "../types/messagetype"
import { setselecteduser } from "../store/Userslice"
import { LuMessageSquareMore } from "react-icons/lu"

const Messages = () => {

const [message, setMessage] = useState< string>("")
  const{user,selecteduser}= useAppSelector(state=>state.user)
    const [send,{data,isError,isLoading,isSuccess,error}]  = useSendmessageMutation()
   const dispatch = useAppDispatch()

   useEffect(() => {
     let id:string

     if(isLoading){
      id=toast.loading("")
     }

     if(isSuccess){
      dispatch(setconversation(data.payload?.newmessage as Message))
      toast.success(data.message)

     }

     if(isError && error && "data" in error){
const err = error.data as errortype
toast.error(err.message)
     }
   
     return () => {
if(id)toast.dismiss(id)
     }
   }, [data,isError,isLoading,isSuccess,error,dispatch])
   

  const handlesend = async ()=>{
const response= await send({receiverid:selecteduser?._id as string,message:message}).unwrap()
if(response.success ){
  setMessage("")
}
 

  }

  useEffect(() => {
    
  
    return () => {
      dispatch(setselecteduser(null))

    }
  }, [dispatch])
  
  return (
<div className="message  h-[95vh]  flex w-full">
  <div className=" h-full w-[25%] flex flex-col gap-2 border-r border-r-gray-600 px-2">
    <div className="font-bold border-b border-b-gray-500 h-[10%] flex justify-center items-center">{user?.fullname}</div>
    <div className="flex flex-col gap-2">

<User/>
    </div>
  </div>
   {selecteduser &&
     <div className="h-full w-[75%]   flex flex-col " >
    <div className=" border-b border-b-gray-500 items-center pl-3 h-[10%] flex gap-2">
      <div className="size-11 rounded-full ">
      <img className="size-full object-cover object-center rounded-full " src={selecteduser?.profilepic} alt="" />
      </div>
      <div>{selecteduser?.fullname}</div>
    </div>

<div className=" h-105 overflow-y--auto">
      <div className=" gap-1 flex flex-col items-center justify-center ">
      <div className="size-21 rounded-full ">
      <img className="size-full object-cover object-center rounded-full " src={selecteduser?.profilepic} alt="" />
      </div>
      <div>{selecteduser?.fullname}</div>
      <div className="bg-gray-200 text-sm cursor-pointer px-2 py-1">View profile</div>
      </div>
      <div className=" h-full overflow-y-auto  px-5 flex flex-col gap-3 py-3">

        <Singlemes/>
      </div>
      <div className="w-full flex justify-center items-center border-t h-[15%]   border-t-gray-500">
        <div className="flex justify-between px-2 pt-1 rounded-2xl items-center border border-gray-500 w-[80%]">

        <input onChange={(e)=>setMessage(e.target.value)} value={message}  type="text" className="outline-none w-full  px-2 py-1 " placeholder="" name="" id="" />
        <button onClick={handlesend} className="bg-black cursor-pointer text-white px-4 rounded-2xl py-1">Send</button>
        </div>
      </div>
    </div>

  </div>
  }
  {!selecteduser &&  
  <div className="h-full w-full flex gap-3 justify-center  items-center">

<LuMessageSquareMore size={80} className="  " />
<div className="text-2xl font-bold">Select User</div>
  </div>
  }
 
</div>
  )
}

export default Messages