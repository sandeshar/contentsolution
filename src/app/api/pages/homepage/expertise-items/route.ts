import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HomepageExpertiseItem } from '@/models/Homepage';
import { revalidateTag } from 'next/cache';

// GET - Fetch expertise items
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const item = await HomepageExpertiseItem.findById(id).lean();

            if (!item) {
                return NextResponse.json({ error: 'Expertise item not found' }, { status: 404 });
            }

            return NextResponse.json(item);
        }

        // Get all active items ordered by display_order
        const items = await HomepageExpertiseItem.find({ is_active: true }).sort({ display_order: 1 }).lean();

        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching expertise items:', error);
        return NextResponse.json({ error: 'Failed to fetch expertise items' }, { status: 500 });
    }
}

// POST - Create expertise item
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { icon, title, description, display_order, is_active = true } = body;

        if (!icon || !title || !description || display_order === undefined) {
            return NextResponse.json(
                { error: 'Icon, title, description, and display_order are required' },
                { status: 400 }
            );
        }

        const item = await HomepageExpertiseItem.create({
            icon,
            title,
            description,
            display_order,
            is_active,
        });
        revalidateTag('homepage-expertise-items');
        return NextResponse.json(
            { success: true, message: 'Expertise item created successfully', id: item._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating expertise item:', error);
        return NextResponse.json({ error: 'Failed to create expertise item' }, { status: 500 });
    }
}

// PUT - Update expertise item
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const item = await HomepageExpertiseItem.findByIdAndUpdate(id, updateData, { new: true });

        if (!item) {
            return NextResponse.json({ error: 'Expertise item not found' }, { status: 404 });
        }

        revalidateTag('homepage-expertise-items');
        return NextResponse.json({ success: true, message: 'Expertise item updated successfully', data: item });
    } catch (error) {
        console.error('Error updating expertise item:', error);
        return NextResponse.json({ error: 'Failed to update expertise item' }, { status: 500 });
    }
}

// DELETE - Delete expertise item
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const item = await HomepageExpertiseItem.findByIdAndDelete(id);

        if (!item) {
            return NextResponse.json({ error: 'Expertise item not found' }, { status: 404 });
        }

        revalidateTag('homepage-expertise-items');
        return NextResponse.json({ success: true, message: 'Expertise item deleted successfully' });
    } catch (error) {
        console.error('Error deleting expertise item:', error);
        return NextResponse.json({ error: 'Failed to delete expertise item' }, { status: 500 });
    }
}
