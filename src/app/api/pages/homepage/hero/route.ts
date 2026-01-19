import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HomepageHero } from '@/models/Homepage';
import { revalidateTag } from 'next/cache';

// GET - Fetch hero section
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const hero = await HomepageHero.findById(id).lean();

            if (!hero) {
                return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
            }

            return NextResponse.json(hero);
        }

        // Get active hero section
        const hero = await HomepageHero.findOne({ is_active: true }).lean();

        if (!hero) {
            // Return empty object to allow admin UI to create new entry
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
            title,
            subtitle,
            cta_text,
            cta_link,
            background_image,
            hero_image_alt = '',
            badge_text = '',
            highlight_text = '',
            colored_word = '',
            float_top_enabled = true,
            float_top_icon = 'trending_up',
            float_top_title = 'Growth',
            float_top_value = '+240% ROI',
            float_bottom_enabled = true,
            float_bottom_icon = 'check_circle',
            float_bottom_title = 'Ranking',
            float_bottom_value = '#1 Result',
            secondary_cta_text = '',
            secondary_cta_link = '',
            rating_text = '',
            is_active = true,
        } = body;

        if (!title || !subtitle || !cta_text || !cta_link || !background_image) {
            return NextResponse.json(
                { error: 'Required fields missing (title, subtitle, cta_text, cta_link, background_image)' },
                { status: 400 }
            );
        }

        const hero = await HomepageHero.create({
            title,
            subtitle,
            cta_text,
            cta_link,
            background_image,
            hero_image_alt,
            badge_text,
            highlight_text,
            colored_word,
            float_top_enabled,
            float_top_icon,
            float_top_title,
            float_top_value,
            float_bottom_enabled,
            float_bottom_icon,
            float_bottom_title,
            float_bottom_value,
            secondary_cta_text,
            secondary_cta_link,
            rating_text,
            is_active,
        });

        revalidateTag('homepage-hero');

        return NextResponse.json({ success: true, message: 'Hero section created successfully', id: hero._id }, { status: 201 });
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
            return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
        }

        const hero = await HomepageHero.findByIdAndUpdate(id, updateData, { new: true });

        if (!hero) {
            return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
        }

        revalidateTag('homepage-hero');

        return NextResponse.json({ success: true, message: 'Hero section updated successfully', data: hero });
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

        const hero = await HomepageHero.findByIdAndDelete(id);

        if (!hero) {
            return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
        }

        revalidateTag('homepage-hero');

        return NextResponse.json({ success: true, message: 'Hero section deleted successfully' });
    } catch (error) {
        console.error('Error deleting hero section:', error);
        return NextResponse.json({ error: 'Failed to delete hero section' }, { status: 500 });
    }
}
