"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const fs_1 = require("fs");
const path_1 = require("path");
async function runMigration() {
    const connection = await promise_1.default.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'content_solution',
    });
    try {
        const sqlPath = path_1.default.join(process.cwd(), 'drizzle', '0004_add_slug_to_services_details.sql');
        const sql = fs_1.default.readFileSync(sqlPath, 'utf8');
        // Split by semicolon and execute each statement
        const statements = sql.split(';').filter(s => s.trim());
        for (const statement of statements) {
            if (statement.trim()) {
                console.log('Executing:', statement.substring(0, 80) + '...');
                await connection.execute(statement);
                console.log('✓ Success');
            }
        }
        console.log('\n✅ All migrations completed successfully!');
    }
    catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
    finally {
        await connection.end();
    }
}
runMigration();
