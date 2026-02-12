import mongoose from "mongoose";
import type { commenttype } from "../types/schematypes.js";


const commentschema = new mongoose.Schema<commenttype>({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})


const Comment = mongoose.model<commenttype>("Comment",commentschema)
export default Comment