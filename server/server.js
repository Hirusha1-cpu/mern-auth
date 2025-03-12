import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173','https://mern-auth-drab-two.vercel.app']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins ,credentials: true}));

// API endpoints
app.get('/',(req,res)=>res.send('Hello World! Finesss'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port,()=>console.log(`Server is running on port ${port}`));
// mongodb+srv://hirusha1:12345@cluster0.t980v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

