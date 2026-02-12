import mongoose from "mongoose";
const conversatiomschema = new mongoose.Schema({
    participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }]
}, { timestamps: true });
const Conversation = mongoose.model("Conversation", conversatiomschema);
export default Conversation;
//# sourceMappingURL=conversationmodel.js.map