import pkg from 'pg';
const {Pool}=pkg;
import 'dotenv/config';
const pool=new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,// bhai yeh security ke liye hota agar hum isey false ker rahey hai toh hum neon.tech ko bata rahey ki bhi yeh mera database or isko mein janta hoon isliye
    },
});
export const connectDb=async()=>{
    try{
        const client=await pool.connect();
        console.log("neon database is succesfully connected");
        client.release();
    }catch(err){
        console.log("database is not connected",err.message);
}
};
export default pool;
