import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AboutPageStat } from '@/models/AboutPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch stats
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const stat = await AboutPageStat.findById(id).lean();

            if (!stat) {
                return NextResponse.json({ error: 'Stat not found' }, { status: 404 });
            }

            return NextResponse.json({ ...stat, id: stat._id });
        }

        const stats = await AboutPageStat.find({ is_active: 1 })
            .sort({ display_order: 1 })
            .lean();

        return NextResponse.json(stats.map((s: any) => ({ ...s, id: s._id })));
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

// POST - Create stat
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { label, value, display_order, is_activeValue = 1 } = body;

        if (!label || !value || display_order === undefined) {
            return NextResponse.json({ error: 'Label, value, and display_order are required' }, { status: 400 });
        }

        const result = await AboutPageStat.create({
            label,
            value,
            display_order,
            is_active: is_activeValue ? 1 : 0
        });

        try { revalidateTag('about-stats'); } catch (e) { }

        return NextResponse.json(
            { success: true, message: 'Stat created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating stat:', error);
        return NextResponse.json({ error: 'Failed to create stat' }, { status: 500 });
    }
}

// PUT - Update stat
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, label, value, display_order, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (label !== undefined) updateData.label = label;
        if (value !== undefined) updateData.value = value;
        if (display_order !== undefined) updateData.display_order = display_order;
        if (is_active !== undefined) updateData.is_active = is_active ? 1 : 0;

        await AboutPageStat.findByIdAndUpdate(id, updateData);

        try { revalidateTag('about-stats'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Stat updated successfully' });
    } catch (error) {
        console.error('Error updating stat:', error);
        return NextResponse.json({ error: 'Failed to update stat' }, { status: 500 });
    }
}

// DELETE - Delete stat
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await AboutPageStat.findByIdAndDelete(id);

        try { revalidateTag('about-stats'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Stat deleted successfully' });
    } catch (error) {
        console.error('Error deleting stat:', error);
        return NextResponse.json({ error: 'Failed to delete stat' }, { status: 500 });
    }
}
