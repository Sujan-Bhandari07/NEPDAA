import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setnotification } from "../../store/postslice";

const Notify = () => {
  const { socket } = useAppSelector((state) => state.socket);
  console.log("ss", socket);
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.post);

  useEffect(() => {
    console.log("aa");
    if (!socket) return;


    socket.on("notification", (data) => {
      dispatch(setnotification({ data: data }));
    });

    return () => {
      socket?.off("notification");
    };
  }, [socket, dispatch]);

  console.log(notification);

  return (
    <>
      {notification.map((item, id) => (
        <div
          key={id}
          className="notify bg-gray-100 rounded-2xl px-2 flex gap-3 items-center"
        >
          <div className="size-15 bg rounded-full flex-none">
            <img
              src={item.profilepic}
              className="size-full rounded-full object-center object-cover"
              alt=""
            />
          </div>
          <div>
            {" "}
            <b className="text-1xl">{item.name}</b>&nbsp;&nbsp;&nbsp;
            {item.message}
          </div>
        </div>
      ))}
    </>
  );
};

export default Notify;
