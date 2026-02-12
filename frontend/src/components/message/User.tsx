import { useLazyGetmessagesQuery } from "../../store/conversationapi"
import { clearconverstion, setconversationarray } from "../../store/conversationslice"
import { useAppDispatch, useAppSelector } from "../../store/Hooks"
import { useGetusersforsidebarQuery } from "../../store/userapi"
import { setselecteduser } from "../../store/Userslice"
import type { usertype } from "../../types/loginpagetypes"


const User = () => {
  const {data}=useGetusersforsidebarQuery()
  
  const dispatch= useAppDispatch()
  const{user,selecteduser}=useAppSelector(state=>state.user)
  const[asd]= useLazyGetmessagesQuery()
  const{onlineusers}=useAppSelector(state=>state.socket)
  console.log(data)

  const handleuser =async (user:usertype)=>{

     dispatch(clearconverstion())
dispatch(setselecteduser(user))
const a=  await asd(user?._id).unwrap()
if(a.success){
  dispatch(setconversationarray(a.payload.messages))
}





  }


  
  
  return (
<>
{ data?.payload?.filter(item=>item.followers.includes(user?._id as string)|| item.following.includes(user?._id as string)).map((item,id)=>(

<div onClick={()=>handleuser(item)} key={id} className={`user px-3 py-1 flex items-center gap-3  cursor-pointer ${selecteduser?._id == item._id && "aed"} `}>
    <div className="size-11 rounded-full ">
        <img className="size-full object-cover object-center rounded-full " src={item?.profilepic} alt="" />
    </div>
    <div>
        <div>{item.fullname}</div>
        <div className={` ${onlineusers.includes(item?._id)?"text-green-600":"text-red-600"} text-[0.9rem]`}>{onlineusers.includes(item._id)?"online":"offline"}</div>
    </div>
</div>
))}

</>
  )
}

export default User