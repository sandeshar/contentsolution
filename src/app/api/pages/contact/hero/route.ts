import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ContactPageHero } from '@/models/ContactPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch hero section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const hero = await ContactPageHero.findById(id).lean();

            if (!hero) {
                return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
            }

            return NextResponse.json({ ...hero, id: hero._id });
        }

        const hero = await ContactPageHero.findOne({ is_active: 1 }).lean();

        if (!hero) {
            return NextResponse.json({ error: 'No active hero section found' }, { status: 404 });
        }

        return NextResponse.json({ ...hero, id: hero._id });
    } catch (error) {
        console.error('Error fetching hero section:', error);
        return NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 });
    }
}

// POST - Create hero section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { tagline, title, description, is_activeValue = 1 } = body;

        if (!tagline || !title || !description) {
            return NextResponse.json({ error: 'Tagline, title, and description are required' }, { status: 400 });
        }

        const result = await ContactPageHero.create({
            tagline,
            title,
            description,
            is_active: is_activeValue ? 1 : 0
        });

        try { revalidateTag('contact-hero'); } catch (e) { }

        return NextResponse.json(
            { success: true, message: 'Hero section created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating hero section:', error);
        return NextResponse.json({ error: 'Failed to create hero section' }, { status: 500 });
    }
}

// PUT - Update hero section
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, tagline, title, description, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (tagline !== undefined) updateData.tagline = tagline;
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (is_active !== undefined) updateData.is_active = is_active ? 1 : 0;

        await ContactPageHero.findByIdAndUpdate(id, updateData);

        try { revalidateTag('contact-hero'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Hero section updated successfully' });
    } catch (error) {
        console.error('Error updating hero section:', error);
        return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 });
    }
}

// DELETE - Delete hero section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await ContactPageHero.findByIdAndDelete(id);

        try { revalidateTag('contact-hero'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Hero section deleted successfully' });
    } catch (error) {
        console.error('Error deleting hero section:', error);
        return NextResponse.json({ error: 'Failed to delete hero section' }, { status: 500 });
    }
}
