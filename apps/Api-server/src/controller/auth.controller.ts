
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { jwt_expiresIn, jwt_secret } from '../config/config';
import { supabase } from '../config/supabase';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errorhandler';
import { otpStorage } from '../libs/opt.store';
import { sendOTP } from '../utils/email';


const generateToken = (id: string) => {
    return jwt.sign({ id }, jwt_secret, {
        expiresIn: jwt_expiresIn as number
    });
}

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password, name } = req.body;
        const { data: existingUser } = await supabase
            .from('Users')
            .select('id')
            .eq('email', email)
            .single();

        if (!existingUser) {
            throw new AppError('User already exists', StatusCodes.BAD_REQUEST)
        }

        const { data: authUser, error: authError } = await supabase.auth.signUp({
            email,
            password
        })
        if (authError) {
            throw new Error(authError.message);
        }
        const userId = authUser.user?.id;

        const { data: user, error } = await supabase
            .from('Users')
            .insert([{
                id: userId,
                email,
                username,
                name
            }])
            .select()
            .single();

        if (error) {
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

    } catch (error) {
        next(error);
    }

}

export const forgotpassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const { data: user, error } = await supabase
        .from('Users')
        .select('id')
        .eq('email', email)
        .single();
    if (error) {
        throw new Error(error.message);
    }

    if (!user) {
        throw new AppError("user not found", StatusCodes.BAD_REQUEST)
    }
    const otp = generateOtp();
    otpStorage.store(email, otp);
    await sendOTP(email, otp);

    res.status(StatusCodes.OK).json({
        status: 'sucess',
        message: 'OTP sent to you email'
    })
};


export const resetpassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp, newPassword } = req.body;
    const isValid = otpStorage.verify(email, otp);
    if (!isValid) {
        throw new AppError("Invalid OTP", StatusCodes.BAD_REQUEST);
    }
    const {
        data: { users },
        error: listErr
    } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });

    if (listErr) throw listErr;


    const user = users.find(u => u.email === email);

    if (!user) {
        throw new Error(`No auth user found for email ${email}`);
    }
    

    const { data, error: err } = await supabase.auth.admin.updateUserById(user.id, {
        password: newPassword
    })
    if (err) {
        throw new Error(err.message);
    }
    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'password updated'
    })

}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        
        const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            throw new AppError(authError.message, StatusCodes.UNAUTHORIZED);
        }

        if (!authUser.user) {
            throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);
        }

        
        const { data: user, error } = await supabase
            .from('Users')
            .select('*')
            .eq('id', authUser.user.id)
            .single();

        if (error || !user) {
            throw new AppError('User profile not found', StatusCodes.UNAUTHORIZED);
        }

        const token = generateToken(user.id);

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: {
                user: {
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
};




// export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//     });

//     if (error) throw error;

//     res.json({
//       url: data.url,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
