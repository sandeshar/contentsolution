import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HomepageTrustLogo } from '@/models/Homepage';
import { revalidateTag } from 'next/cache';

// GET - Fetch trust logos
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const logo = await HomepageTrustLogo.findById(id).lean();

            if (!logo) {
                return NextResponse.json({ error: 'Logo not found' }, { status: 404 });
            }

            return NextResponse.json(logo);
        }

        // Get all active logos ordered by display_order
        const logos = await HomepageTrustLogo.find({ is_active: true }).sort({ display_order: 1 }).lean();

        return NextResponse.json(logos);
    } catch (error) {
        console.error('Error fetching trust logos:', error);
        return NextResponse.json({ error: 'Failed to fetch trust logos' }, { status: 500 });
    }
}

// POST - Create trust logo
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { alt_text, logo_url, dark_invert = false, display_order = 0, is_active = true } = body;

        if (!alt_text || !logo_url) {
            return NextResponse.json({ error: 'Alt text and logo URL are required' }, { status: 400 });
        }

        const logo = await HomepageTrustLogo.create({ alt_text, logo_url, dark_invert, display_order, is_active });
        revalidateTag('homepage-trust-logos');
        return NextResponse.json(
            { success: true, message: 'Trust logo created successfully', id: logo._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating trust logo:', error);
        return NextResponse.json({ error: 'Failed to create trust logo' }, { status: 500 });
    }
}

// PUT - Update trust logo
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const logo = await HomepageTrustLogo.findByIdAndUpdate(id, updateData, { new: true });

        if (!logo) {
            return NextResponse.json({ error: 'Trust logo not found' }, { status: 404 });
        }

        revalidateTag('homepage-trust-logos');
        return NextResponse.json({ success: true, message: 'Trust logo updated successfully', data: logo });
    } catch (error) {
        console.error('Error updating trust logo:', error);
        return NextResponse.json({ error: 'Failed to update trust logo' }, { status: 500 });
    }
}

// DELETE - Delete trust logo
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const logo = await HomepageTrustLogo.findByIdAndDelete(id);

        if (!logo) {
            return NextResponse.json({ error: 'Trust logo not found' }, { status: 404 });
        }

        revalidateTag('homepage-trust-logos');
        return NextResponse.json({ success: true, message: 'Trust logo deleted successfully' });
    } catch (error) {
        console.error('Error deleting trust logo:', error);
        return NextResponse.json({ error: 'Failed to delete trust logo' }, { status: 500 });
    }
}
