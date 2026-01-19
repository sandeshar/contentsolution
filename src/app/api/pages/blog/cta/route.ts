import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { BlogPageCTA } from "@/models/Pages";

export async function GET() {
    try {
        await dbConnect();
        const cta = await BlogPageCTA.findOne({ is_active: 1 }).lean();

        if (!cta) {
            return NextResponse.json({
                title: "Stay Ahead of the Curve",
                description: "Get the latest content marketing tips delivered to your inbox.",
                button_text: "Subscribe"
            });
        }

        return NextResponse.json({ ...cta, id: cta._id });
    } catch (error) {
        console.error("Error fetching blog page cta:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, description, button_text, is_active } = body;

        const result = await BlogPageCTA.create({
            title,
            description,
            button_text,
            is_active: is_active !== undefined ? (is_active ? 1 : 0) : 1
        });

        return NextResponse.json({ success: true, id: result._id });
    } catch (error) {
        console.error("Error creating blog page cta:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, title, description, button_text, is_active } = body;

        if (!id) {
            const first = await BlogPageCTA.findOne();
            if (first) {
                await BlogPageCTA.findByIdAndUpdate(first._id, { title, description, button_text, is_active: is_active ? 1 : 0 });
                return NextResponse.json({ success: true });
            }
            const res = await BlogPageCTA.create({ title, description, button_text, is_active: is_active ? 1 : 0 });
            return NextResponse.json({ success: true, id: res._id });
        }

        await BlogPageCTA.findByIdAndUpdate(id, { title, description, button_text, is_active: is_active ? 1 : 0 });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating blog page cta:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
