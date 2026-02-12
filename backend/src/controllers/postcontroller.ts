import type { Response, Request } from "express";
import { unlink } from "fs/promises";
import cloudinary from "../config/cloudinary.js";
import Post from "../models/postmodel.js";
import User from "../models/usermodel.js";
import type {
  Authtype,
  bookmarkposttype,
  commentonposttype,
  createposttype,
  deletecommenttype,
  liketype,
} from "../types/authtype.js";
import type { responsetype } from "../types/responsetype.js";
import { err, success } from "../utils/response.js";

import Comment from "../models/commentmodel.js";
import type { Types } from "mongoose";
import { getsocketid, io } from "../socket/socket.js";
import { profile } from "console";
import path from "path";

const createpost = async (req: createposttype, res: Response<responsetype>) => {
  const _id = req.user;
  const files = req.files as { [field: string]: Express.Multer.File[] };
  const post = files?.post?.[0];
  const {caption}=req.body
  try {
    let url: string = "";

    const user = await User.findById(_id);
    if (!user) {
      return err(res, "User not authenticated");
    }
    if (post) {
      url = (
        await cloudinary.uploader.upload(post.path, { resource_type: "auto" })
      ).secure_url;
      if (url) {
        await unlink(post.path);
      }
      
      const newpost = await Post.create({
        author: user?._id,
        post: url,
        caption:caption?caption:"",
        mediatype: post?.mimetype.startsWith("video/") ? "video" : "image",
      });

      if (!newpost) {
        return err(res, "Something went wrong");
      }
    }
    

    return success(res,post?.mimetype.startsWith("video/")?"Story uploaded..":"Post created..." );
  } catch (error: any) {
    return err(res, error.message);
  }
};

const likeorunlikepost = async (req: liketype, res: Response<responsetype>) => {
  const id = req.user;
  const { postid } = req.body;
  try {
    if (!id) {
      return err(res, "User not authenticated");
    }
    if (!postid) {
      return err(res, "post id not found");
    }
const user = await User.findById(id)
    const post = await Post.findById(postid);
    if (!post) {
      return err(res, "No post found");
    }
    if(post){
      if(post.likes.includes(id as Types.ObjectId)){
        post.likes.pull(id)
        await post.save()
        const uid=String(post.author) 
        const a = getsocketid(uid)
        console.log(a)
        if(a){
          io.to(a).emit("notification",{
            profilepic:user?.profilepic,
            name:user?.fullname,
  message:` unlikes your post.`
          })
        }

        return success(res,`Post unliked `)
      }else if( !post.likes.includes(id as Types.ObjectId)){
        post.likes.push(id)
        await post.save()
         const uid=String(post.author) 
        const a = getsocketid(uid)
        if(a){
          io.to(a).emit("notification",{
            profilepic:user?.profilepic,
  message:` likes your post.`,
  name:user?.fullname
          })
        }
        return success(res,`Post liked `)
      }
      
    }
    
  } catch (error: any) {
    return err(res, error.message);
  }
};

const commentonpost = async (
  req: commentonposttype,
  res: Response<responsetype>
) => {
  const id = req.user;
  const { postid, comment } = req.body;

  try {
    if (!id) {
      return err(res, "User not authenticated");
    }
    if (!postid) {
      return err(res, "Provide postid");
    }

    const post = await Post.findById(postid);
    if (!post) {
      return err(res, "Post not found");
    }

    const commentss = await Comment.create({
      sender: id,
      post: postid,
      comment: comment,
    });

    if (commentss) {
      post.comments.push(commentss._id);
      await post.save()
      return success(res, "Commented !");
    }
    return err(res, "Something went wrong");
  } catch (error: any) {
    return err(res, error.message);
  }
};
const bookmarkpost = async (
  req: bookmarkposttype,
  res: Response<responsetype>
) => {
  const id = req.user;
  const { postid } = req.body;
  try {
    if (!id) {
      return err(res, "User not authenticated");
    }
    if (!postid) {
      return err(res, "Provide postid");
    }
    const post = await Post.findById(postid);
    if (!post) {
      return err(res, "Post not found");
    }

    if(post.bookmarks.includes(id)){
      post.bookmarks.pull(id)
      await post.save()
      return success(res,"Post unbookmarked !")
    }else{
      post.bookmarks.push(id)
      await post.save()
      return success(res,"Post bookmarked !")
    }
    
  } catch (error: any) {
    return err(res, error.message);
  }
};

const getallpost = async (req: Request, res: Response<responsetype>) => {
  try {
    const posts = await Post.find({mediatype:"image"}).populate({
      path:"author",
      select:"profilepic fullname username"
    }).populate({
      path:"comments",
      populate:{
        path:"sender",
        select:"fullname profilepic"
      }

    });
    if (!posts) {
      return err(res, "Post not found ");
    }
    return success(res, "Post found", posts);
  } catch (error: any) {
    return err(res, error.message);
  }
};

const getownpost = async (req: Authtype, res: Response<responsetype>) => {
  try {
    const _id = req.user;
    if (!_id) {
      return err(res, "Not authenticated");
    }
    const post = await Post.find({ author: _id });
    if (!post) {
      return err(res, "Post not found");
    }
    return success(res, "Post found", post);
  } catch (error: any) {
    return err(res, error.message);
  }
};

const getbookmarkpost = async (req: Authtype, res: Response<responsetype>) => {
  const id = req.user;
  try {
    if (!id) {
      return err(res, "Not authenticated");
    }
    const post = await Post.find({ bookmarks: id });
    if (!post) {
      return err(res, "No post bookmarked");
    }
    return success(res, "founf", post);
  } catch (error: any) {
    return err(res, error.message);
  }
};



const getallstories =async (req:Request,res:Response)=>{

  try {
    const posts = await Post.find({mediatype:"video"}).populate({
      path:"author",
      select:"profilepic fullname username"
    });
    if (!posts) {
      return err(res, "stories not found ");
    }
    return success(res, "Stories found", posts);

    
  } catch (error:any) {
    return err(res,error.message)
  }
}


const deletepost = async (req: Authtype, res: Response<responsetype>) => {
  try {
    const id = req.user;
    const { postid } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return err(res, "User not found");
    }
    const deletepost = await Post.findByIdAndDelete(postid);
    if (!deletepost) {
      return err(res, "You cant delete other post");
    }
    return success(res, "Post deleted");
  } catch (error: any) {
    err(res, error.message);
  }
};

const deletecomment = async (
  req: deletecommenttype,
  res: Response<responsetype>
) => {
  const id = req.user;
  const { postid } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return err(res, "User not found");
    }

    const deletedcomment = await Comment.findOneAndDelete({
      sender: id as Types.ObjectId,
    });
    if (!deletedcomment) {
      return err(res, "Cannot delete other comment");
    }
    const post = await Post.findById(postid);
    if (!post) {
      return err(res, "Post not found");
    }

    if (deletedcomment.sender.toString() !== id?.toString()) {
      return err(res, "You are not authorized");
    }
    post.comments.pull(deletedcomment._id);
    await post.save();

    return success(res, "Comment deleted");
  } catch (error: any) {
    return err(res, error.message);
  }
};
export {
  deletecomment,
  deletepost,
  createpost,
  likeorunlikepost,
  bookmarkpost,
  commentonpost,
  getallpost,
  getbookmarkpost,
  getownpost,
  getallstories
};
