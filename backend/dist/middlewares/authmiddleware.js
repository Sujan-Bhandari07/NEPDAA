import { err } from "../utils/response.js";
import jwt, {} from "jsonwebtoken";
import mongoose from "mongoose";
const auth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return err(res, "User not authenticated");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.user = new mongoose.Types.ObjectId(decoded._id);
        }
        next();
    }
    catch (error) {
        return err(res, error.message);
    }
};
export { auth };
//# sourceMappingURL=authmiddleware.js.map