import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ServicePageHero } from '@/models/Services';
import { revalidateTag } from 'next/cache';

// GET - Fetch hero section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const hero = await ServicePageHero.findById(id).lean();

            if (!hero) {
                return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
            }

            return NextResponse.json(hero);
        }

        const hero = await ServicePageHero.findOne({ is_active: true }).lean();

        if (!hero) {
            return NextResponse.json({});
        }

        return NextResponse.json(hero);
    } catch (error) {
        console.error('Error fetching hero section:', error);
        return NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 });
    }
}

// POST - Create hero section
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const {
            tagline,
            title,
            description,
            badge_text = '',
            highlight_text = '',
            primary_cta_text = '',
            primary_cta_link = '',
            secondary_cta_text = '',
            secondary_cta_link = '',
            background_image = '',
            hero_image_alt = '',
            stat1_value = '',
            stat1_label = '',
            stat2_value = '',
            stat2_label = '',
            stat3_value = '',
            stat3_label = '',
            is_active = true
        } = body;

        const hero = await ServicePageHero.create({
            tagline,
            title,
            description,
            badge_text,
            highlight_text,
            primary_cta_text,
            primary_cta_link,
            secondary_cta_text,
            secondary_cta_link,
            background_image,
            hero_image_alt,
            stat1_value,
            stat1_label,
            stat2_value,
            stat2_label,
            stat3_value,
            stat3_label,
            is_active
        });

        revalidateTag('services');
        return NextResponse.json(
            { success: true, message: 'Hero section created successfully', id: hero._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating hero section:', error);
        return NextResponse.json({ error: 'Failed to create hero section' }, { status: 500 });
    }
}

// PUT - Update hero section
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const result = await ServicePageHero.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
        }

        revalidateTag('services');
        return NextResponse.json({ success: true, message: 'Hero section updated successfully' });
    } catch (error) {
        console.error('Error updating hero section:', error);
        return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 });
    }
}

// DELETE - Delete hero section
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const result = await ServicePageHero.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
        }

        revalidateTag('services');
        return NextResponse.json({ success: true, message: 'Hero section deleted successfully' });
    } catch (error) {
        console.error('Error deleting hero section:', error);
        return NextResponse.json({ error: 'Failed to delete hero section' }, { status: 500 });
    }
}
