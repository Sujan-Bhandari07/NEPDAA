import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');


import { userrouter } from "./routes/userroute.js";
import { postrouter } from "./routes/postroute.js";
import { messagerouter } from "./routes/messageroute.js";

import {app,server} from "./socket/socket.js"
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 9000

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,         // allow cookies/auth

  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(cookieParser());
app.use("/api/user",userrouter)
app.use("/api/post",postrouter)
app.use("/api/message",messagerouter)



server.listen(PORT,()=>{
    console.log("App is listening")
})
