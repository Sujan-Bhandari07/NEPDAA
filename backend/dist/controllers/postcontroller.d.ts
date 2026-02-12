import type { Response, Request } from "express";
import type { Authtype, bookmarkposttype, commentonposttype, createposttype, deletecommenttype, liketype } from "../types/authtype.js";
import type { responsetype } from "../types/responsetype.js";
declare const createpost: (req: createposttype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const likeorunlikepost: (req: liketype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>> | undefined>;
declare const commentonpost: (req: commentonposttype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const bookmarkpost: (req: bookmarkposttype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const getallpost: (req: Request, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const getownpost: (req: Authtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const getbookmarkpost: (req: Authtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
declare const getallstories: (req: Request, res: Response) => Promise<Response<responsetype, Record<string, any>>>;
declare const deletepost: (req: Authtype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>> | undefined>;
declare const deletecomment: (req: deletecommenttype, res: Response<responsetype>) => Promise<Response<responsetype, Record<string, any>>>;
export { deletecomment, deletepost, createpost, likeorunlikepost, bookmarkpost, commentonpost, getallpost, getbookmarkpost, getownpost, getallstories };
//# sourceMappingURL=postcontroller.d.ts.map