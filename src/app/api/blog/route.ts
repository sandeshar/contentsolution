import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { title, slug, content, tags, thumbnail, status = 'draft' } = body;

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // For now, using a default authorId (1) - in production, get from session
        const authorId = 1;

        // Status mapping: draft = 1, published = 2, in-review = 3
        const statusId = status === 'published' ? 2 : 1;

        // Insert blog post
        const result = await db.insert(blogPosts).values({
            title,
            slug,
            content,
            tags: tags || null,
            thumbnail: thumbnail || null,
            authorId,
            status: statusId,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Blog post created successfully',
                id: result[0].insertId
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating blog post:', error);

        // Handle duplicate slug error
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json(
                { error: 'A post with this slug already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create blog post' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const slug = searchParams.get('slug');

        console.log('GET request - id:', id, 'slug:', slug);

        if (id) {
            // Get single post by ID
            console.log('Fetching post by ID:', id);
            const post = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(id))).limit(1);
            console.log('Query result:', post);

            if (post.length === 0) {
                return NextResponse.json(
                    { error: 'Post not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(post[0]);
        }

        if (slug) {
            // Get single post by slug
            const post = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);

            if (post.length === 0) {
                return NextResponse.json(
                    { error: 'Post not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(post[0]);
        }

        // Get all posts
        console.log('Fetching all posts');
        const posts = await db.select().from(blogPosts);
        console.log('Found posts:', posts.length);
        return NextResponse.json(posts);
    } catch (error: any) {
        console.error('Error fetching blog posts:', error);
        console.error('Error details:', error.message, error.stack);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts', details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {

        const body = await request.json();
        const { slug, title, newSlug, content, tags, thumbnail, status = 'draft' } = body;

        // Validate required fields
        if (!slug || !title || !newSlug || !content) {
            return NextResponse.json(
                { error: 'Slug, title, newSlug, and content are required' },
                { status: 400 }
            );
        }

        // Status mapping: draft = 1, published = 2, in-review = 3
        const statusId = status === 'published' ? 2 : 1;

        // Update blog post
        await db.update(blogPosts)
            .set({
                title,
                slug: newSlug,
                content,
                tags: tags || null,
                thumbnail: thumbnail || null,
                status: statusId,
                updatedAt: new Date(),
            })
            .where(eq(blogPosts.slug, slug));

        return NextResponse.json(
            {
                success: true,
                message: 'Blog post updated successfully'
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating blog post:', error);

        // Handle duplicate slug error
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json(
                { error: 'A post with this slug already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Invalid' },
                { status: 400 }
            );
        }

        // Delete blog post
        await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));

        return NextResponse.json(
            {
                success: true,
                message: 'Blog post deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}
