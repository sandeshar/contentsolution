import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ContactPageInfo } from '@/models/ContactPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch info section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const info = await ContactPageInfo.findById(id).lean();

            if (!info) {
                return NextResponse.json({ error: 'Info section not found' }, { status: 404 });
            }

            return NextResponse.json({ ...info, id: info._id });
        }

        const info = await ContactPageInfo.findOne({ is_active: 1 }).lean();

        if (!info) {
            return NextResponse.json({ error: 'No active info section found' }, { status: 404 });
        }

        return NextResponse.json({ ...info, id: info._id });
    } catch (error) {
        console.error('Error fetching info section:', error);
        return NextResponse.json({ error: 'Failed to fetch info section' }, { status: 500 });
    }
}

// POST - Create info section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { office_location, phone, email, map_url, is_activeValue = 1 } = body;

        if (!office_location || !phone || !email || !map_url) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const result = await ContactPageInfo.create({
            office_location,
            phone,
            email,
            map_url,
            is_active: is_activeValue ? 1 : 0,
        });

        try { revalidateTag('contact-info'); } catch (e) { }

        return NextResponse.json(
            { success: true, message: 'Info section created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating info section:', error);
        return NextResponse.json({ error: 'Failed to create info section' }, { status: 500 });
    }
}

// PUT - Update info section
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, office_location, phone, email, map_url, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (office_location !== undefined) updateData.office_location = office_location;
        if (phone !== undefined) updateData.phone = phone;
        if (email !== undefined) updateData.email = email;
        if (map_url !== undefined) updateData.map_url = map_url;
        if (is_active !== undefined) updateData.is_active = is_active ? 1 : 0;

        await ContactPageInfo.findByIdAndUpdate(id, updateData);

        try { revalidateTag('contact-info'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Info section updated successfully' });
    } catch (error) {
        console.error('Error updating info section:', error);
        return NextResponse.json({ error: 'Failed to update info section' }, { status: 500 });
    }
}

// DELETE - Delete info section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await ContactPageInfo.findByIdAndDelete(id);

        try { revalidateTag('contact-info'); } catch (e) { }

        return NextResponse.json({ success: true, message: 'Info section deleted successfully' });
    } catch (error) {
        console.error('Error deleting info section:', error);
        return NextResponse.json({ error: 'Failed to delete info section' }, { status: 500 });
    }
}
