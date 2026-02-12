import mongoose from "mongoose";
import type { commenttype } from "../types/schematypes.js";
declare const Comment: mongoose.Model<commenttype, {}, {}, {}, mongoose.Document<unknown, {}, commenttype, {}, mongoose.DefaultSchemaOptions> & commenttype & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, commenttype>;
export default Comment;
//# sourceMappingURL=commentmodel.d.ts.map