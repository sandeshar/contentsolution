import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { homepageHero } from '@/db/homepageSchema';

// GET - Fetch hero section
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const hero = await db.select().from(homepageHero).where(eq(homepageHero.id, parseInt(id))).limit(1);

            if (hero.length === 0) {
                return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
            }

            return NextResponse.json(hero[0]);
        }

        // Get active hero section
        const hero = await db.select().from(homepageHero).where(eq(homepageHero.is_active, 1)).limit(1);

        if (hero.length === 0) {
            // Return empty object to allow admin UI to create new entry
            return NextResponse.json({});
        }

        return NextResponse.json(hero[0]);
    } catch (error) {
        console.error('Error fetching hero section:', error);
        return NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 });
    }
}

// POST - Create hero section
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, subtitle, cta_text, cta_link, background_image, is_active = 1 } = body;

        if (!title || !subtitle || !cta_text || !cta_link || !background_image) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const result = await db.insert(homepageHero).values({
            title,
            subtitle,
            cta_text,
            cta_link,
            background_image,
            is_active,
        });

        return NextResponse.json(
            { success: true, message: 'Hero section created successfully', id: result[0].insertId },
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
        const body = await request.json();
        const { id, title, subtitle, cta_text, cta_link, background_image, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (subtitle !== undefined) updateData.subtitle = subtitle;
        if (cta_text !== undefined) updateData.cta_text = cta_text;
        if (cta_link !== undefined) updateData.cta_link = cta_link;
        if (background_image !== undefined) updateData.background_image = background_image;
        if (is_active !== undefined) updateData.is_active = is_active;

        await db.update(homepageHero).set(updateData).where(eq(homepageHero.id, id));

        return NextResponse.json({ success: true, message: 'Hero section updated successfully' });
    } catch (error) {
        console.error('Error updating hero section:', error);
        return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 });
    }
}

// DELETE - Delete hero section
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await db.delete(homepageHero).where(eq(homepageHero.id, parseInt(id)));

        return NextResponse.json({ success: true, message: 'Hero section deleted successfully' });
    } catch (error) {
        console.error('Error deleting hero section:', error);
        return NextResponse.json({ error: 'Failed to delete hero section' }, { status: 500 });
    }
}
