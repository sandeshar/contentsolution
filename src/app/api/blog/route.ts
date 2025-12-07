import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { getUserIdFromToken } from '@/utils/authHelper';

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
        const { title, slug, content, tags, thumbnail, status = 'draft' } = body;

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

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
        // Get user ID from JWT token
        const token = request.cookies.get('admin_auth')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            );
        }

        const userId = getUserIdFromToken(token);
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { slug, title, newSlug, content, tags, thumbnail, status = 'draft' } = body;

        // Validate required fields
        if (!slug) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }

        // Status mapping: draft = 1, published = 2, in-review = 3
        const statusId = status === 'published' ? 2 : status === 'in-review' ? 3 : 1;

        // Build update object dynamically
        const updateData: any = {
            updatedAt: new Date(),
        };

        if (title) updateData.title = title;
        if (newSlug) updateData.slug = newSlug;
        if (content) updateData.content = content;
        if (tags !== undefined) updateData.tags = tags || null;
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail || null;
        if (status) updateData.status = statusId;

        // Update blog post
        await db.update(blogPosts)
            .set(updateData)
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
        // Get user ID from JWT token
        const token = request.cookies.get('admin_auth')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            );
        }

        const userId = getUserIdFromToken(token);
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
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
