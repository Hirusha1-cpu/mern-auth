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

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:5173', 'https://mern-auth-drab-two.vercel.app'];

app.use(express.json());
app.use(cookieParser());

// CORS Middleware with dynamic origin handling
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

// Preflight request handling for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// API Endpoints
app.get('/', (req, res) => res.send('Hello World! Finesss'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start the server
app.listen(port, () => console.log(`✅ Server is running on port ${port}`));
