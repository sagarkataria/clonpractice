import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

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
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})