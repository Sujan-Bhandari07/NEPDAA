import mongoose from "mongoose";
interface user {
    _id: mongoose.Types.ObjectId;
    username: string;
    fullname: string;
    email: string;
    password: string;
    bio: string;
    profilepic: string;
    coverpic: string;
    verifyotp: string;
    isverified: boolean;
    verifyotpexp: number;
    resetotp: string;
    resetotpexp: number;
    followers: mongoose.Types.Array<mongoose.Types.ObjectId>;
    following: mongoose.Types.Array<mongoose.Types.ObjectId>;
    createdAt: Date;
    updatedAt: Date;
}
type md = "image" | "video";
interface posttype {
    _id: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    caption: string;
    post: string;
    mediatype: md;
    likes: mongoose.Types.Array<mongoose.Types.ObjectId>;
    comments: mongoose.Types.Array<mongoose.Types.ObjectId>;
    bookmarks: mongoose.Types.Array<mongoose.Types.ObjectId>;
    createdAt: Date;
    updatedAt: Date;
}
interface commenttype {
    sender: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    comment: string;
}
export type { user, posttype, commenttype };
//# sourceMappingURL=schematypes.d.ts.map