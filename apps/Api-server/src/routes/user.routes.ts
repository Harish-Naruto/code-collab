import express, { Router } from 'express'
import { forgotPasswordSchema, resetPasswordSchema, userSchema } from '../utils/validator'
import { validate, updateProfileSchema } from '../middleware/validate';
import { logout, getUserProfile, updateUserProfile, deleteUserProfile} from '../controller/auth.controller';
import { protect } from '../middleware/authmiddleware';
import { resetPasswordLimiter, verifyOtpLimiter } from '../utils/ratelimter';

const router:express.Router = express.Router();

router.post('/logout', protect, logout); 

router.get('/getprofile', protect, getUserProfile);  // /me

router.put('/updateprofile', protect, validate(updateProfileSchema), updateUserProfile);

router.delete('/deleteprofile', protect, deleteUserProfile);


export default router