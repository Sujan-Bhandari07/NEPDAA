import mongoose from "mongoose";
import type { user } from "../types/schematypes.js";





const userschema = new mongoose.Schema<user>(
  {
   username:{
    type:String,
    required:true,
    unique:false

   },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      required: true,
    },
    coverpic: {
      type: String,
      required: true,
    },
    isverified: {
      type: Boolean,
      default: false,
      require: true,
    },
    verifyotp: {
      type: String,

      default: "",
    },
    verifyotpexp: {
      type: Number,
      default: 0,
      required: true,
    },
    resetotp: {
      type: String,

      default:"",
    },

    resetotpexp: {
      type: Number,
      default: 0,
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",


      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,


        ref:"User",
      },
    ],

  },
  { timestamps: true }
);

const User=mongoose.model<user>("User",userschema)
export default User