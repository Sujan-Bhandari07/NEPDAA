

const Comment = ({fullname,profilepic,comment,length}:{length:number,fullname:string,profilepic:string,comment:string}) => {


  return (
    <>
   
     { length>0 &&
<div  className=" w-full border border-black  flex items-center  p-2 rounded-2xl  gap-3 ">
    <div className="size-13 rounded-full flex-none">
        <img className=" size-full rounded-full object-center object-cover" src={profilepic}alt="" />
    </div>
    <div className="font-bold " >
       {fullname}
        <span className=" text-[.9rem]">&nbsp;&nbsp; {comment}</span>
    </div>
</div>}






    </>
  )
}

export default Comment