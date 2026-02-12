
import Sr from "../components/search/Sr"
import { useAppDispatch, useAppSelector } from "../store/Hooks"
import { setsearch } from "../store/Userslice"


const Search = () => {

   const {search}=useAppSelector(state=>state.user)
   const dispatch = useAppDispatch()




  return (
<div className="search  p-7 h-[95vh] min-h-[95vh] flex flex-col gap-10">
  <div className="w-full flex justify-center ">
    <input value={search} onChange={(e)=>dispatch(setsearch(e.target.value))} type="text" className="w-2/4 px-2 py-1 outline-none border border-gray-800" placeholder="Search users" />
  </div>
  <div className="flex flex-col gap-4 ">




<Sr  />




  </div>

</div>
  )
}

export default Search