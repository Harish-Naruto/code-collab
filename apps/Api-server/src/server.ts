import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './utils/errorhandler';
import authRoutes from './routes/auth.routes'
import { StatusCodes } from 'http-status-codes';
import { port } from './config/config';



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



app.use(errorHandler);



app.listen(port,()=>{
  console.log(`server running on port ${port}`)
});

export default app;