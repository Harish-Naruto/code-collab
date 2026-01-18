import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:require('path').resolve(__dirname,'../../.env')});

const jwt_secret = process.env.JWT_SECRET;

export function verifyToken(token:string){
    return jwt.verify(token,jwt_secret as string);
}