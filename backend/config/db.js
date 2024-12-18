import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool(process.env.DB_URL);

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to the database successfully.');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
})();

export default db;




