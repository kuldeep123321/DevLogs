import express from 'express';
import 'dotenv/config';
const app=express();
app.use(express.json());
import { connectDb } from './DataBase/Db.js';
connectDb();
app.listen(process.env.PORT,()=>{
    console.log('server is running on port 3000')
});