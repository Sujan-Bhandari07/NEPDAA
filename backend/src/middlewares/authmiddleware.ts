import type { NextFunction, Response } from "express";
import type { responsetype } from "../types/responsetype.js";
import { err } from "../utils/response.js";
import jwt, { type Jwt, type JwtPayload } from "jsonwebtoken";
import type { Authtype } from "../types/authtype.js";
import mongoose from "mongoose";

interface DecodedToken extends JwtPayload {
  _id: string;
}

const auth = (
  req: Authtype,
  res: Response<responsetype>,
  next: NextFunction
) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return err(res, "User not authenticated");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (decoded) {
      req.user = new mongoose.Types.ObjectId(decoded._id);
    }
    next();
  } catch (error: any) {
    return err(res, error.message);
  }
};

export { auth };
