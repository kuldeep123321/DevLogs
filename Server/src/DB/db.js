import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';

export default async function testConnection() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Neon DB ke liye zaroori hai
        },
    });

    try {
        console.log("🚀 Neon DB se connect karne ki koshish kar raha hoon...");
        await client.connect();
        
        console.log("✅ SUCCESS: Neon DB se connection ban gaya!");
        
        // Ek choti si query maar ke dekhte hain server time ke liye
        const res = await client.query('SELECT NOW()');
        console.log("🕒 DB Server Time:", res.rows[0].now);

        await client.end();
    } catch (err) {
        console.error("❌ ERROR: Connection fail ho gaya!");
        console.error("Dhyan se dekh error kya hai:", err.message);
    }
}
