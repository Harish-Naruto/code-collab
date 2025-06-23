
import dotenv from 'dotenv';
dotenv.config({path:require('path').resolve(__dirname,'../../.env')});
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development'
const jwt_secret = process.env.JWT_SECRET || 'your-secret'
const jwt_expiresIn = process.env.JWT_EXPIRES_IN || 360000
export{
    port,
    nodeEnv,
    jwt_expiresIn,
    jwt_secret
}