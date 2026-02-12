import mongoose from "mongoose";


interface conversationschemtype extends Document{

    createdAt:Date,
    updatedAt:Date,
    participants:mongoose.Types.Array<mongoose.Types.ObjectId>,
    messages:mongoose.Types.Array<mongoose.Types.ObjectId>
}
const conversatiomschema = new mongoose.Schema<conversationschemtype>({

    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        
    }],
    messages:[{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Message"

    }]
},{timestamps:true})


const Conversation = mongoose.model<conversationschemtype>("Conversation",conversatiomschema)
export default Conversation