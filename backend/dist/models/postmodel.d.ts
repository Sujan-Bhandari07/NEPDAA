import mongoose from "mongoose";
import type { posttype } from "../types/schematypes.js";
declare const Post: mongoose.Model<posttype, {}, {}, {}, mongoose.Document<unknown, {}, posttype, {}, mongoose.DefaultSchemaOptions> & posttype & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, posttype>;
export default Post;
//# sourceMappingURL=postmodel.d.ts.map