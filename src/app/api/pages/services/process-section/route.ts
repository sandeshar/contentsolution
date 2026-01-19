import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ServicePageProcessSection } from '@/models/Services';
import { revalidateTag } from 'next/cache';

// GET - Fetch process section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const section = await ServicePageProcessSection.findById(id).lean();

            if (!section) {
                return NextResponse.json({ error: 'Process section not found' }, { status: 404 });
            }

            return NextResponse.json(section);
        }

        const section = await ServicePageProcessSection.findOne({ is_active: 1 }).lean();

        if (!section) {
            return NextResponse.json({});
        }

        return NextResponse.json(section);
    } catch (error) {
        console.error('Error fetching process section:', error);
        return NextResponse.json({ error: 'Failed to fetch process section' }, { status: 500 });
    }
}

// POST - Create process section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, description, is_activeCode = 1 } = body;

        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        const result = await ServicePageProcessSection.create({
            title,
            description,
            is_active: is_activeCode
        });

        revalidateTag('services');

        return NextResponse.json(
            { success: true, message: 'Process section created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating process section:', error);
        return NextResponse.json({ error: 'Failed to create process section' }, { status: 500 });
    }
}

// PUT - Update process section
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
        if (is_active !== undefined) updateData.is_active = is_active;

        await ServicePageProcessSection.findByIdAndUpdate(id, updateData);

        revalidateTag('services');

        return NextResponse.json({ success: true, message: 'Process section updated successfully' });
    } catch (error) {
        console.error('Error updating process section:', error);
        return NextResponse.json({ error: 'Failed to update process section' }, { status: 500 });
    }
}

// DELETE - Delete process section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await ServicePageProcessSection.findByIdAndDelete(id);

        revalidateTag('services');

        return NextResponse.json({ success: true, message: 'Process section deleted successfully' });
    } catch (error) {
        console.error('Error deleting process section:', error);
        return NextResponse.json({ error: 'Failed to delete process section' }, { status: 500 });
    }
}
