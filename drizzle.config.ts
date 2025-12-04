import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: [
        './src/db/schema.ts',
        './src/db/homepageSchema.ts',
        './src/db/servicesPageSchema.ts',
        './src/db/aboutPageSchema.ts',
        './src/db/contactPageSchema.ts',
        './src/db/faqPageSchema.ts',
        './src/db/termsPageSchema.ts',
        './src/db/blogPageSchema.ts',
    ],
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
