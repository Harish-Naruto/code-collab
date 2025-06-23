
import { NextFunction, Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { jwt_expiresIn, jwt_secret } from '../config/config';
import { supabase } from '../config/supabase';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errorhandler';


const generateToken = (id:string) => {
    return jwt.sign({id},jwt_secret,{
        expiresIn:jwt_expiresIn as number
    });
}

export const register = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {email,username,password,name} = req.body;
        const {data:existingUser} = await supabase 
        .from('Users')
        .select('id')
        .eq('email',email)
        .single();

        if(existingUser){
            throw new AppError('User already exists',StatusCodes.BAD_REQUEST)
        }

        const {data:authUser,error:authError} = await supabase.auth.signUp({
            email,
            password
        })
        if(authError){
            throw new Error(authError.message);
        }
        const userId = authUser.user?.id;

        const {data:user,error} = await supabase
        .from('Users')
        .insert([{
            id:userId,
            email,
            username,
            name
        }])
        .select()
        .single();
        
        if(error){
            throw new Error(error.message);
        }

        const token = generateToken(user.id);


        res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            user: {
            id: user.id,
            email: user.email,
            role: user.role,
            profile_data: user.profile_data
            },
            token
        }
        });        

    }catch(error){
        next(error);
    }
    
}