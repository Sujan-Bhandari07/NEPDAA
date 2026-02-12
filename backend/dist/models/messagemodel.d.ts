import mongoose from "mongoose";
interface messageschematype extends Document {
    _id: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message?: string;
    post?: string;
    posttype?: "video" | "image" | "";
    reaction?: [
        {
            emoji: string;
            emojer: mongoose.Types.ObjectId;
        }
    ];
    lastmessage: mongoose.Types.ObjectId;
    seen: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Message: mongoose.Model<messageschematype, {}, {}, {}, mongoose.Document<unknown, {}, messageschematype, {}, mongoose.DefaultSchemaOptions> & messageschematype & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, messageschematype>;
export default Message;
//# sourceMappingURL=messagemodel.d.ts.map