import mongoose from "mongoose";


interface messageschematype extends Document{

    _id:mongoose.Types.ObjectId,
    sender:mongoose.Types.ObjectId,
    receiver:mongoose.Types.ObjectId,
    message?:string ,
    post?:string,
    posttype?:"video" | "image" |"",
    reaction?:[
        {
            emoji:string,
            emojer:mongoose.Types.ObjectId
        }
    ],
    lastmessage:mongoose.Types.ObjectId,
    seen:boolean,
    createdAt:Date,
    updatedAt:Date

}





const messageschema = new mongoose.Schema<messageschematype>({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"

    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,


    },

    post:{
        type:String,

    },
    posttype:{
        type:String,
        enum:["video","image",""]    },

    reaction:[{
        emoji:{
            type:String,
        },
        emojer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
            
    }
       
    ],
    lastmessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    seen:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

const Message = mongoose.model<messageschematype>("Message",messageschema)
export default Message