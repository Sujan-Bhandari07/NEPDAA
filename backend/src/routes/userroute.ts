import express from "express"
import { checkresetotp, checkverifyotp, followorunfollow, getuser, getuserforsidebar, login, logout, newpassword, registeruser, sendresetotp, sendverifyotp, updateprofile } from "../controllers/usercontroller.js"
import { auth } from "../middlewares/authmiddleware.js"
import upload from "../middlewares/multer.js"

const userrouter = express.Router()
userrouter.post("/register",registeruser)
userrouter.post("/login",login)
userrouter.post("/logout",logout)
userrouter.get("/getuser",auth,getuser)
userrouter.get("/getusersforsidebar",auth,getuserforsidebar)
userrouter.post("/updateprofile", auth, upload.fields([{name:"profilepic",maxCount:1},{name:"coverpic",maxCount:1}]), updateprofile)
userrouter.post("/sendverifyotp",auth,sendverifyotp)
userrouter.post("/sendresetotp",sendresetotp)
userrouter.post("/checkresetotp",checkresetotp)
userrouter.post("/checkverifyotp",auth,checkverifyotp)
userrouter.post("/newpassword",newpassword)
userrouter.post("/followorunfollow",auth,followorunfollow)



export {userrouter}