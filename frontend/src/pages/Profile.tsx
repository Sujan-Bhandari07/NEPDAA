import {  useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useGetuserQuery, useUpdateprofileMutation } from "../store/userapi";
import { useGetbookmarkpostQuery, useGetownpostQuery } from "../store/postapi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import toast from "react-hot-toast";
import type { errortype } from "../types/loginpagetypes";

const Profile = () => {
  const [
    update,
    { data: upd, isError, isLoading, isSuccess, error },
  ] = useUpdateprofileMutation();

  const [type, setType] = useState("post");
  const [edit, setEdit] = useState(false);

  const [change, setChange] = useState({
    username: "",
    fullname: "",
    password: "",
    bio: "",
    profile: null as File | null,
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChange((prev) => ({ ...prev, [name]: value }));
  };

  const { data } = useGetuserQuery();
  const { data: pd } = useGetownpostQuery();

  const handletype = (id: number) => {
    if (id == 1) setType("post");
    else if (id == 2) setType("saved");
    else if (id == 3) setType("reels");
  };

  const handlesubmit = async () => {
    const formdata = new FormData();
    if (change.bio) formdata.append("bio", change.bio);
    if (change.fullname) formdata.append("fullname", change.fullname);
    if (change.username) formdata.append("username", change.username);
    if (change.password) formdata.append("password", change.password);
    if (change.profile) formdata.append("profilepic", change.profile);

    const a = await update(formdata).unwrap();
    if (a.success) {
      setChange({
        username: "",
        password: "",
        fullname: "",
        bio: "",
        profile: null,
      });
    }
    setEdit(false);
  };

  useEffect(() => {
    let id: string;
    if (isSuccess) toast.success(upd?.message || "Updated");
    if (isLoading) id = toast.loading("Updating...");
    if (isError && error && "data" in error) {
      const err = error.data as errortype;
      toast.error(err.message);
    }
    return () => {
      if (id) toast.dismiss(id);
    };
  }, [upd, error, isError, isLoading, isSuccess]);

  return (
    <div className="profile flex flex-col relative h-[97vh] gap-[5%] px-16">
      {edit && (
        <div className="absolute w-120 p-4 gap-4 rounded-2xl flex flex-col z-30 bg-white left-80 top-40">
          <div className="size-20 rounded-full border relative">
            {change.profile ? (
              <img
                className="size-full rounded-full object-center object-cover"
                src={URL.createObjectURL(change.profile)}
                alt=""
              />
            ) : (
              <FaCloudUploadAlt className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7" />
            )}
            <input
              type="file"
              onChange={(e) =>
                setChange((prev) => ({
                  ...prev,
                  profile: e.target.files![0],
                }))
              }
              className="opacity-0 absolute inset-0 cursor-pointer"
            />
          </div>

          <input
            className="outline-none p-2 border border-gray-600"
            onChange={handlechange}
            name="username"
            value={change.username}
            type="text"
            placeholder="Enter new username"
          />
          <input
            className="outline-none p-2 border border-gray-600"
            onChange={handlechange}
            name="fullname"
            value={change.fullname}
            type="text"
            placeholder="Enter new fullname"
          />
          <input
            className="outline-none p-2 border border-gray-600"
            onChange={handlechange}
            name="password"
            type="password"
            value={change.password}
            placeholder="Enter new password"
          />
          <input
            className="outline-none p-2 border border-gray-600"
            onChange={handlechange}
            name="bio"
            value={change.bio}
            type="text"
            placeholder="Enter new bio"
          />

          <div className="flex justify-center">
            <button
              onClick={handlesubmit}
              className="bg-black cursor-pointer text-white px-4 py-1"
            >
              Update
            </button>
          </div>

          <IoIosClose
            onClick={() => setEdit(false)}
            className="absolute right-3 text-3xl cursor-pointer"
          />
        </div>
      )}

      {/* PROFILE HEADER */}
      <div className="h-[40%] flex justify-center items-center gap-6">
        <div className="size-33 rounded-full bg-black">
          <img
            className="object-center rounded-full object-cover h-full w-full"
            src={data?.payload?.profilepic}
            alt=""
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className="px-3 py-1.4 rounded-xl font-semibold">
              {data?.payload?.fullname}
            </div>
            <div className="bg-gray-300 px-3 rounded-xl py-1.4 capitalize">
              view archive
            </div>
            <div
              className="bg-gray-300 px-3 rounded-xl py-1.4 capitalize cursor-pointer"
              onClick={() => setEdit(!edit)}
            >
              edit profile
            </div>
            <div className="bg-gray-300 px-3 py-1.4 rounded-2xl capitalize">
              ad tools
            </div>
          </div>

          <div className="flex gap-3 items-center pl-3">
            <div>
              <b>{pd?.payload.length}</b> posts
            </div>
            <div>
              <b>{data?.payload?.followers.length}</b> followers
            </div>
            <div>
              <b>{data?.payload?.following.length}</b> following
            </div>
          </div>

          <div className="font-bold pl-3">{data?.payload?.bio}</div>
        </div>
      </div>

      {/* TABS */}
      <div className="h-[55%] border-t border-gray-400 flex flex-col items-center">
        <div className="flex py-2 gap-7">
          <div
            onClick={() => handletype(1)}
            className={`${type == "post" && "bg-gray-400"} cursor-pointer px-2 rounded-2xl`}
          >
            POSTS
          </div>
          <div
            onClick={() => handletype(2)}
            className={`${type == "saved" && "bg-gray-400"} cursor-pointer px-2 rounded-2xl`}
          >
            SAVED
          </div>
          <div
            onClick={() => handletype(3)}
            className={`${type == "reels" && "bg-gray-400"} cursor-pointer px-2 rounded-2xl`}
          >
            REELS
          </div>
        </div>

        {/* IMAGE / VIDEO GRID */}
        <div className="flex gap-3 flex-wrap overflow-y-auto w-full ">
          <SP type={type} />

        </div>
      </div>
    </div>
  );
};

export default Profile;

// ========================
// === SP COMPONENT ======
// ========================

const SP = ({ type }: { type: string }) => {
  const [loveIndex, setLoveIndex] = useState<number | null>(null);

  const { data: bokkmarkdata } = useGetbookmarkpostQuery();
  const { data: ownpost } = useGetownpostQuery();

  const items =
    type === "post"
      ? ownpost?.payload.filter((item) => item.mediatype === "image")
      : type === "saved"
      ? bokkmarkdata?.payload
      : type === "reels"
      ? ownpost?.payload.filter((item) => item.mediatype === "video")
      : [];

  return (
    <>
      {items?.map((item, idx) => (
        <div key={idx} className="size-49 relative">
          {item.mediatype === "image" ? (
            <img
              src={item.post}
              className="object-cover object-center w-full h-full"
              alt=""
            />
          ) : (
            <video
              src={item.post}
              muted
              loop
              autoPlay={type === "reels"}
              playsInline
              className="object-cover object-center w-full h-full"
            />
          )}

          <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
            {loveIndex === idx ? (
              <AiFillHeart
                className="cursor-pointer"
                onClick={() => setLoveIndex(null)}
                size={30}
                color="white"
              />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer"
                onClick={() => setLoveIndex(idx)}
                size={30}
                color="white"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};
