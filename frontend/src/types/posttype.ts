export interface PostItem {
  _id: string
  author: {
    profilepic:string,
    fullname:string,
    _id:string,
    username:string
  }
  post: string
  likes: string[]        // list of user IDs who liked
  comments: Array<{
    _id: string;
  comment: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  post: string; // ID of the post
  sender: {
    fullname: string;
    profilepic: string;
  }}>
  bookmarks: string[]
  mediatype: "image" | "video"
  caption?: string       // caption can be optional
  createdAt: string
  updatedAt: string
  __v: number
}

interface getallposttype {
    success:boolean,
    message:string,
    payload:Array<PostItem>
}

export type {getallposttype}