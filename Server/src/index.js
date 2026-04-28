import express from 'express';
import cors from 'cors';
import authRoutes from "./auth/routes.js";
import cookieParser from "cookie-parser";

import 'dotenv/config';
import testConnection from './DB/db.js';
testConnection();
const app=express();
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin === 'http://localhost:5173') {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.listen(process.env.PORT,()=>{
    console.log("CHECKING DB URL:", process.env.DATABASE_URL ? "URL MIL GAYI! ✅" : "NAHI MILI ❌");
    console.log('server is running on port 3000')
});