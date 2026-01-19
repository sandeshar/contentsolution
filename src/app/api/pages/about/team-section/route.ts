import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AboutPageTeamSection } from '@/models/AboutPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch team section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const section = await AboutPageTeamSection.findById(id).lean();

            if (!section) {
                return NextResponse.json({ error: 'Team section not found' }, { status: 404 });
            }

            return NextResponse.json({ ...section, id: section._id });
        }

        const section = await AboutPageTeamSection.findOne({ is_active: 1 }).lean();

        if (!section) {
            return NextResponse.json({ error: 'No active team section found' }, { status: 404 });
        }

        return NextResponse.json({ ...section, id: section._id });
    } catch (error) {
        console.error('Error fetching team section:', error);
        return NextResponse.json({ error: 'Failed to fetch team section' }, { status: 500 });
    }
}

// POST - Create team section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, description, is_active = 1 } = body;

        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        const result = await AboutPageTeamSection.create({ title, description, is_active: is_active ? 1 : 0 });

        try { revalidateTag('about-team-section'); } catch (e) { }

        return NextResponse.json(
            { success: true, message: 'Team section created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating team section:', error);
        return NextResponse.json({ error: 'Failed to create team section' }, { status: 500 });
    }
}

// PUT - Update team section
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

        await AboutPageTeamSection.findByIdAndUpdate(id, updateData);

        try { revalidateTag('about-team-section'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Team section updated successfully' });
    } catch (error) {
        console.error('Error updating team section:', error);
        return NextResponse.json({ error: 'Failed to update team section' }, { status: 500 });
    }
}

// DELETE - Delete team section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await AboutPageTeamSection.findByIdAndDelete(id);

        try { revalidateTag('about-team-section'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Team section deleted successfully' });
    } catch (error) {
        console.error('Error deleting team section:', error);
        return NextResponse.json({ error: 'Failed to delete team section' }, { status: 500 });
    }
}
