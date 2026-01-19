import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ServicePost, ServiceCategory, ServiceSubcategory } from '@/models/Services';
import Status from '@/models/Status';
import { getUserIdFromToken } from '@/utils/authHelper';
import { revalidateTag } from 'next/cache';

// GET - Fetch service posts
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const slug = searchParams.get('slug');
        const featured = searchParams.get('featured');
        const category = searchParams.get('category');
        const subcategory = searchParams.get('subcategory');
        const limit = searchParams.get('limit');
        const status = searchParams.get('status');

        if (id) {
            const post = await ServicePost.findById(id).lean() as any;

            if (!post) {
                return NextResponse.json({ error: 'Service post not found' }, { status: 404 });
            }

            // Map statusId ObjectId to statusId number for UI
            const [draftStr, publishedStr, inReviewStr] = await Promise.all([
                Status.findOne({ name: /draft/i }),
                Status.findOne({ name: /published/i }),
                Status.findOne({ name: /in-review|review/i }),
            ]);

            let statusNum = 1;
            if (post.statusId) {
                const sId = post.statusId.toString();
                if (publishedStr && sId === publishedStr._id.toString()) statusNum = 2;
                else if (inReviewStr && sId === inReviewStr._id.toString()) statusNum = 3;
                else if (draftStr && sId === draftStr._id.toString()) statusNum = 1;
            }

            return NextResponse.json({
                ...post,
                id: post._id,
                statusId: statusNum
            });
        }

        if (slug) {
            const post = await ServicePost.findOne({ slug }).lean() as any;

            if (!post) {
                return NextResponse.json({ error: 'Service post not found' }, { status: 404 });
            }

            // Map statusId ObjectId to statusId number for UI
            const [draftStr, publishedStr, inReviewStr] = await Promise.all([
                Status.findOne({ name: /draft/i }),
                Status.findOne({ name: /published/i }),
                Status.findOne({ name: /in-review|review/i }),
            ]);

            let statusNum = 1;
            if (post.statusId) {
                const sId = post.statusId.toString();
                if (publishedStr && sId === publishedStr._id.toString()) statusNum = 2;
                else if (inReviewStr && sId === inReviewStr._id.toString()) statusNum = 3;
                else if (draftStr && sId === draftStr._id.toString()) statusNum = 1;
            }

            return NextResponse.json({
                ...post,
                id: post._id,
                statusId: statusNum
            });
        }

        let filter: any = {};

        if (featured === '1' || featured === 'true') {
            filter.featured = 1;
        }

        if (status) {
            filter.statusId = status; // MongoDB ID as string
        }

        // Filter by category slug or id
        if (category) {
            if (category.match(/^[0-9a-fA-F]{24}$/)) {
                filter.category_id = category;
            } else {
                const catRow = await ServiceCategory.findOne({ slug: category }).lean() as any;
                if (catRow) filter.category_id = catRow._id;
            }
        }

        // Filter by subcategory slug or id
        if (subcategory) {
            if (subcategory.match(/^[0-9a-fA-F]{24}$/)) {
                filter.subcategory_id = subcategory;
            } else {
                const subRow = await ServiceSubcategory.findOne({ slug: subcategory }).lean() as any;
                if (subRow) filter.subcategory_id = subRow._id;
            }
        }

        let query = ServicePost.find(filter).sort({ createdAt: -1 });
        if (limit && !isNaN(parseInt(limit))) {
            query = query.limit(parseInt(limit));
        }

        const posts = await query.lean();

        // Map statusId ObjectId to statusId number for UI
        const [draftStr, publishedStr, inReviewStr] = await Promise.all([
            Status.findOne({ name: /draft/i }),
            Status.findOne({ name: /published/i }),
            Status.findOne({ name: /in-review|review/i }),
        ]);

        const mappedPosts = posts.map((post: any) => {
            let statusNum = 1; // Default to draft
            if (post.statusId) {
                const sId = post.statusId.toString();
                if (publishedStr && sId === publishedStr._id.toString()) statusNum = 2;
                else if (inReviewStr && sId === inReviewStr._id.toString()) statusNum = 3;
                else if (draftStr && sId === draftStr._id.toString()) statusNum = 1;
            }
            return {
                ...post,
                id: post._id, // Add id for frontend
                statusId: statusNum
            };
        });

        return NextResponse.json(mappedPosts);
    } catch (error) {
        console.error('Error fetching service posts:', error);
        return NextResponse.json({ error: 'Failed to fetch service posts' }, { status: 500 });
    }
}

// POST - Create service post
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
        const { slug, title, excerpt, content, thumbnail, icon, featured, statusId, metaTitle, metaDescription, category_id, subcategory_id, price, price_type, price_label, price_description } = body;

        if (!slug || !title || !excerpt || !content || !statusId) {
            return NextResponse.json({ error: 'Required fields: slug, title, excerpt, content, statusId' }, { status: 400 });
        }

        // Map numeric statusId back to ObjectId
        let resolvedStatusId = statusId;
        if (typeof statusId === 'number' || !statusId.toString().match(/^[0-9a-fA-F]{24}$/)) {
            const statusMap: Record<number, string> = { 1: 'Draft', 2: 'Published', 3: 'In-Review' };
            const statusName = statusMap[Number(statusId)] || 'Draft';
            const statusDoc = await Status.findOne({ name: new RegExp(`^${statusName}$`, 'i') });
            if (statusDoc) resolvedStatusId = statusDoc._id;
        }

        const result = await ServicePost.create({
            slug,
            title,
            excerpt,
            content,
            thumbnail: thumbnail || null,
            icon: icon || null,
            featured: featured || 0,
            category_id: category_id || null,
            subcategory_id: subcategory_id || null,
            price: price || null,
            price_type: price_type || 'fixed',
            price_label: price_label || null,
            price_description: price_description || null,
            authorId,
            statusId: resolvedStatusId,
            meta_title: metaTitle || null,
            meta_description: metaDescription || null,
        });

        revalidateTag('services');

        return NextResponse.json(
            { success: true, message: 'Service post created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating service post:', error);

        // Handle duplicate slug error
        if (error.code === 11000) {
            return NextResponse.json({ error: 'A service with this slug already exists. Please use a different slug.' }, { status: 409 });
        }

        return NextResponse.json({ error: 'Failed to create service post' }, { status: 500 });
    }
}

// PUT - Update service post
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, slug, title, excerpt, content, thumbnail, icon, featured, statusId, metaTitle, metaDescription, category_id, subcategory_id, price, price_type, price_label, price_description } = body;

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
        if (category_id !== undefined) updateData.category_id = category_id;
        if (subcategory_id !== undefined) updateData.subcategory_id = subcategory_id;
        if (price !== undefined) updateData.price = price;
        if (price_type !== undefined) updateData.price_type = price_type;
        if (price_label !== undefined) updateData.price_label = price_label;
        if (price_description !== undefined) updateData.price_description = price_description;
        if (statusId !== undefined) {
            let resolvedStatusId = statusId;
            if (typeof statusId === 'number' || !statusId.toString().match(/^[0-9a-fA-F]{24}$/)) {
                const statusMap: Record<number, string> = { 1: 'Draft', 2: 'Published', 3: 'In-Review' };
                const statusName = statusMap[Number(statusId)] || 'Draft';
                const statusDoc = await Status.findOne({ name: new RegExp(`^${statusName}$`, 'i') });
                if (statusDoc) resolvedStatusId = statusDoc._id;
            }
            updateData.statusId = resolvedStatusId;
        }
        if (metaTitle !== undefined) updateData.meta_title = metaTitle;
        if (metaDescription !== undefined) updateData.meta_description = metaDescription;

        await ServicePost.findByIdAndUpdate(id, updateData);

        revalidateTag('services');
        revalidateTag(`service-${id}`);

        return NextResponse.json({ success: true, message: 'Service post updated successfully' });
    } catch (error) {
        console.error('Error updating service post:', error);
        return NextResponse.json({ error: 'Failed to update service post' }, { status: 500 });
    }
}

// DELETE - Delete service post
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        // Require authentication for delete operations
        const token = request.cookies.get('admin_auth')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized - missing token' }, { status: 401 });
        }
        const userId = getUserIdFromToken(token);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized - invalid token' }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        let id = searchParams.get('id');
        let slug = searchParams.get('slug');
        if (!id && !slug) {
            try {
                const body = await request.json();
                if (body && (body.id || body.slug)) {
                    id = body.id ? String(body.id) : undefined as any;
                    slug = body.slug ? String(body.slug) : undefined as any;
                }
            } catch (err) {
                // ignore JSON parse errors
            }
        }

        if (!id && !slug) {
            return NextResponse.json({ error: 'ID or slug is required' }, { status: 400 });
        }

        // Resolve slug to id if necessary
        let postId = id;
        if (!postId && slug) {
            const postRow = await ServicePost.findOne({ slug }).lean() as any;
            if (!postRow) {
                return NextResponse.json({ error: 'Service post not found' }, { status: 404 });
            }
            postId = postRow._id;
        }

        if (!postId) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        // Check existence
        const existing = await ServicePost.findById(postId);
        if (!existing) {
            return NextResponse.json({ error: 'Service post not found' }, { status: 404 });
        }

        // Attempts to delete dependent rows first to avoid issues
        try {
            const { ReviewTestimonialService, ReviewTestimonial } = await import('@/models/Review');
            await ReviewTestimonialService.deleteMany({ serviceId: postId });
            await ReviewTestimonial.deleteMany({ service: postId });
        } catch (err) {
            // ignore
        }

        try {
            await ServicePost.findByIdAndDelete(postId);
        } catch (err: any) {
            console.error('Deletion failed:', err);
            return NextResponse.json({ error: 'Failed to delete service post', details: err.message || String(err) }, { status: 500 });
        }

        revalidateTag('services');

        return NextResponse.json({ success: true, message: 'Service post deleted successfully' });
    } catch (error) {
        console.error('Error deleting service post:', error);
        return NextResponse.json({ error: 'Failed to delete service post' }, { status: 500 });
    }
}
