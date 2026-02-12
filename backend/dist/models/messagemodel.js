import mongoose from "mongoose";
const messageschema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
    },
    post: {
        type: String,
    },
    posttype: {
        type: String,
        enum: ["video", "image", ""]
    },
    reaction: [{
            emoji: {
                type: String,
            },
            emojer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    lastmessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    seen: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });
const Message = mongoose.model("Message", messageschema);
export default Message;
//# sourceMappingURL=messagemodel.js.map