import { NextResponse } from "next/server";
import { db } from "@/db";
import { navbarItems } from "@/db/navbarSchema";

export async function POST() {
    try {
        // Check if navbar items already exist
        const existing = await db.select().from(navbarItems).limit(1);
        if (existing.length > 0) {
            return NextResponse.json({ message: "Navbar items already seeded" });
        }

        // Seed default navbar items
        const defaultItems = [
            { label: 'Home', href: '/', order: 0, is_button: 0, is_active: 1 },
            { label: 'Services', href: '/services', order: 1, is_button: 0, is_active: 1 },
            { label: 'About Us', href: '/about', order: 2, is_button: 0, is_active: 1 },
            { label: 'Blog', href: '/blog', order: 3, is_button: 0, is_active: 1 },
            { label: 'FAQ', href: '/faq', order: 4, is_button: 0, is_active: 1 },
            { label: 'Contact', href: '/contact', order: 5, is_button: 0, is_active: 1 },
            { label: 'Get a Quote', href: '/contact', order: 6, is_button: 1, is_active: 1 },
        ];

        for (const item of defaultItems) {
            await db.insert(navbarItems).values(item);
        }

        return NextResponse.json({ message: "Navbar items seeded successfully" });
    } catch (error) {
        console.error("Error seeding navbar items:", error);
        return NextResponse.json({ error: "Failed to seed navbar items" }, { status: 500 });
    }
}
