import { StatusCodes } from "http-status-codes";
import { Response,Request,NextFunction } from "express";

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: any, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production mode
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
};

export {
  AppError,
  errorHandler
};
