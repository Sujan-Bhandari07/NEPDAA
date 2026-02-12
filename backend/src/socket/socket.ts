import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const usersocketmap: Record<string, string> = {};
export const getsocketid = (id: string) => {
  return usersocketmap[id];
};

io.on("connection", (socket) => {
  const userid = socket.handshake.query.userid as string;
  if (userid) {
    usersocketmap[userid] = socket.id;
  }

  io.emit("getonlineusers", Object.keys(usersocketmap));

  socket.on("disconnect", () => {
    if (userid) {
      delete usersocketmap[userid];
    }
    io.emit("getonlineusers", Object.keys(usersocketmap));
  });
});

export { app, server, io };
