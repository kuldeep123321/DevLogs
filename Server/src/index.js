import express from 'express';
import cors from 'cors';
import authRoutes from "./auth/routes.js";
import 'dotenv/config';
import testConnection from './DB/db.js';
testConnection();
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.listen(process.env.PORT,()=>{
    console.log("CHECKING DB URL:", process.env.DATABASE_URL ? "URL MIL GAYI! ✅" : "NAHI MILI ❌");
    console.log('server is running on port 3000')
});