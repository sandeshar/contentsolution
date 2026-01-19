import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AboutPagePrinciple } from '@/models/AboutPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch principles
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const principle = await AboutPagePrinciple.findById(id).lean();

            if (!principle) {
                return NextResponse.json({ error: 'Principle not found' }, { status: 404 });
            }

            return NextResponse.json({ ...principle, id: principle._id });
        }

        const principles = await AboutPagePrinciple.find({ is_active: 1 })
            .sort({ display_order: 1 })
            .lean();

        return NextResponse.json(principles.map((p: any) => ({ ...p, id: p._id })));
    } catch (error) {
        console.error('Error fetching principles:', error);
        return NextResponse.json({ error: 'Failed to fetch principles' }, { status: 500 });
    }
}

// POST - Create principle
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, description, display_order, is_activeValue = 1 } = body;

        if (!title || !description || display_order === undefined) {
            return NextResponse.json({ error: 'Title, description, and display_order are required' }, { status: 400 });
        }

        const result = await AboutPagePrinciple.create({ 
            title, 
            description, 
            display_order, 
            is_active: is_activeValue ? 1 : 0 
        });

        try { revalidateTag('about-principles'); } catch (e) {}

        return NextResponse.json(
            { success: true, message: 'Principle created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating principle:', error);
        return NextResponse.json({ error: 'Failed to create principle' }, { status: 500 });
    }
}

// PUT - Update principle
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, title, description, display_order, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (display_order !== undefined) updateData.display_order = display_order;
        if (is_active !== undefined) updateData.is_active = is_active ? 1 : 0;

        await AboutPagePrinciple.findByIdAndUpdate(id, updateData);

        try { revalidateTag('about-principles'); } catch (e) {}

        return NextResponse.json({ success: true, message: 'Principle updated successfully' });
    } catch (error) {
        console.error('Error updating principle:', error);
        return NextResponse.json({ error: 'Failed to update principle' }, { status: 500 });
    }
}

// DELETE - Delete principle
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await AboutPagePrinciple.findByIdAndDelete(id);

        try { revalidateTag('about-principles'); } catch (e) {}

        return NextResponse.json({ success: true, message: 'Principle deleted successfully' });
    } catch (error) {
        console.error('Error deleting principle:', error);
        return NextResponse.json({ error: 'Failed to delete principle' }, { status: 500 });
    }
}
