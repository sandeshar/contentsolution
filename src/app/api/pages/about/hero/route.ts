import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { aboutPageHero } from '@/db/aboutPageSchema';

// GET - Fetch hero section
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const hero = await db.select().from(aboutPageHero).where(eq(aboutPageHero.id, parseInt(id))).limit(1);

            if (hero.length === 0) {
                return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
            }

            return NextResponse.json(hero[0]);
        }

        const hero = await db.select().from(aboutPageHero).where(eq(aboutPageHero.is_active, 1)).limit(1);

        if (hero.length === 0) {
            return NextResponse.json({ error: 'No active hero section found' }, { status: 404 });
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
        const { title, description, button1_text, button1_link, button2_text, button2_link, hero_image, hero_image_alt, is_active = 1 } = body;

        if (!title || !description || !button1_text || !button1_link || !button2_text || !button2_link || !hero_image || !hero_image_alt) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const result = await db.insert(aboutPageHero).values({
            title,
            description,
            button1_text,
            button1_link,
            button2_text,
            button2_link,
            hero_image,
            hero_image_alt,
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
        const { id, title, description, button1_text, button1_link, button2_text, button2_link, hero_image, hero_image_alt, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (button1_text !== undefined) updateData.button1_text = button1_text;
        if (button1_link !== undefined) updateData.button1_link = button1_link;
        if (button2_text !== undefined) updateData.button2_text = button2_text;
        if (button2_link !== undefined) updateData.button2_link = button2_link;
        if (hero_image !== undefined) updateData.hero_image = hero_image;
        if (hero_image_alt !== undefined) updateData.hero_image_alt = hero_image_alt;
        if (is_active !== undefined) updateData.is_active = is_active;

        await db.update(aboutPageHero).set(updateData).where(eq(aboutPageHero.id, id));

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

        await db.delete(aboutPageHero).where(eq(aboutPageHero.id, parseInt(id)));

        return NextResponse.json({ success: true, message: 'Hero section deleted successfully' });
    } catch (error) {
        console.error('Error deleting hero section:', error);
        return NextResponse.json({ error: 'Failed to delete hero section' }, { status: 500 });
    }
}
