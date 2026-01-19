import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { BlogPageHero } from "@/models/Pages";

export async function GET() {
    try {
        await dbConnect();
        const hero = await BlogPageHero.findOne({ is_active: 1 }).lean();

        if (!hero) {
            return NextResponse.json({
                title: "The Content Solution Blog",
                subtitle: "Expert insights, trends, and strategies in content marketing for Nepali businesses.",
                background_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP7wRSP6PNVQerc44qHCLRoYYd7gD0XXulRDkuPttKz8c2wm7R80QfOir0XcMWFKjBGgyJ5pcMWrIKbPt6SCgNWruICSXdJlao0ovxqmc5rLvSBMdY5X6oZLjHPx9qPTGkgNMIYnTzo9hXeQxzkwUbhDDc7WVvEd49h17mKa6w8QfB2EIEDD7W8XIG5RncWJ-n5n8nCSqHu4E6zkNP0BsMHsoIQz9Vpi8C5qNBL4Po-ca4mAAVTciZ-3q8TREYwunoIejOppPSO_k"
            });
        }

        return NextResponse.json({ ...hero, id: hero._id });
    } catch (error) {
        console.error("Error fetching blog page hero:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, subtitle, background_image, is_active } = body;

        const result = await BlogPageHero.create({
            title,
            subtitle,
            background_image,
            is_active: is_active !== undefined ? (is_active ? 1 : 0) : 1
        });

        return NextResponse.json({ success: true, id: result._id });
    } catch (error) {
        console.error("Error creating blog page hero:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, title, subtitle, background_image, is_active } = body;

        if (!id) {
            const first = await BlogPageHero.findOne();
            if (first) {
                await BlogPageHero.findByIdAndUpdate(first._id, { title, subtitle, background_image, is_active: is_active ? 1 : 0 });
                return NextResponse.json({ success: true });
            }
            const res = await BlogPageHero.create({ title, subtitle, background_image, is_active: is_active ? 1 : 0 });
            return NextResponse.json({ success: true, id: res._id });
        }

        await BlogPageHero.findByIdAndUpdate(id, { title, subtitle, background_image, is_active: is_active ? 1 : 0 });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating blog page hero:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
