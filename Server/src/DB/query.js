import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';

export const executeQuery = async (text, params) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    try {
        await client.connect(); // Har baar connect karna padega tere logic ke hisaab se
        const res = await client.query(text, params);
        await client.end();   // Kaam hone ke baad connection band
        return res;
    } catch (err) {
        console.error("❌ Query Error:", err.message);
        if (client) await client.end();
        throw err;
    }
};