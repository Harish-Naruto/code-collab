import express, { Router } from 'express'
import { forgotPasswordSchema, resetPasswordSchema, userSchema } from '../utils/validator'
import { validate } from '../middleware/validate';
import { forgotpassword, register, resetpassword, login ,verify, verifyOtp} from '../controller/auth.controller';
import { protect } from '../middleware/authmiddleware';

const router:express.Router = express.Router();



router.post('/register',validate(userSchema),register);

router.post('/forgotPassword',validate(forgotPasswordSchema),forgotpassword);

router.post('/resetPassword',validate(resetPasswordSchema),protect,resetpassword);

router.post('/login', login);

router.post('/verifyOtp',verifyOtp)

router.post('/verify', verify);


export default router