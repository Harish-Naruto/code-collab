import { Request } from "express";

export type authUser = {
    email:string;
    password:string;
}


export  interface AuthRequest extends Request {
    user?:{
        id:string;
        email:string;
    }
}


