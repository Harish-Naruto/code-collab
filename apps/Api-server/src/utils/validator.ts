import {z} from 'zod'

export const userSchema = z.object({
    name:z.string().max(30),
    username:z.string().min(3).max(20),
    email:z.string().email(),
    password: z.string().min(3).max(20).regex(/[^a-zA-Z0-9]/).regex(/[a-z]/),
    
})