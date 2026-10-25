import type { Socket } from "socket.io-client";

let socketClient: Socket | null = null;

export const setSocketClient = (socket: Socket) => {
  socketClient = socket;
};

export const getSocketClient = () => socketClient;

export const clearSocketClient = (socket: Socket) => {
  if (socketClient === socket) {
    socketClient = null;
  }
};
