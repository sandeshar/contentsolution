import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HomepageContactSection } from '@/models/Homepage';
import { revalidateTag } from 'next/cache';

// GET - Fetch contact section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const section = await HomepageContactSection.findById(id).lean();

            if (!section) {
                return NextResponse.json({ error: 'Contact section not found' }, { status: 404 });
            }

            return NextResponse.json(section);
        }

        const section = await HomepageContactSection.findOne({ is_active: true }).lean();

        if (!section) {
            // Return empty object to allow admin UI to create new entry
            return NextResponse.json({});
        }

        return NextResponse.json(section);
    } catch (error) {
        console.error('Error fetching contact section:', error);
        return NextResponse.json({ error: 'Failed to fetch contact section' }, { status: 500 });
    }
}

// POST - Create contact section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, description, name_placeholder, email_placeholder, phone_placeholder, service_placeholder, message_placeholder, submit_button_text, is_active = true } = body;

        if (!title || !description || !name_placeholder || !email_placeholder || !service_placeholder || !message_placeholder || !submit_button_text) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const section = await HomepageContactSection.create({
            title,
            description,
            name_placeholder,
            email_placeholder,
            phone_placeholder,
            service_placeholder,
            message_placeholder,
            submit_button_text,
            is_active,
        });
        revalidateTag('homepage-contact-section');
        return NextResponse.json(
            { success: true, message: 'Contact section created successfully', id: section._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating contact section:', error);
        return NextResponse.json({ error: 'Failed to create contact section' }, { status: 500 });
    }
}

// PUT - Update contact section
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const section = await HomepageContactSection.findByIdAndUpdate(id, updateData, { new: true });

        if (!section) {
            return NextResponse.json({ error: 'Contact section not found' }, { status: 404 });
        }

        revalidateTag('homepage-contact-section');
        return NextResponse.json({ success: true, message: 'Contact section updated successfully', data: section });
    } catch (error) {
        console.error('Error updating contact section:', error);
        return NextResponse.json({ error: 'Failed to update contact section' }, { status: 500 });
    }
}

// DELETE - Delete contact section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const section = await HomepageContactSection.findByIdAndDelete(id);

        if (!section) {
            return NextResponse.json({ error: 'Contact section not found' }, { status: 404 });
        }

        revalidateTag('homepage-contact-section');
        return NextResponse.json({ success: true, message: 'Contact section deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact section:', error);
        return NextResponse.json({ error: 'Failed to delete contact section' }, { status: 500 });
    }
}
