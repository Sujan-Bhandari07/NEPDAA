import type { Response } from "express";
import type {
  deletemessagetype,
  editmessagetype,
  getconversationtype,
  reactmessagetype,
  sendmessagetype,
} from "../types/authtype.js";
import type { responsetype } from "../types/responsetype.js";
import { err, success } from "../utils/response.js";
import cloudinary from "../config/cloudinary.js";
import { unlink } from "fs/promises";
import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js";
import type { Types } from "mongoose";
import { getsocketid, io } from "../socket/socket.js";

const sendmessage = async (
  req: sendmessagetype,
  res: Response<responsetype>
) => {
  try {
    const { message, receiverid } = req.body;
    const myid = req.user;
    const files = req.files as { [field: string]: Express.Multer.File[] };
    const mes = files?.post?.[0];
    if (!receiverid) {
      return err(res, "Select user");
    }
    let url: string = "";
    let filetype: string = "";
    if (mes) {
      url = (
        await cloudinary.uploader.upload(mes.path, { resource_type: "auto" })
      ).secure_url;
      if (url) {
        if (mes.mimetype.startsWith("image/")) {
          filetype = "image";
        } else {
          filetype = "video";
        }
      }
      await unlink(mes.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [myid, receiverid] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverid, myid],
      });
    }
    const newmessage = await Message.create({
      sender: myid as Types.ObjectId,
      receiver: receiverid as Types.ObjectId,
      message: message,
      post: url,
      posttype: filetype,
    });
    if (newmessage) {
      conversation.messages.push(newmessage._id as Types.ObjectId);
      await conversation.save()
     const id = getsocketid(receiverid)
     if(id){
      io.to(id).emit("newmessage",newmessage)
     }
      return success(res, "Message send",{newmessage});
    }
  } catch (error: any) {
    return err(res, error.message);
  }
};

const deletemessage = async (
  req: deletemessagetype,
  res: Response<responsetype>
) => {
  try {
    const myid = req.user;
    const { messageid, receiverid } = req.body;
    if (!messageid) {
      return err(res, "no");
    }
    const message = await Message.findByIdAndDelete(messageid);
    if (message) {
      let conversation = await Conversation.findOne({
        participants: { $all: [myid, receiverid] },
      });
      if (conversation) {
        conversation.messages.pull(message._id);
        await conversation.save();
        return success(res, "deleted");
      }
    }
    return err(res, "Something went wrong");
  } catch (error: any) {
    return err(res, error.message);
  }
};

const editmessage = async (
  req: editmessagetype,
  res: Response<responsetype>
) => {
  try {
    const myid = req.user;
    const { message, messageid } = req.body;
    if (!myid) {
      return err(res, "Not authenticated");
    }
    if (!message || !messageid) {
      return err(res, "Not");
    }
    const messages = await Message.findOneAndUpdate(
      { _id: messageid ,sender:myid},
      { message:message },
      { new: true }
    );
    if (messages) {
      return success(res, "message updated");
    }else{
        return err(res,"Message not found")
    }
  } catch (error: any) {
    return err(res, error.message);
  }
};

const reactmessage = async (
  req: reactmessagetype,
  res: Response<responsetype>
) => {
  try {
    const id = req.user;

    const { emoji, messageid } = req.body;

    if (!id) {
      return err(res, "Not authenticated");
    }
    if (!emoji || !messageid) {
      return err(res, "Not");
    }

    const message = await Message.findByIdAndUpdate(
      messageid,
      {
        reaction: {
          emoji: emoji,
          emojer: id,
        },
      },
      { new: true }
    );
    if (!messageid) {
      return err(res, "Message not found");
    }
    return success(res, "reacted");
  } catch (error: any) {
    return err(res, error.message);
  }
};


const getconversation = async(req:getconversationtype,res:Response<responsetype>)=>{
const id = req.user
const{receiverid}=req.params
if(!id){
  return err(res,"Not auth")
}
if(!receiverid){
  return err(res,"no receiver id")
}

const con = await  Conversation.findOne({
      participants: { $all: [id, receiverid] },
    }).populate({
      path:"messages"
    });

if(!con){
return err(res,"not found")
}

return success(res,"found",{messages:con.messages})


}


export {getconversation, sendmessage, deletemessage, editmessage, reactmessage };
