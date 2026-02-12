import type { Request } from "express";
import type mongoose from "mongoose";


interface Authtype extends Request {
  user?: mongoose.Types.ObjectId,
}
interface updatetype extends Authtype {
  password?: string,
  bio?: string,
  fullname?: string,
  username?: string,
  coverpic?:string,
  profilepic?:string
}

interface checkverifyotptype extends Authtype{
otp?:string|number
}
interface sendresetotptype {
    email:string
}
interface checkresetotptype extends Authtype{
    email:string,
    otp:number| string
}

interface newpasswordtype{
    password:string,
    confirmpassword:string,email:string
}

interface followtype extends Authtype{
    id?:string
}

interface createposttype extends Authtype{
post?:string,
caption?:string
}


interface liketype extends Authtype{
postid?:string
}

interface commentonposttype extends Authtype{
  postid?:string
}

interface bookmarkposttype extends Authtype{
  postid?:string
}


interface deletecommenttype extends Authtype{
  postid?:string
}

interface getconversationtype extends Authtype{
  receiverid?:string
}


interface sendmessagetype extends Authtype{
  message?:string,
  receiverid?:string

}

interface deletemessagetype extends Authtype{
  messageid?:string,
  receiverid?:string
  

}
interface editmessagetype extends Authtype{
  messageid?:string,
  message?:string,

  

}

interface reactmessagetype extends Authtype{
  messageid?:string,
emoji?:string
  

}



export type {getconversationtype,reactmessagetype,editmessagetype,deletemessagetype,sendmessagetype,deletecommenttype,bookmarkposttype,commentonposttype,followtype, liketype,createposttype,Authtype,updatetype ,newpasswordtype,checkverifyotptype,sendresetotptype,checkresetotptype};
