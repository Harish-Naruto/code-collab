import express, { Router } from 'express'
import { forgotPasswordSchema, resetPasswordSchema, userSchema } from '../utils/validator'
import { validate } from '../middleware/validate';
import { forgotpassword, register, resetpassword, login ,verify, verifyOtp} from '../controller/auth.controller';
import { protect } from '../middleware/authmiddleware';
import { resetPasswordLimiter, verifyOtpLimiter } from '../utils/ratelimter';

const router:express.Router = express.Router();

// Authentication endpoints

router.post('/register',validate(userSchema),register);

router.post('/forgotPassword',validate(forgotPasswordSchema),forgotpassword);

router.post('/resetPassword',resetPasswordLimiter,validate(resetPasswordSchema),protect,resetpassword);

router.post('/login', login);

router.post('/verifyOtp',verifyOtpLimiter,verifyOtp)

router.post('/verify', verify);


export default router