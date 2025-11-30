import { drizzle } from 'drizzle-orm/mysql2';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;
export const db = drizzle(connectionString);
