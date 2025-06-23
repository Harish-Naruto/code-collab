import express, { Router } from 'express'
import { resetPasswordSchema, userSchema } from '../utils/validator'
import { validate } from '../middleware/validate';
import { forgotpassword, register, resetpassword } from '../controller/auth.controller';

const router:express.Router = express.Router();



router.post('/register',validate(userSchema),register);

router.post('/forgotPassword',forgotpassword);

router.post('/resetPassword',validate(resetPasswordSchema),resetpassword);


export default router