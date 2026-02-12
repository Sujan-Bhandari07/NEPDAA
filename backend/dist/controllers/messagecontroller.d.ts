import type { Response } from "express";
import type { deletemessagetype, editmessagetype, getconversationtype, reactmessagetype, sendmessagetype } from "../types/authtype.js";
import type { responsetype } from "../types/responsetype.js";
declare const sendmessage: (req: sendmessagetype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>> | undefined>;
declare const deletemessage: (req: deletemessagetype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const editmessage: (req: editmessagetype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const reactmessage: (req: reactmessagetype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const getconversation: (req: getconversationtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
export { getconversation, sendmessage, deletemessage, editmessage, reactmessage };
//# sourceMappingURL=messagecontroller.d.ts.map