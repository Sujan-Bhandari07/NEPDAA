import mongoose from "mongoose";
interface conversationschemtype extends Document {
    createdAt: Date;
    updatedAt: Date;
    participants: mongoose.Types.Array<mongoose.Types.ObjectId>;
    messages: mongoose.Types.Array<mongoose.Types.ObjectId>;
}
declare const Conversation: mongoose.Model<conversationschemtype, {}, {}, {}, mongoose.Document<unknown, {}, conversationschemtype, {}, mongoose.DefaultSchemaOptions> & conversationschemtype & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, conversationschemtype>;
export default Conversation;
//# sourceMappingURL=conversationmodel.d.ts.map