import { executeQuery } from '../db/query.js';

// Naya user DB mein daalne ke liye
export const createUserInDb = async (username, email, password, role) => {
    const sql = `
        INSERT INTO "Users" (username, email, password, role) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, username, email, role`;
    
    const result = await executeQuery(sql, [username, email, password, role]);
    return result.rows[0];
};
// User find karne ke liye
export const findUserByEmailInDb = async (email) => {
    const sql = 'SELECT * FROM "Users" WHERE email = $1';
    const result = await executeQuery(sql, [email]);
    return result.rows[0];
};
export const refreshtokenindb = async (userId, expiresat) => {
    const sql = 'INSERT INTO "refresh_tokens" (user_id, expires_at) VALUES ($1, $2) RETURNING token';
    const result = await executeQuery(sql, [userId, expiresat]);
    return result.rows[0].token;
};
export const findrefreshtokenindb = async (token) => {
    const sql = `
        SELECT rt.token, rt.expires_at, rt.user_id,
               u.email, u.role
        FROM "refresh_tokens" rt
        JOIN "Users" u ON rt.user_id = u.id
        WHERE rt.token = $1
          AND rt.expires_at > NOW()
    `;
    const result = await executeQuery(sql, [token]);
    return result.rows[0];
};
export const deleteRefreshtokenFromDb = async (token) => {
    const sql = `DELETE FROM "refresh_tokens" WHERE token = $1`;
    await executeQuery(sql, [token]);
};