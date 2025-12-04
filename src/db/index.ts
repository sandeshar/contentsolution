import { drizzle } from 'drizzle-orm/mysql2';
import { createPool, type Pool } from 'mysql2/promise';
import 'dotenv/config';
import * as schema from './schema';
import * as homepageSchema from './homepageSchema';
import * as servicesPageSchema from './servicesPageSchema';
import * as aboutPageSchema from './aboutPageSchema';
import * as contactPageSchema from './contactPageSchema';
import * as faqPageSchema from './faqPageSchema';
import * as termsPageSchema from './termsPageSchema';
import * as blogPageSchema from './blogPageSchema';

// Singleton pattern for database connection to prevent "Too many connections" error in development
const globalForDb = global as unknown as { conn: Pool | undefined };

const pool = globalForDb.conn ?? createPool({
    uri: process.env.DATABASE_URL!,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

if (process.env.NODE_ENV !== 'production') globalForDb.conn = pool;

export const db = drizzle(pool, {
    schema: {
        ...schema,
        ...homepageSchema,
        ...servicesPageSchema,
        ...aboutPageSchema,
        ...contactPageSchema,
        ...faqPageSchema,
        ...termsPageSchema,
        ...blogPageSchema,
    },
    mode: 'default'
});
