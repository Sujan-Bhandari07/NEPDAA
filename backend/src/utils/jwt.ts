import jwt from "jsonwebtoken"
import type mongoose from "mongoose"

const gettoken = (id:mongoose.Types.ObjectId)=>{

    return jwt.sign({_id:id},process.env.JWT_SECRET! ,{expiresIn:"7d"})

}
export {gettoken}