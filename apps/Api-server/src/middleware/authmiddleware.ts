import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config/config';
import { Request,Response,NextFunction } from 'express';
import { AppError } from '../utils/errorhandler';
import { StatusCodes } from 'http-status-codes';
import { supabase } from '../config/supabase';
;

interface AuthRequest extends Request {
    user?:{
        id:string;
        email:string;
    }
}


export const protect = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    
        const authheader = req.headers.authorization;
        if(!authheader || !authheader.startsWith('Bearer ')){
            throw new AppError("No token in headers",StatusCodes.UNAUTHORIZED);
        }
        const token = authheader.split(' ')[1] as string;

        if(!jwt_secret){
            throw new AppError("No jwt secret found ",StatusCodes.UNAUTHORIZED)
        }

        const decoded = jwt.verify(token,jwt_secret) as {id:string,email:string}
        const userId = decoded.id 

        const {data:user, error} = await supabase
        .from('Users')
        .select('id,email,username,name')
        .eq('id',userId)
        .single();

        if(error || !user){
            throw new AppError("user doesnot exist ",StatusCodes.UNAUTHORIZED);
        }

        req.user = user;
        next();
    
};