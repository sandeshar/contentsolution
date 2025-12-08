import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users, status } from "./schema";

// Individual Service Posts (like blog posts)
export const servicePosts = mysqlTable("service_posts", {
    id: int("id").primaryKey().autoincrement(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    title: varchar("title", { length: 512 }).notNull(),
    excerpt: varchar("excerpt", { length: 512 }).notNull(),
    content: varchar("content", { length: 65535 }).notNull(),
    thumbnail: varchar("thumbnail", { length: 512 }),
    icon: varchar("icon", { length: 100 }), // Material icon name for service
    featured: int("featured").default(0).notNull(), // Show on homepage/services page
    authorId: int("author_id").references(() => users.id).notNull(),
    statusId: int("status_id").references(() => status.id).notNull(),
    meta_title: varchar("meta_title", { length: 256 }),
    meta_description: varchar("meta_description", { length: 512 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
