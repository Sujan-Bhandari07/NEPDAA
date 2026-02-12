import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ImUpload2 } from "react-icons/im"
import { useCreatepostMutation } from "../store/postapi"

import type { errortype } from "../types/loginpagetypes"

const Create = () => {
  const [Post, setPost] = useState(true)
  const [file, setFile] = useState<null | File>(null)
  const [caption, setcaption] = useState("")


    const [createpost,{data,isError,isLoading,isSuccess,error}]=useCreatepostMutation()

    console.log(postMessage,caption)
  const handlefilechange = (e:React.ChangeEvent<HTMLInputElement> )=>{

    const files = e.target.files 
    if(Post){

      if(files && files.length>0 && files[0].type.startsWith("image/")){
        setFile(files[0])
      }else{
        toast.error("You cant select video as a post")
      }

      
    } else if(!Post){
      if(files && files.length>0 && files[0].type.startsWith("video/")){
        setFile(files[0])
      }else{
        toast.error("You cant select image as a story")
      }
    }
  }

  const handleclick = (id: number) => {
    if (id == 1) {
      setFile(null)
      setcaption("")
      setPost(true)
    } else if (id == 2) {
      setFile(null)
      setcaption("")

      setPost(false)
    }


   

  }



useEffect(() => {
  let id:string

  if(isLoading){
    id=toast.loading("")
  }

  if(isError && error && "data" in error){
    const err =  error.data as errortype
    toast.error(err.message)

  }

  if(isSuccess){
    toast.success(data.message)
  }

  return () => {
    if(id)toast.dismiss(id)
  }
}, [data,isError,isLoading,error,isSuccess])




  const handlepost = async()=>{
    if(!file){
      toast.error("pls select file")
      return
    }
    const formdata = new FormData()
    formdata.append("post",file)
    formdata.append("caption",caption)

      const a = await createpost(formdata).unwrap()
      if(a.success){
        setFile(null)
        setcaption("")
      
  }

  }


  return (
    <div className="create h-[95vh] w-full  flex items-center justify-center">
      <div className="flex flex-col px-10 py-2 border   w-[60% rounded-2xl gap-4">
        <div className="flex gap-10 justify-center  h-[20%]">
          <div  onClick={() => handleclick(1)} className={`${Post && "bg-gray-300 px-3"}   cursor-pointer   rounded-2xl`}>Post</div>
          <div onClick={() => handleclick(2)} className={`${!Post && "bg-gray-300 px-3"}   cursor-pointer   rounded-2xl`}>Story</div>
        </div>
        <div className="flex gap-2  h-[30%]">
          <div className="h-60 border border-gray-400 rounded-2xl relative flex justify-center items-center  w-60 flex-none ">
            <input  onChange={handlefilechange} type="file" name="" className=" relative z-30 size-full cursor-pointer opacity-0" id="" >
            
            </input>
         { !file ?<ImUpload2 size={40} className="bordersize-1/4 cursor-pointer absolute"  />: file.type.startsWith("image/") ?
          <img src={URL.createObjectURL(file)} className="size-full absolute object-center object-cover rounded-2xl" alt="" />: file.type.startsWith("video/") &&
          <video playsInline muted loop autoPlay className="size-full absolute object-center object-cover rounded-2xl" src={URL.createObjectURL(file)}></video>
          }

           
            </div>
          <div className=" flex flex-col gap-2">
            {/* <div className="text-center text-gray-400">Caption</div> */}
            {Post && <textarea onChange={(e)=>setcaption(e.target.value)} value={caption} placeholder="Caption here..." className=" as text-justify w-99 relative h-60   bg-white border border-white outline-none"></textarea>}

          </div>
        </div >
        <div className="flex justify-center items-center">


          <button onClick={handlepost} className="bg-black px-5 py-1 rounded-2xl cursor-pointer w-fit text-white">Create</button>
        </div>
      </div>
    </div>
  )
}

export default Create