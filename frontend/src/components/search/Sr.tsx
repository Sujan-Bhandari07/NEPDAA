

import toast from "react-hot-toast";
import { useAppSelector } from "../../store/Hooks";
import { useFolloworunfollowMutation, useGetusersforsidebarQuery } from "../../store/userapi"
import { useEffect } from "react";
import type { errortype } from "../../types/loginpagetypes";



const Sr = () => {
  const {data,isSuccess,isError}= useGetusersforsidebarQuery()
    const {search,user}=  useAppSelector(state=>state.user)

const [
    follow,
    { data: fd, error: fe, isError: fie, isSuccess: fis, isLoading: fil },
  ] = useFolloworunfollowMutation();


useEffect(() => {
    let id: string;

    if (fil) {
      id = toast.loading("");
    }

    if (fis) {
      toast.success(fd.message);
    }

    if (fie && fe && "data" in fe) {
      const err = fe.data as errortype;
      toast.error(err.message);
    }

    return () => {
      if (id) toast.dismiss(id);
    };
  }, [fd, fe, fie, fis, fil]);

    const users = Array.isArray(data?.payload) ? data.payload : [];

  // filter based on search (case-insensitive)
  const filteredUsers = search
    ? users.filter((item) =>
        item.fullname.toLowerCase().includes(search.toLowerCase())
      )
    : users;


    const handlefollow = (id:string)=>{
follow({id})
    }

    return (
      <>
    {isSuccess && filteredUsers.filter(item=>!item.followers.includes(user?._id as string)  ).map((item,id:number)=>(
      
      <div key={id} className="notify bg-gray-100  rounded-2xl px-2 flex gap-3 items-center">
      <div className="size-15 bg rounded-full flex-none"><img src={item.profilepic} className="size-full rounded-full object-center object-cover" alt="" /></div>
      <div className="w-full flex justify-between pr-10">
      <div> <b>{item.fullname}</b></div>
<div onClick={()=>handlefollow(item._id)} className="text-blue-500 cursor-pointer">Follow</div>
      </div>
  </div>


))}
{isError && <div className="">Not found</div>}
{isSuccess && filteredUsers.filter(item=>!item.followers.includes(user?._id as string)).length<1 && 
<div className=" text-2xl font-bold h-130 flex justify-center items-center">No Users found</div>
}
</>

    )
  }
  
  export default Sr