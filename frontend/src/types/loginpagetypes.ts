interface formtype {
username:string,
email:string,
password:string,
fullname:string,
otps:string,

newpassword:string
}

interface errortype {
    success:boolean,
    message:string
}


interface successtype {
    success:boolean,
    message:string,


}


interface getuser {

    success:boolean,
    message:string,
    payload?:usertype[]
}

interface gu {

    success:boolean,
    message:string,
    payload?:usertype
}

interface usertype {
    _id:string,
    username:string,
    fullname:string,
    email:string,
    password?:string,
    bio:string,
    profilepic:string,
    coverpic:string,
    verifyotp:string,
    isverified:boolean,
    verifyotpexp:number,
    resetotp:string,
    resetotpexp:number,
    followers:string,
    following:string,
    createdAt:Date,
    updatedAt:Date



}


export type{formtype,errortype,successtype,usertype,getuser,gu}