import express, { Router } from 'express'
import { userSchema } from '../utils/validator'
import { validate } from '../middleware/validate';
import { register } from '../controller/auth.controller';

const router:express.Router = express.Router();



router.post('/register',validate(userSchema),register);


export default router