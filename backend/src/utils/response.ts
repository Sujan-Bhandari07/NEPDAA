import type { Response } from "express";
import type { responsetype } from "../types/responsetype.js";


const success= (res:Response<responsetype>,message:string,data?:any )=>{

    if(!data){

        return res.status(200).json({
            success:true,
            message
        })
    }else{
        return res.status(200).json({
            success:true,
            message,
            payload:data
        })
    }


}


const err=(res:Response<responsetype>,message:string)=>{
    return res.status(400).json({
        success:false,
        message
    })
}

export {success,err}
