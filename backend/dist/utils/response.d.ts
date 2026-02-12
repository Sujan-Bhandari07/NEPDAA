import type { Response } from "express";
import type { responsetype } from "../types/responsetype.js";
declare const success: (res: Response<responsetype>, message: string, data?: any) => Response<responsetype, Record<string, any>>;
declare const err: (res: Response<responsetype>, message: string) => Response<responsetype, Record<string, any>>;
export { success, err };
//# sourceMappingURL=response.d.ts.map