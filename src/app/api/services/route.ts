import { NextRequest, NextResponse } from 'next/server';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { servicePosts } from '@/db/servicePostsSchema';
import { getUserIdFromToken } from '@/utils/authHelper';

// GET - Fetch service posts
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const slug = searchParams.get('slug');
        const featured = searchParams.get('featured');
        const status = searchParams.get('status');

        if (id) {
            const post = await db.select().from(servicePosts).where(eq(servicePosts.id, parseInt(id))).limit(1);

            if (post.length === 0) {
                return NextResponse.json({ error: 'Service post not found' }, { status: 404 });
            }

            return NextResponse.json(post[0]);
        }

        if (slug) {
            const post = await db.select().from(servicePosts).where(eq(servicePosts.slug, slug)).limit(1);

            if (post.length === 0) {
                return NextResponse.json({ error: 'Service post not found' }, { status: 404 });
            }

            return NextResponse.json(post[0]);
        }

        let query = db.select().from(servicePosts);

        if (featured === '1' || featured === 'true') {
            query = query.where(eq(servicePosts.featured, 1)) as any;
        }

        if (status) {
            query = query.where(eq(servicePosts.statusId, parseInt(status))) as any;
        }

        const posts = await query.orderBy(desc(servicePosts.createdAt));

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching service posts:', error);
        return NextResponse.json({ error: 'Failed to fetch service posts' }, { status: 500 });
    }
}

// POST - Create service post
export async function POST(request: NextRequest) {
    try {
        // Get user ID from JWT token
        const token = request.cookies.get('admin_auth')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            );
        }

        const authorId = getUserIdFromToken(token);
        if (!authorId) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { slug, title, excerpt, content, thumbnail, icon, featured, statusId, metaTitle, metaDescription } = body;

        if (!slug || !title || !excerpt || !content || !statusId) {
            return NextResponse.json({ error: 'Required fields: slug, title, excerpt, content, statusId' }, { status: 400 });
        }

        const result = await db.insert(servicePosts).values({
            slug,
            title,
            excerpt,
            content,
            thumbnail: thumbnail || null,
            icon: icon || null,
            featured: featured || 0,
            authorId,
            statusId,
            meta_title: metaTitle || null,
            meta_description: metaDescription || null,
        });

        return NextResponse.json(
            { success: true, message: 'Service post created successfully', id: result[0].insertId },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating service post:', error);

        // Handle foreign key constraint error
        if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.code === 'ER_NO_REFERENCED_ROW') {
            return NextResponse.json({ error: 'Invalid user ID or status ID' }, { status: 400 });
        }

        return NextResponse.json({ error: 'Failed to create service post' }, { status: 500 });
    }
}

// PUT - Update service post
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, slug, title, excerpt, content, thumbnail, icon, featured, statusId, metaTitle, metaDescription } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (slug !== undefined) updateData.slug = slug;
        if (title !== undefined) updateData.title = title;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (content !== undefined) updateData.content = content;
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
        if (icon !== undefined) updateData.icon = icon;
        if (featured !== undefined) updateData.featured = featured;
        if (statusId !== undefined) updateData.statusId = statusId;
        if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
        if (metaDescription !== undefined) updateData.metaDescription = metaDescription;

        await db.update(servicePosts).set(updateData).where(eq(servicePosts.id, id));

        return NextResponse.json({ success: true, message: 'Service post updated successfully' });
    } catch (error) {
        console.error('Error updating service post:', error);
        return NextResponse.json({ error: 'Failed to update service post' }, { status: 500 });
    }
}

// DELETE - Delete service post
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await db.delete(servicePosts).where(eq(servicePosts.id, parseInt(id)));

        return NextResponse.json({ success: true, message: 'Service post deleted successfully' });
    } catch (error) {
        console.error('Error deleting service post:', error);
        return NextResponse.json({ error: 'Failed to delete service post' }, { status: 500 });
    }
}
