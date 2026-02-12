import mongoose from "mongoose";
import type { posttype } from "../types/schematypes.js";

const postschema = new mongoose.Schema<posttype>({
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
post:{
    type:String,
},


likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",

}],
comments:[{
    type:mongoose.Schema.Types.ObjectId,
  ref:"Comment",
}],
bookmarks:[{
    type:mongoose.Schema.Types.ObjectId,
      ref:"User",

}],
mediatype:{
    type:String,
    enum:["image","video"]
},
caption:{
    type:String,
    
},

    
},{timestamps:true})

const Post = mongoose.model<posttype>("Post",postschema)
export default Post