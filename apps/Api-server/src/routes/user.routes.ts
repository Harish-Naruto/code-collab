import express, { Router } from 'express'
import { validate, updateProfileSchema } from '../middleware/validate';
import { getUserProfile, updateUserProfile, deleteUserProfile} from '../controller/user.controller';
import { protect } from '../middleware/authmiddleware';


const router:express.Router = express.Router();

// User profile management endpoints

router.get('/getprofile', protect, getUserProfile);  // /me

router.put('/updateprofile', protect, validate(updateProfileSchema), updateUserProfile);

router.delete('/deleteprofile', protect, deleteUserProfile);


export default router