import express from 'express';
import {jwt_secret} from '@repo/backend-common/config';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

console.log('Starting API server at port 3000......');
app.listen(3000);