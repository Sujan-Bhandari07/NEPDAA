import mongoose from "mongoose";
const commentschema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Comment = mongoose.model("Comment", commentschema);
export default Comment;
//# sourceMappingURL=commentmodel.js.map