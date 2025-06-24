import express, { Router } from 'express'
import { resetPasswordSchema, userSchema } from '../utils/validator'
import { validate } from '../middleware/validate';
import { forgotpassword, register, resetpassword, login } from '../controller/auth.controller';

const router:express.Router = express.Router();



router.post('/register',validate(userSchema),register);

router.post('/forgotPassword',forgotpassword);

router.post('/resetPassword',validate(resetPasswordSchema),resetpassword);

router.post('/login', login);

//router.get('/oauth/google', loginWithGoogle);

export default router