import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://nepdaa-frontend.onrender.com",
].filter((origin): origin is string => Boolean(origin));

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const usersocketmap = new Map<string, Set<string>>();

io.on("connection", (socket) => {
  const userid = socket.handshake.query.userid;
  if (typeof userid === "string" && userid.length > 0) {
    const sockets = usersocketmap.get(userid) ?? new Set<string>();
    sockets.add(socket.id);
    usersocketmap.set(userid, sockets);
    socket.join(userid);
  }

  io.emit("getonlineusers", Array.from(usersocketmap.keys()));

  socket.on("disconnect", () => {
    if (typeof userid === "string") {
      const sockets = usersocketmap.get(userid);
      sockets?.delete(socket.id);
      if (sockets?.size === 0) {
        usersocketmap.delete(userid);
      }
    }
    io.emit("getonlineusers", Array.from(usersocketmap.keys()));
  });
});

export { app, server, io };
