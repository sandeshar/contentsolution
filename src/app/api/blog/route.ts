import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Status from '@/models/Status';
import { getUserIdFromToken } from '@/utils/authHelper';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
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
        const { title, slug, content, tags, thumbnail, metaTitle, metaDescription, status = 'Draft' } = body;

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // Map numeric status to name
        let resolvedStatus = status;
        if (typeof status === 'number' || !isNaN(Number(status)) && String(status).length < 3) {
            const statusMap: Record<number, string> = { 1: 'Draft', 2: 'Published', 3: 'In-Review' };
            resolvedStatus = statusMap[Number(status)] || 'Draft';
        }

        // Find status ObjectId
        const statusDoc = await Status.findOne({ name: new RegExp(`^${resolvedStatus}$`, 'i') });
        if (!statusDoc) {
            return NextResponse.json(
                { error: `Status '${resolvedStatus}' not found` },
                { status: 400 }
            );
        }

        // Insert blog post
        const result = await BlogPost.create({
            title,
            slug,
            content,
            tags: tags || null,
            thumbnail: thumbnail || null,
            metaTitle: metaTitle || null,
            metaDescription: metaDescription || null,
            authorId,
            status: statusDoc._id,
        });

        // Revalidate blog post lists and related caches
        try { revalidateTag('blog-posts'); } catch (e) { /* ignore */ }

        return NextResponse.json(
            {
                success: true,
                message: 'Blog post created successfully',
                id: result._id
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating blog post:', error);

        // Handle duplicate slug error
        if (error.code === 11000) {
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
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const slug = searchParams.get('slug');
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        const meta = searchParams.get('meta');

        console.log('GET request - id:', id, 'slug:', slug);

        if (id) {
            // Get single post by ID
            console.log('Fetching post by ID:', id);
            const post = await BlogPost.findById(id).lean();
            console.log('Query result:', post);

            if (!post) {
                return NextResponse.json(
                    { error: 'Post not found' },
                    { status: 404 }
                );
            }

            // Map status for single post
            const [draftStr, publishedStr, inReviewStr] = await Promise.all([
                Status.findOne({ name: /draft/i }),
                Status.findOne({ name: /published/i }),
                Status.findOne({ name: /in-review|review/i }),
            ]);

            let statusNum = 1;
            if (post.status) {
                const sId = post.status.toString();
                if (publishedStr && sId === publishedStr._id.toString()) statusNum = 2;
                else if (inReviewStr && sId === inReviewStr._id.toString()) statusNum = 3;
                else if (draftStr && sId === draftStr._id.toString()) statusNum = 1;
            }

            return NextResponse.json({ ...post, id: post._id, status: statusNum });
        }

        if (slug) {
            // Get single post by slug
            const post = await BlogPost.findOne({ slug }).lean();

            if (!post) {
                return NextResponse.json(
                    { error: 'Post not found' },
                    { status: 404 }
                );
            }

            // Map status for single post
            const [draftStr, publishedStr, inReviewStr] = await Promise.all([
                Status.findOne({ name: /draft/i }),
                Status.findOne({ name: /published/i }),
                Status.findOne({ name: /in-review|review/i }),
            ]);

            let statusNum = 1;
            if (post.status) {
                const sId = post.status.toString();
                if (publishedStr && sId === publishedStr._id.toString()) statusNum = 2;
                else if (inReviewStr && sId === inReviewStr._id.toString()) statusNum = 3;
                else if (draftStr && sId === draftStr._id.toString()) statusNum = 1;
            }

            return NextResponse.json({ ...post, id: post._id, status: statusNum });
        }

        // Get posts with optional search, category and pagination
        console.log('Fetching all posts via API');
        const sort = searchParams.get('sort') || 'newest';
        const showAll = searchParams.get('all') === 'true'; // Allow fetching all for admin

        let filter: any = {};

        if (!showAll) {
            // Find published status ID
            const publishedStatus = await Status.findOne({ name: /published/i });
            if (publishedStatus) {
                filter.status = publishedStatus._id;
            }
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            filter.tags = { $regex: category, $options: 'i' };
        }

        let query = BlogPost.find(filter);

        if (sort === 'oldest') {
            query = query.sort({ createdAt: 1 });
        } else {
            query = query.sort({ createdAt: -1 });
        }

        // total count
        const total = await BlogPost.countDocuments(filter);

        const posts = await query.lean();
        console.log('Found posts:', posts.length);

        // Map status ObjectId to status number for UI
        const [draftStr, publishedStr, inReviewStr] = await Promise.all([
            Status.findOne({ name: /draft/i }),
            Status.findOne({ name: /published/i }),
            Status.findOne({ name: /in-review|review/i }),
        ]);

        const mappedPosts = posts.map((post: any) => {
            let statusNum = 1; // Default to draft
            if (post.status) {
                const sId = post.status.toString();
                if (publishedStr && sId === publishedStr._id.toString()) statusNum = 2;
                else if (inReviewStr && sId === inReviewStr._id.toString()) statusNum = 3;
                else if (draftStr && sId === draftStr._id.toString()) statusNum = 1;
            }
            return {
                ...post,
                id: post._id,
                status: statusNum
            };
        });

        if (meta === 'true') {
            return NextResponse.json({ posts: mappedPosts, total });
        }
        return NextResponse.json(mappedPosts);
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
        await dbConnect();
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
        const { id, slug, title, newSlug, content, tags, thumbnail, metaTitle, metaDescription, status = 'Draft' } = body;

        // Validate required fields
        if (!id && !slug) {
            return NextResponse.json(
                { error: 'ID or Slug is required' },
                { status: 400 }
            );
        }

        // Build update object dynamically
        const updateData: any = {};

        if (title) updateData.title = title;
        if (newSlug) updateData.slug = newSlug;
        if (content) updateData.content = content;
        if (tags !== undefined) updateData.tags = tags || null;
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail || null;
        if (metaTitle !== undefined) updateData.metaTitle = metaTitle || null;
        if (metaDescription !== undefined) updateData.metaDescription = metaDescription || null;

        if (status) {
            let resolvedStatus = status;
            if (typeof status === 'number' || !isNaN(Number(status)) && String(status).length < 3) {
                const statusMap: Record<number, string> = { 1: 'Draft', 2: 'Published', 3: 'In-Review' };
                resolvedStatus = statusMap[Number(status)] || 'Draft';
            }
            const statusDoc = await Status.findOne({ name: new RegExp(`^${resolvedStatus}$`, 'i') });
            if (statusDoc) {
                updateData.status = statusDoc._id;
            }
        }

        // Update blog post
        let updatedPost;
        if (id) {
            updatedPost = await BlogPost.findByIdAndUpdate(id, updateData, { new: true });
        } else {
            updatedPost = await BlogPost.findOneAndUpdate({ slug }, updateData, { new: true });
        }

        if (!updatedPost) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        try { revalidateTag('blog-posts'); } catch (e) { /* ignore */ }
        if (newSlug) try { revalidateTag(`blog-post-${newSlug}`); } catch (e) { /* ignore */ }
        if (slug) try { revalidateTag(`blog-post-${slug}`); } catch (e) { /* ignore */ }

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
        if (error.code === 11000) {
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
        await dbConnect();
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
        await BlogPost.findByIdAndDelete(id);

        try { revalidateTag('blog-posts'); } catch (e) { /* ignore */ }

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
