import express from "express"

import { auth } from "../middlewares/authmiddleware.js"
import upload from "../middlewares/multer.js"
import { deletemessage, editmessage, getconversation, reactmessage, sendmessage } from "../controllers/messagecontroller.js"

const messagerouter = express.Router()

messagerouter.post("/sendmessage",auth,upload.fields([{name:"post",maxCount:1}]),sendmessage)
messagerouter.post("/deletemessage",auth,deletemessage)
messagerouter.post("/editmessage",auth,editmessage)
messagerouter.get("/getconversation/:receiverid",auth,getconversation)
messagerouter.post("/reactmessage",auth,reactmessage)

export { messagerouter }
