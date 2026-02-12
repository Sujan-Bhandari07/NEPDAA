 interface Message {
  sender: string
  receiver: string
  message: string
  post: string
  posttype: string
  seen: boolean
  _id: string
  reaction: unknown[]    // or a specific type if you know what reactions look like
  createdAt: Date    // ISO date string
  updatedAt: Date     // ISO date string
  __v: number
}

interface socketmessag{
    success:boolean,
    message:string,
    payload:{
        message:Message
    }
}
interface sendresponse {
    success:boolean,
    message:string,
    payload?:{
        newmessage:Message
    }
}

export type {Message,sendresponse,socketmessag}