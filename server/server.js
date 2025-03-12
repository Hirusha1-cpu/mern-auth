import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-auth-drab-two.vercel.app',
  'https://mern-auth-client-81ifaaheb-hirushafernando121gmailcoms-projects.vercel.app'
];

// Set up CORS middleware
// Set up CORS middleware
app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
  
      // List of allowed origins
      const allowedOrigins = [
        'http://localhost:5173',
        'https://mern-auth-drab-two.vercel.app',
        'https://mern-auth-client-81ifaaheb-hirushafernando121gmailcoms-projects.vercel.app'
      ];
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Allowed headers
  }));

// Middleware
app.use(express.json());
app.use(cookieParser());

// API endpoints
app.get('/', (req, res) => res.send('Hello World! Finesss'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));