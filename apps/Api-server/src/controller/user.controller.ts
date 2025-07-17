import { NextFunction, Request, Response } from 'express';
import { jwt_expiresIn, jwt_secret } from '../config/config';
import { supabase } from '../config/supabase';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errorhandler';
import { AuthRequest } from '../types/types';







export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            throw new AppError('User not authenticated', StatusCodes.UNAUTHORIZED);
        }

        const { data: user, error } = await supabase
            .from('Users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error || !user) {
            throw new AppError('User profile not found', StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { email, username, name, avatar_url } = req.body;

        if (!userId) {
            throw new AppError('User not authenticated', StatusCodes.UNAUTHORIZED);
        }

        // Optional: You can still perform unique checks for email/username here if desired

        const { data: updatedUser, error } = await supabase
            .from('Users')
            .update([{
                username: username || undefined,
                name: name || undefined,
                avatar_url: avatar_url || undefined,
                
            }])
            .eq('id', userId)
            .select('id, username, name, avatar_url')
            .single();

        if (error) {
            console.error('Supabase update error:', error.message);
            throw new AppError('Failed to update user profile', StatusCodes.INTERNAL_SERVER_ERROR);
        }

        if (!updatedUser) {
            throw new AppError('User not found for update', StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: { user: updatedUser }
        });

    } catch (error) {
        next(error);
    }
};


export const deleteUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            throw new AppError('User not authenticated', StatusCodes.UNAUTHORIZED);
        }

        const { error, count } = await supabase
            .from('Users')
            .delete()
            .eq('id', userId);

        if (error) {
            console.error('Supabase delete error:', error.message);
            throw new AppError(`Failed to delete user profile: ${error.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
        }

        if (count === 0) {
            throw new AppError('User not found or already deleted', StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'User profile deleted successfully'
        });

    } catch (error) {
        next(error);
    }
};
