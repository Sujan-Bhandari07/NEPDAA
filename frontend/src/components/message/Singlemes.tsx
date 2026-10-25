import { Fragment, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setconversation } from "../../store/conversationslice";
import type { Message } from "../../types/messagetype";
import { getSocketClient } from "../../store/socketClient";

const Singlemes = () => {
  const connected = useAppSelector((state) => state.socket.connected);
  const dispatch = useAppDispatch();

  const { user, selecteduser } = useAppSelector((state) => state.user);

  useEffect(() => {
    const socket = getSocketClient();
    if (!socket) return;

    const handleNewMessage = (data: Message) => {
      if (
        selecteduser &&
        (data.sender === selecteduser._id ||
          data.receiver === selecteduser._id)
      ) {
        dispatch(setconversation(data));
      }
    };

    socket.on("newmessage", handleNewMessage);

    return () => {
      socket.off("newmessage", handleNewMessage);
    };
  }, [connected, dispatch, selecteduser]);

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
