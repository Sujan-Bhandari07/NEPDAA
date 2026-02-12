import { Fragment } from "react/jsx-runtime";
import { useAppSelector } from "../../store/Hooks";
import {
  useFolloworunfollowMutation,
  useGetuserQuery,
  useGetusersforsidebarQuery,

} from "../../store/userapi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { errortype } from "../../types/loginpagetypes";

const Rightside = () => {
  const [
    follow,
    { data: fd, error: fe, isError: fie, isSuccess: fis, isLoading: fil },
  ] = useFolloworunfollowMutation();
  const { user } = useAppSelector((state) => state.user);

  const { data:ud } = useGetuserQuery();
  const{data}=useGetusersforsidebarQuery()

  const handlefollow = (id: string) => {
    follow({ id });
  };

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

  return (
    <div className="   flex flex-col gap-2 ml-10 relative ">
      <div className="righttop flex items-center  gap-3 text-[0.9rem] mb-7 ">
        <div className="h-11 w-11 flex-none overflow-hidden bg-red-400 df  ">
          <img
            className="w-11 h-11 overflow-hidden object-center object-cover df"
            src={ud?.payload?.profilepic}
            alt="profile"
          />
        </div>
        <div className="flex flex-col">
          <div className="name font-bold leading-4 text-1xl">
            {ud?.payload?.fullname}
          </div>
          <div className="bio font-light text-gray-600">{ud?.payload?.bio}</div>
        </div>
      </div>
      <div className="rightmid w-full flex gap-40">
        <div className="text-gray-600 text-[.9rem]">Suggested for you</div>
        <div className="font-bold hover:cursor-pointer">See All</div>
      </div>
      <div className="rightbottom flex flex-col gap-5 ">
        {data?.payload?.filter(item=>!item.followers.includes(user?._id as string)).slice(0, 5)
          .map((item, id) => (
            <Fragment key={id}>
              <div
                className="flex items-center gap-10
        \
        0"
              >
                <div className="flex gap-2">
                  <div className="size-11 rounded-full">
                    <img
                      className="size-11 rounded-full object-cover object-center "
                      src={item?.profilepic}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="name font-bold">{item?.fullname}</div>
                    <div className="text-[.9rem] text-gray-599">
                      Suggested for you
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handlefollow(item?._id)}
                  className="text-blue-500 hover:cursor-pointer pl-10"
                >
                  Follow
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default Rightside;
