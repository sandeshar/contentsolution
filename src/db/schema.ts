import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 512 }).notNull(),
    role: varchar("role", { length: 50 }).notNull(),
    status: int("status").references(() => status.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
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
    updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});

export const status = mysqlTable("status", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 50 }).notNull().unique(),
});
