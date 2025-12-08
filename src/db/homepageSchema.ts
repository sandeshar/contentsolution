import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

// Homepage Hero Section
export const homepageHero = mysqlTable("homepage_hero", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 512 }).notNull(),
    subtitle: varchar("subtitle", { length: 1024 }).notNull(),
    cta_text: varchar("cta_text", { length: 100 }).notNull(),
    cta_link: varchar("cta_link", { length: 512 }).notNull(),
    background_image: varchar("background_image", { length: 512 }).notNull(),
    is_active: int("is_active").default(1).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Homepage Trust Section (Company Logos)
export const homepageTrustLogos = mysqlTable("homepage_trust_logos", {
    id: int("id").primaryKey().autoincrement(),
    alt_text: varchar("alt_text", { length: 256 }).notNull(),
    logo_url: varchar("logo_url", { length: 512 }).notNull(),
    dark_invert: int("dark_invert").default(0).notNull(),
    display_order: int("display_order").notNull(),
    is_active: int("is_active").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const homepageTrustSection = mysqlTable("homepage_trust_section", {
    id: int("id").primaryKey().autoincrement(),
    heading: varchar("heading", { length: 256 }).notNull(),
    is_active: int("is_active").default(1).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Homepage Expertise Section
export const homepageExpertiseSection = mysqlTable("homepage_expertise_section", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 1024 }).notNull(),
    is_active: int("is_active").default(1).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const homepageExpertiseItems = mysqlTable("homepage_expertise_items", {
    id: int("id").primaryKey().autoincrement(),
    icon: varchar("icon", { length: 100 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 512 }).notNull(),
    display_order: int("display_order").notNull(),
    is_active: int("is_active").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Homepage Contact Section
export const homepageContactSection = mysqlTable("homepage_contact_section", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 1024 }).notNull(),
    name_placeholder: varchar("name_placeholder", { length: 100 }).notNull(),
    email_placeholder: varchar("email_placeholder", { length: 100 }).notNull(),
    phone_placeholder: varchar("phone_placeholder", { length: 100 }),
    service_placeholder: varchar("service_placeholder", { length: 100 }).notNull(),
    message_placeholder: varchar("message_placeholder", { length: 100 }).notNull(),
    submit_button_text: varchar("submit_button_text", { length: 100 }).notNull(),
    is_active: int("is_active").default(1).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
