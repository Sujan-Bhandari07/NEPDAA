import Notify from "../components/notification/Notify"
import { useAppSelector } from "../store/Hooks"

const Notification = () => {



  const{notification}=useAppSelector((state)=>state.post)


  
  console.log(notification)
  return (
<div className="gap-4 p-6  h-[95vh] min-h-[95vh] w-full flex flex-col">

  <Notify/>

   {/* {notification.length<1 && 
  <div className="h-full flex justify-center items-center text-2xl">No notification yet</div>
    } */}


</div>
  )
}

export default Notification