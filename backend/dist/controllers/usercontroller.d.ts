import type { Request, Response } from "express";
import type { Authtype, checkresetotptype, checkverifyotptype, followtype, newpasswordtype, sendresetotptype, updatetype } from "../types/authtype.js";
import type { responsetype } from "../types/responsetype.js";
import type { logintype, register } from "../types/usertype.js";
declare const registeruser: (req: Request<{}, {}, register>, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>> | undefined>;
declare const login: (req: Request<{}, {}, logintype>, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>> | undefined>;
declare const logout: (req: Request, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const getuser: (req: Authtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const updateprofile: (req: updatetype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const sendverifyotp: (req: Authtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const checkverifyotp: (req: checkverifyotptype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const sendresetotp: (req: Request<{}, {}, sendresetotptype>, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const checkresetotp: (req: Request<{}, {}, checkresetotptype>, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const newpassword: (req: Request<{}, {}, newpasswordtype>, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const followorunfollow: (req: followtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>> | undefined>;
declare const getuserforsidebar: (req: Authtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
export { getuser, getuserforsidebar, login, logout, registeruser, updateprofile, sendresetotp, sendverifyotp, checkverifyotp, checkresetotp, newpassword, followorunfollow, };
//# sourceMappingURL=usercontroller.d.ts.map