import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './utils/errorhandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'; 
import { StatusCodes } from 'http-status-codes';
import { port } from './config/config';
import { supabase } from './config/supabase';



const app: express.Application = express();

//middleware 
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' });
});


app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);



app.use(errorHandler);



app.listen(port,()=>{
  console.log(`server running on port ${port}`)
});

