import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { AppError } from "../utils/errorhandler";


export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        
        const errorMessages = error.errors.map((err) => {
          const path = err.path.length > 0 ? err.path.join('.') : 'field';
          return `${path}: ${err.message}`;
        });
        
        const errorMessage = errorMessages.join(', ');
        return next(new AppError(`Validation failed: ${errorMessage}`, StatusCodes.BAD_REQUEST));
      }
      
      
      return next(new AppError('Validation error occurred', StatusCodes.INTERNAL_SERVER_ERROR));
    }
  };
};

export const updateProfileSchema = z
  .object({
    email: z.string().email().optional(),
    username: z.string().min(3).max(20).optional(),
    name: z.string().max(30).optional(),
    avatar_url: z.string().url().optional()
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'Provide at least one field to update'
  });