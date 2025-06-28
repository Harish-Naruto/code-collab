import {z} from 'zod'
import { email } from 'zod/v4'


export const userSchema = z.object({
    name:z.string().max(30),
    username:z.string().min(3).max(20),
    email:z.string().email(),
    password: z.string().min(3).max(20).regex(/[^a-zA-Z0-9]/).regex(/[a-z]/),
    
})

export const resetPasswordSchema = z.object({  
    newPassword: z.string().min(3).max(20).regex(/[^a-zA-Z0-9]/).regex(/[a-z]/),
})  

export const forgotPasswordSchema = z.object({
    email:z.string().email()
})