import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function runMigration() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'content_solution',
    });

    try {
        const sqlPath = path.join(process.cwd(), 'drizzle', '0004_add_slug_to_services_details.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

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
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

runMigration();
