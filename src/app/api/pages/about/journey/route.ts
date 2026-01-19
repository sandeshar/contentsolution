import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AboutPageJourney } from '@/models/AboutPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch journey section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const journey = await AboutPageJourney.findById(id).lean();

            if (!journey) {
                return NextResponse.json({ error: 'Journey section not found' }, { status: 404 });
            }

            return NextResponse.json({ ...journey, id: journey._id });
        }

        const journey = await AboutPageJourney.findOne({ is_active: 1 }).lean();

        if (!journey) {
            return NextResponse.json({ error: 'No active journey section found' }, { status: 404 });
        }

        return NextResponse.json({ ...journey, id: journey._id });
    } catch (error) {
        console.error('Error fetching journey section:', error);
        return NextResponse.json({ error: 'Failed to fetch journey section' }, { status: 500 });
    }
}

// POST - Create journey section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, paragraph1, paragraph2, thinking_box_title, thinking_box_content, is_active = 1 } = body;

        if (!title || !paragraph1 || !paragraph1 || !paragraph2 || !thinking_box_title || !thinking_box_content) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const result = await AboutPageJourney.create({
            title,
            paragraph1,
            paragraph2,
            thinking_box_title,
            thinking_box_content,
            is_active: is_active ? 1 : 0,
        });

        return NextResponse.json(
            { success: true, message: 'Journey section created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating journey section:', error);
        return NextResponse.json({ error: 'Failed to create journey section' }, { status: 500 });
    }
}

// PUT - Update journey section
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, title, paragraph1, paragraph2, thinking_box_title, thinking_box_content, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (paragraph1 !== undefined) updateData.paragraph1 = paragraph1;
        if (paragraph2 !== undefined) updateData.paragraph2 = paragraph2;
        if (thinking_box_title !== undefined) updateData.thinking_box_title = thinking_box_title;
        if (thinking_box_content !== undefined) updateData.thinking_box_content = thinking_box_content;
        if (is_active !== undefined) updateData.is_active = is_active ? 1 : 0;

        await AboutPageJourney.findByIdAndUpdate(id, updateData);
        try { revalidateTag('about-journey'); } catch (e) {}
        return NextResponse.json({ success: true, message: 'Journey section updated successfully' });
    } catch (error) {
        console.error('Error updating journey section:', error);
        return NextResponse.json({ error: 'Failed to update journey section' }, { status: 500 });
    }
}

// DELETE - Delete journey section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await AboutPageJourney.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Journey section deleted successfully' });
    } catch (error) {
        console.error('Error deleting journey section:', error);
        return NextResponse.json({ error: 'Failed to delete journey section' }, { status: 500 });
    }
}
