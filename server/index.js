import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './routes/user.route.js';

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmet({
    crossOriginResourcePolicy:false
}))
app.use(logger("dev"));
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api/user",userRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
    console.log("MongoDB Connected");
}).catch((error)=>{
    console.error("MongoDB Connection Failed",error);
    process.exit(1);
})
