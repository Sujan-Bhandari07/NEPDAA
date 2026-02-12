
import { useGetallstoryQuery } from "../../store/postapi";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setstory } from "../../store/postslice";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";

const Story = () => {
  const {showstory}=useAppSelector(state=>state.post)
  const [video, setVideo] = useState("")

  const dispatch = useAppDispatch()
  const { data, isSuccess } = useGetallstoryQuery();


  const handlestory =(item:string)=>{

    setVideo(item)
    dispatch(setstory(true))


    
  }
  const[now]=useState(()=>Date.now())

  return (
    isSuccess && (
      <div className="story gap-3 w-full flex overflow-x-auto  ">
        {data.payload.length > 0 && data.payload.filter(item=>Number(new Date(item.createdAt)) > now-24*60*60*1000).
        map((item, id) => (
            <div

            onClick={()=>handlestory(item.post)}

              key={id}
              className=" flex-none cursor-pointer text-1 border-2 flex items-center justify-center border-blue-400 rounded-full size-17"
            >

              <video src={item.post} className=" object-cover object-center size-full rounded-full "></video>
            </div>


 
          ))}

        {(  data.payload.filter(item=>Number(new Date(item.createdAt)) > now-24*60*60*1000) ).length<1 && (
          <div className="w-full text-2xl font-bold  text-center">
            NO stories found
          </div>
        )}
{showstory &&  
        <div className={` ${showstory && "opa1"} absolute top-10 z-99 story left-[20vw] h-140 w-200`}>
          <div className="  relative h-full w-full">
            <video src={video} autoPlay playsInline muted={false}  className="h-full w-full object-center object-cover "></video>
          <IoIosClose onClick={()=>dispatch(setstory(false))} className="absolute right-4 top-3 hover:cursor-pointer z-40  "  size={40} color="white"/>
          </div>
        </div>
        }
       
      </div>
    )
  );
};

export default Story;
