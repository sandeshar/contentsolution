require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function runMigration() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'content_solution',
    });

    try {
        const sql = fs.readFileSync('create-navbar-table.sql', 'utf8');
        await connection.execute(sql);
        console.log('✅ navbar_items table created successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

runMigration();
