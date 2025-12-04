import { db } from "@/db";
import { blogPageHero, blogPageCTA } from "@/db/blogPageSchema";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Seed Hero
        const heroCount = await db.select().from(blogPageHero);
        if (heroCount.length === 0) {
            await db.insert(blogPageHero).values({
                title: "The Content Solution Blog",
                subtitle: "Expert insights, trends, and strategies in content marketing for Nepali businesses.",
                background_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP7wRSP6PNVQerc44qHCLRoYYd7gD0XXulRDkuPttKz8c2wm7R80QfOir0XcMWFKjBGgyJ5pcMWrIKbPt6SCgNWruICSXdJlao0ovxqmc5rLvSBMdY5X6oZLjHPx9qPTGkgNMIYnTzo9hXeQxzkwUbhDDc7WVvEd49h17mKa6w8QfB2EIEDD7W8XIG5RncWJ-n5n8nCSqHu4E6zkNP0BsMHsoIQz9Vpi8C5qNBL4Po-ca4mAAVTciZ-3q8TREYwunoIejOppPSO_k"
            });
        }

        // Seed CTA
        const ctaCount = await db.select().from(blogPageCTA);
        if (ctaCount.length === 0) {
            await db.insert(blogPageCTA).values({
                title: "Stay Ahead of the Curve",
                description: "Get the latest content marketing tips delivered to your inbox.",
                button_text: "Subscribe"
            });
        }

        return NextResponse.json({ message: "Blog page seeded successfully" });
    } catch (error) {
        console.error("Error seeding blog page:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
