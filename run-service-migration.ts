import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function runMigration() {
    const connection = await mysql.createConnection({
        uri: process.env.DATABASE_URL!,
    });

    try {
        const migrationFile = process.argv[2] || 'drizzle/0004_curvy_spacker_dave.sql';
        const sqlPath = path.join(process.cwd(), migrationFile);

        console.log(`📄 Reading migration file: ${sqlPath}`);
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by statement-breakpoint and execute each statement
        const statements = sql
            .split('--> statement-breakpoint')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('-->'));

        console.log(`\n🚀 Executing ${statements.length} statements...\n`);

        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.trim()) {
                const preview = statement.substring(0, 80).replace(/\n/g, ' ');
                console.log(`[${i + 1}/${statements.length}] ${preview}...`);
                await connection.execute(statement);
                console.log('✓ Success\n');
            }
        }

        console.log('✅ All migrations completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

runMigration();
