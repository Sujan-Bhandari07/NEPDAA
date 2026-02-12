import type { NextFunction, Response } from "express";
import type { responsetype } from "../types/responsetype.js";
import type { Authtype } from "../types/authtype.js";
declare const auth: (req: Authtype, res: Response<responsetype>, next: NextFunction) => Response<responsetype, Record<string, any>> | undefined;
export { auth };
//# sourceMappingURL=authmiddleware.d.ts.map