import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 512 }).notNull(),
    role: varchar("role", { length: 50 }).notNull().default("admin"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const blogPosts = mysqlTable("blog_posts", {
    id: int("id").primaryKey().autoincrement(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    title: varchar("title", { length: 512 }).notNull(),
    content: varchar("content", { length: 65535 }).notNull(),
    tags: varchar("tags", { length: 512 }),
    thumbnail: varchar("thumbnail", { length: 512 }),
    authorId: int("author_id").references(() => users.id).notNull(),
    status: int("status").references(() => status.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const status = mysqlTable("status", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 50 }).notNull().unique(),
});

export const storeSettings = mysqlTable("store_settings", {
    id: int("id").primaryKey().autoincrement(),
    store_name: varchar("store_name", { length: 256 }).notNull(),
    store_description: varchar("store_description", { length: 1024 }).notNull(),
    store_logo: varchar("store_logo", { length: 512 }).notNull(),
    favicon: varchar("favicon", { length: 512 }).notNull(),
    contact_email: varchar("contact_email", { length: 256 }).notNull(),
    contact_phone: varchar("contact_phone", { length: 50 }).notNull(),
    address: varchar("address", { length: 512 }).notNull(),
    facebook: varchar("facebook", { length: 512 }).notNull(),
    twitter: varchar("twitter", { length: 512 }).notNull(),
    instagram: varchar("instagram", { length: 512 }).notNull(),
    linkedin: varchar("linkedin", { length: 512 }).notNull(),
    meta_title: varchar("meta_title", { length: 256 }).notNull(),
    meta_description: varchar("meta_description", { length: 512 }).notNull(),
    meta_keywords: varchar("meta_keywords", { length: 512 }).notNull(),
    footer_text: varchar("footer_text", { length: 512 }).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
