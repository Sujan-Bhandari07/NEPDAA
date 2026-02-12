import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { IoShareSocial, IoShareSocialOutline } from "react-icons/io5";
import {
  useBookmarkpostMutation,
  useCommentpostMutation,
  useDeletepostMutation,
  useGetallpostQuery,
  useLikeMutation,
} from "../../store/postapi";
import { useAppSelector } from "../../store/Hooks";
import toast from "react-hot-toast";
import type { errortype } from "../../types/loginpagetypes";
import Comment from "./Comment";
import { IoIosClose, IoMdSend } from "react-icons/io";

const Singlepost = () => {
  const { user } = useAppSelector((state) => state.user);
  const [comment, setComment] = useState<string | null>(null)
console.log("user",user)
  const [edit, setEdit] = useState<string | null>(null);

  const [
    deletepost,
    { data: dd, error: de, isError: die, isSuccess: dis, isLoading: dil },
  ] = useDeletepostMutation();


  const [com, setCom] = useState("")

    const[sen,{data:cd,isError:cie,error:ce,isSuccess:cis,isLoading:cil}] =useCommentpostMutation()

  const { data: postdata, isSuccess: pis } = useGetallpostQuery();
  console.log("postdata",postdata);

  const [
    postlike,
    { data: likedata, isError: lie, error: le, isSuccess: lis, isLoading: lil },
  ] = useLikeMutation();

  const [
    bookmarkpost,
    { data: bd, isError: bie, isSuccess: bis, isLoading: bil, error: be },
  ] = useBookmarkpostMutation();

  const [share, setshare] = useState(false);

  const handleclick = (id:string) => {
    if(edit === id){
      setEdit(null)
    }else{

      setEdit(id)
    }
  };

  const handledelete = (id: string) => {
    deletepost({ postid: id });
  };

  useEffect(() => {
    let id: string;

    if (dis) {
      toast.success(dd.message);
    }
    if (dil) {
      id = toast.loading("");
    }

    if (die && de && "data" in de) {
      const err = de.data as errortype;
      toast.error(err.message);
    }

    return () => {
      if (id) toast.dismiss(id);
    };
  }, [dd, de, die, dil, dis]);

  useEffect(() => {
    let id: string;

    if (lil) {
      id = toast.loading("");
    }
    if (lis) {
      toast.success(likedata.message);
    }

    if (lie && le && "data" in le) {
      const err = le.data as errortype;
      toast.error(err.message);
    }

    return () => {
      if (id) toast.dismiss(id);
    };
  }, [le, lie, lis, lil, likedata]);

  useEffect(() => {
    let id: string;

    if (bil) {
      id = toast.loading("");
    }
    if (bis) {
      toast.success(bd.message);
    }

    if (bie && be && "data" in be) {
      const err = be.data as errortype;
      toast.error(err.message);
    }

    return () => {
      if (id) toast.dismiss(id);
    };
  }, [bd, bie, be, bis, bil]);

  const handlelike = (id: string) => {
    postlike({ postid: id });
  };

  const handlebookmark = (id: string) => {
    bookmarkpost({ postid: id });
  };

  console.log(user, postdata);

  const handlecomment =(id:string,a:number)=>{
if(a==1){
  setComment(id)
}else
  if(comment == id){
      setComment(null)
    }else{
      setComment(id)
    }
  }



  const sendcomment = async(id:string,comment:string)=>{

    if(!id || !comment){
      toast.error("Something wrong happen")
    }

    const a =await sen({postid:id,comment}).unwrap()
    if(a.success){
      setCom("")
    }





  }


  useEffect(() => {
    let id: string;

    if (cil) {
      id = toast.loading("");
    }
    if (cis) {
      toast.success(cd.message);
    }

    if (cie && ce && "data" in ce) {
      const err = ce.data as errortype;
      toast.error(err.message);
    }

    return () => {
      if (id) toast.dismiss(id);
    };
  }, [cd, ce,cie,cis,cil]);
  return (
    pis && (
      <>
        {postdata!.payload.map((item, id) => (
          <div
            key={id}
            className="post relative flex flex-col gap-3.5 mt-3 pb-6 border-b border-b-gray-500"
          >
            {comment==item._id && 
            <div className=" mnb absolute rounded-2xl bg-white z-30 size-130 top-5 left-20">
<IoIosClose onClick={()=>setComment(null)} className=" absolute  right-4 top-2 text-2xl cursor-pointer" />
<div className=" h-[93%] mt-[7%] overflow-y-auto px-3 py-2 flex gap-2 flex-col rounded-2xl">
  
 
  {item.comments.length<1 && 
  
   <div className="w-full text-2xl h-full flex justify-center items-center pb-20">No comment yet</div>}

  



      { item.comments.map((a,id)=>(

        <>
       




{item.comments.length>0 &&
  <Comment key={id} length={item.comments.length} profilepic={a.sender.profilepic} fullname={a.sender.fullname} comment={a.comment}/>
}
  

        </>
      ))}

      



</div>
            </div>
            }

            <div className="top flex items-center  -amber-400 gap-2 relative">
              <div className="profile size-10  rounded-full bg-amber-800">
                <img
                  className="w-full object-center object-cover h-full rounded-full"
                  src={item.author?.profilepic}
                  alt=""
                />
              </div>
              <div className="name font-bold flex items-center gap-6">{item.author?.fullname}  {item.author._id == user?._id && <div className="bg-black px-3 rounded-2xl text-white text-[.9rem] font-light">author</div>}</div>

              <div
                className="edit absolute right-2  flex items-center  bottom-2.5 leading-tight  text-3xl font-extrabold hover:cursor-pointer"
                onClick={()=>handleclick(item._id)}
              >
                ...
              </div>
            </div>

            {edit === item._id && (
              <>
                <div className="absolute flex p-5 rounded-2xl flex-col z-20  asd right-6 top-5">
                  {user?._id == item.author?._id && (
                    <div
                      onClick={() => handledelete(item?._id)}
                      className="cursor-pointer"
                    >
                      Delete
                    </div>
                  )}
                  <div className="cursor-pointer">Share</div>
                  <div onClick={()=>handleclick(item._id)} className="cursor-pointer">
                    Cancel
                  </div>
                </div>
              </>
            )}
            <div className="mid flex flex-col">
              <div className="w-full  h-100">
                <img
                  className="h-full w-full object-center object-cover"
                  src={item?.post}
                  alt=""
                />
              </div>
              <div className="flex mt-1 w-[90%] mx-auto justify-between">
                <div className="midleft flex gap-4">
                  {!item.likes?.find((i) => i == user?._id) ? (
                    <AiOutlineHeart
                      size={25}
                      className="hover:cursor-pointer"
                      onClick={() => handlelike(item._id)}
                    />
                  ) : (
                    <AiFillHeart
                      size={25}
                      className="hover:cursor-pointer"
                      onClick={() => handlelike(item._id)}
                    />
                  )}

                  <FaRegComment onClick={()=>handlecomment(item._id,2)} className="cursor-pointer" size={22} />

                  {share ? (
                    <IoShareSocial size={22} onClick={() => setshare(!share)} />
                  ) : (
                    <IoShareSocialOutline
                      onClick={() => setshare(!share)}
                      size={22}
                    />
                  )}
                </div>
                <div className="midright">
                  {!item.bookmarks?.find((it) => it == user?._id) ? (
                    <BsBookmark
                      size={22}
                      className="hover:cursor-pointer"
                      onClick={() => handlebookmark(item._id)}
                    />
                  ) : (
                    <BsBookmarkFill
                      size={22}
                      className="hover:cursor-pointer"
                      onClick={() => handlebookmark(item._id)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="bottom flex flex-col gap-1 w-[90%] mx-auto">
              <div className="likes">
                {item.likes.length>0?item.likes.length : 0} <span className="font-bold">like</span>
              </div>
              <div className="likes">
                <span className="font-bold">{item?.author?.username}</span>&nbsp;{" "}
                {item.caption}
              </div>
              <div className="flex ">
                <input
                  type="text "
                  onChange={(e)=>setCom(e.target.value)}
                  value={com}
                  className="outline-none bg-white w-full px-2 py-1"
                  placeholder="Add a comment"
                  onClick={()=>handlecomment(item._id,1)}
                />
                <IoMdSend onClick={()=>{sendcomment(item._id,com)}} className="cursor-pointer" size={24} />
              </div>
            </div>
          </div>
        ))}

        {postdata.payload.length<1 && <div className="h-150 w-full flex justify-center items-center text-2xl font-bold ">No post found</div>}
        
      </>
    )
  );
};

const Post = () => {
  return (
    <div className="posts flex flex-col   gap-2.5">
      <Singlepost />
    </div>
  );
};

export default Post;
