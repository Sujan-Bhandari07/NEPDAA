import mongoose from "mongoose";
import type { user } from "../types/schematypes.js";
declare const User: mongoose.Model<user, {}, {}, {}, mongoose.Document<unknown, {}, user, {}, mongoose.DefaultSchemaOptions> & user & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, user>;
export default User;
//# sourceMappingURL=usermodel.d.ts.map