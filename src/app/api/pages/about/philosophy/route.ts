import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AboutPagePhilosophy } from '@/models/AboutPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch philosophy section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const philosophy = await AboutPagePhilosophy.findById(id).lean();

            if (!philosophy) {
                return NextResponse.json({ error: 'Philosophy section not found' }, { status: 404 });
            }

            return NextResponse.json({ ...philosophy, id: philosophy._id });
        }

        const philosophy = await AboutPagePhilosophy.findOne({ is_active: 1 }).lean();

        if (!philosophy) {
            return NextResponse.json({ error: 'No active philosophy section found' }, { status: 404 });
        }

        return NextResponse.json({ ...philosophy, id: philosophy._id });
    } catch (error) {
        console.error('Error fetching philosophy section:', error);
        return NextResponse.json({ error: 'Failed to fetch philosophy section' }, { status: 500 });
    }
}

// POST - Create philosophy section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, description, is_active = 1 } = body;

        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        const result = await AboutPagePhilosophy.create({ title, description, is_active: is_active ? 1 : 0 });
        try { revalidateTag('about-philosophy'); } catch (e) {}
        return NextResponse.json(
            { success: true, message: 'Philosophy section created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating philosophy section:', error);
        return NextResponse.json({ error: 'Failed to create philosophy section' }, { status: 500 });
    }
}

// PUT - Update philosophy section
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, title, description, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (is_active !== undefined) updateData.is_active = is_active ? 1 : 0;

        await AboutPagePhilosophy.findByIdAndUpdate(id, updateData);

        try { revalidateTag('about-philosophy'); } catch (e) {}

        return NextResponse.json({ success: true, message: 'Philosophy section updated successfully' });
    } catch (error) {
        console.error('Error updating philosophy section:', error);
        return NextResponse.json({ error: 'Failed to update philosophy section' }, { status: 500 });
    }
}

// DELETE - Delete philosophy section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await AboutPagePhilosophy.findByIdAndDelete(id);

        try { revalidateTag('about-philosophy'); } catch (e) {}

        return NextResponse.json({ success: true, message: 'Philosophy section deleted successfully' });
    } catch (error) {
        console.error('Error deleting philosophy section:', error);
        return NextResponse.json({ error: 'Failed to delete philosophy section' }, { status: 500 });
    }
}
