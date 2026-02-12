import { Fragment, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setconversation } from "../../store/conversationslice";
import type { Message } from "../../types/messagetype";

const Singlemes = () => {
  const { socket } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  const { user, selecteduser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (socket) {
      socket.on("newmessage", (data: Message) => {
        dispatch(setconversation(data));
      });
    }

    return () => {
      socket?.off("newmessage");
    };
  }, [socket, dispatch, selecteduser]);

  const { messages } = useAppSelector((state) => state.conversation);
  console.log(messages);

  const bottomref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (bottomref.current) {
      bottomref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selecteduser, messages]);

  return (
    <Fragment>
      {messages?.map((item, id) => (
        <div
          key={id}
          className={` ${item?.sender !== user?._id ? "fir" : "sec"} max-w-120 w-fit  px-4 py-1 rounded-2xl `}
        >
          {item?.message}
        </div>
      ))}

      <div ref={bottomref}></div>
    </Fragment>
  );
};

export default Singlemes;
