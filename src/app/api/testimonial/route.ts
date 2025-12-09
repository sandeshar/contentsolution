import { db } from "@/db";
import { reviewTestimonials } from "@/db/reviewSchema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const service = parseInt(searchParams.get('service') || '0');
    const homepage = searchParams.get('homepage');
    const limit = parseInt(searchParams.get('limit') || '0');
    if (homepage === '1' || homepage === 'true') {
        const response = await db.select().from(reviewTestimonials).orderBy(desc(reviewTestimonials.date)).limit(limit || 3);
        return NextResponse.json(response);
    }
    if (service) {
        const response = await db.select().from(reviewTestimonials).where(eq(reviewTestimonials.id, service)).limit(limit || 1);
        return NextResponse.json(response);
    }
}
export async function POST(request: NextRequest) {
    try {
        const { name, url, role, content, rating, service } = await request.json();

        // Basic validation
        if (!name || !url || !role || !content || !rating || !service) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const result = await db.insert(reviewTestimonials).values({
            name,
            url,
            role,
            content,
            rating,
            service
        });
        return NextResponse.json({ success: true, id: result[0].insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
export async function PUT(request: NextRequest) {
    try {
        const { id, name, url, role, content, rating, service } = await request.json();

        // Basic validation
        if (!id) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (url) updateData.url = url;
        if (role) updateData.role = role;
        if (content) updateData.content = content;
        if (rating) updateData.rating = rating;
        if (service) updateData.service = service;

        const result = await db.update(reviewTestimonials).set(updateData).where(eq(reviewTestimonials.id, id));

        return NextResponse.json({ success: true, id: result[0].insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest) {
    const token = request.cookies.get('admin_auth')?.value;
    const id = request.nextUrl.searchParams.get('id');
    if (!token) {
        return NextResponse.json(
            { error: 'Unauthorized - No token provided' },
            { status: 401 }
        );
    }
    try {
        const result = await db.delete(reviewTestimonials).where(eq(reviewTestimonials.id, parseInt(id!)));
        return NextResponse.json({ success: true, id: result[0].insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}