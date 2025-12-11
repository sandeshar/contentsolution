require('dotenv').config();
const mysql = require('mysql2/promise');

async function run() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'content_solution'
    });

    try {
        await conn.execute('ALTER TABLE service_posts ADD COLUMN currency VARCHAR(10) DEFAULT "USD"');
        console.log('Currency column added successfully');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await conn.end();
    }
}

run();