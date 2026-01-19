import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ServicePageDetail } from '@/models/Services';
import { revalidateTag } from 'next/cache';

// GET - Fetch service details
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const key = searchParams.get('key');
        const slug = searchParams.get('slug');

        if (id) {
            const service = await ServicePageDetail.findById(id).lean();

            if (!service) {
                return NextResponse.json({ error: 'Service not found' }, { status: 404 });
            }

            return NextResponse.json(service);
        }

        if (key) {
            const service = await ServicePageDetail.findOne({ key }).lean();

            if (!service) {
                return NextResponse.json({ error: 'Service not found' }, { status: 404 });
            }

            return NextResponse.json(service);
        }

        if (slug) {
            const service = await ServicePageDetail.findOne({ slug }).lean();

            if (!service) {
                return NextResponse.json({ error: 'Service not found' }, { status: 404 });
            }

            return NextResponse.json(service);
        }

        const services = await ServicePageDetail.find({ is_active: true }).sort({ display_order: 1 }).lean();

        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching service details:', error);
        return NextResponse.json({ error: 'Failed to fetch service details' }, { status: 500 });
    }
}

// POST - Create service detail
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { key, title, description, icon, image, image_alt, display_order = 0, is_active = true, bullets, slug } = body;

        if (!key || !title || !description) {
            return NextResponse.json({ error: 'Required fields: key, title, description' }, { status: 400 });
        }

        const detail = await ServicePageDetail.create({
            key,
            title,
            description,
            icon: icon || '',
            image: image || '',
            image_alt: image_alt || '',
            display_order,
            is_active,
            bullets: Array.isArray(bullets) ? JSON.stringify(bullets) : (bullets || '[]'),
            slug: slug || key
        });

        revalidateTag('services');
        return NextResponse.json(
            { success: true, message: 'Service detail created successfully', id: detail._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating service detail:', error);
        return NextResponse.json({ error: 'Failed to create service detail' }, { status: 500 });
    }
}

// PUT - Update service detail
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        if (updateData.bullets && Array.isArray(updateData.bullets)) {
            updateData.bullets = JSON.stringify(updateData.bullets);
        }

        const result = await ServicePageDetail.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return NextResponse.json({ error: 'Service detail not found' }, { status: 404 });
        }

        revalidateTag('services');
        return NextResponse.json({ success: true, message: 'Service detail updated successfully' });
    } catch (error) {
        console.error('Error updating service detail:', error);
        return NextResponse.json({ error: 'Failed to update service detail' }, { status: 500 });
    }
}

// DELETE - Delete service detail
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const result = await ServicePageDetail.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: 'Service detail not found' }, { status: 404 });
        }

        revalidateTag('services');
        return NextResponse.json({ success: true, message: 'Service detail deleted successfully' });
    } catch (error) {
        console.error('Error deleting service detail:', error);
        return NextResponse.json({ error: 'Failed to delete service detail' }, { status: 500 });
    }
}
