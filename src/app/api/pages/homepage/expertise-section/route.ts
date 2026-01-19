import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HomepageExpertiseSection } from '@/models/Homepage';
import { revalidateTag } from 'next/cache';

// GET - Fetch expertise section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const section = await HomepageExpertiseSection.findById(id).lean();

            if (!section) {
                return NextResponse.json({ error: 'Expertise section not found' }, { status: 404 });
            }

            return NextResponse.json(section);
        }

        const section = await HomepageExpertiseSection.findOne({ is_active: true }).lean();

        if (!section) {
            // Return empty object to allow admin UI to create new entry
            return NextResponse.json({});
        }

        return NextResponse.json(section);
    } catch (error) {
        console.error('Error fetching expertise section:', error);
        return NextResponse.json({ error: 'Failed to fetch expertise section' }, { status: 500 });
    }
}

// POST - Create expertise section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, description, is_active = true } = body;

        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        const section = await HomepageExpertiseSection.create({ title, description, is_active });
        revalidateTag('homepage-expertise-section');
        return NextResponse.json(
            { success: true, message: 'Expertise section created successfully', id: section._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating expertise section:', error);
        return NextResponse.json({ error: 'Failed to create expertise section' }, { status: 500 });
    }
}

// PUT - Update expertise section
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, title, description, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const section = await HomepageExpertiseSection.findByIdAndUpdate(id, { title, description, is_active }, { new: true });

        if (!section) {
            return NextResponse.json({ error: 'Expertise section not found' }, { status: 404 });
        }

        revalidateTag('homepage-expertise-section');
        return NextResponse.json({ success: true, message: 'Expertise section updated successfully', data: section });
    } catch (error) {
        console.error('Error updating expertise section:', error);
        return NextResponse.json({ error: 'Failed to update expertise section' }, { status: 500 });
    }
}

// DELETE - Delete expertise section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const section = await HomepageExpertiseSection.findByIdAndDelete(id);

        if (!section) {
            return NextResponse.json({ error: 'Expertise section not found' }, { status: 404 });
        }

        revalidateTag('homepage-expertise-section');
        return NextResponse.json({ success: true, message: 'Expertise section deleted successfully' });
    } catch (error) {
        console.error('Error deleting expertise section:', error);
        return NextResponse.json({ error: 'Failed to delete expertise section' }, { status: 500 });
    }
}
