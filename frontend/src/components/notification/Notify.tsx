import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setnotification } from "../../store/postslice";
import { getSocketClient } from "../../store/socketClient";

const Notify = () => {
  const connected = useAppSelector((state) => state.socket.connected);
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.post);

  useEffect(() => {
    const socket = getSocketClient();
    if (!socket) return;

    socket.on("notification", (data) => {
      dispatch(setnotification({ data: data }));
    });

    return () => {
      socket.off("notification");
    };
  }, [connected, dispatch]);

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
