import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
const url = process.env.CLIENT_URL

// Connect to MongoDB
connectDB();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  `${url}`,
  'https://mern-auth-drab-two.vercel.app',
  'https://mern-auth-client-81ifaaheb-hirushafernando121gmailcoms-projects.vercel.app'
];

// Simplified CORS configuration that works better with Vercel
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// API endpoints
app.get('/', (req, res) => res.send('Hello World! Finesss'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/api/debug', (req, res) => {
  res.json({
    message: 'Server is running',
    env: process.env.NODE_ENV,
    cors: {
      allowedOrigins
    }
  });
});

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));