// Import dependencies
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-auth-drab-two.vercel.app',
  'https://mern-auth-client-81ifaaheb-hirushafernando121gmailcoms-projects.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

app.get('/api/debug', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
    env: process.env.NODE_ENV,
    cors: {
      allowedOrigins
    }
  });
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export the Express API
module.exports = app;