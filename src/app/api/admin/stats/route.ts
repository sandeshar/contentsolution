import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { ContactFormSubmission } from '@/models/ContactPage';
import Status from '@/models/Status';

export async function GET() {
    try {
        await dbConnect();

        // Get status IDs for Published and Draft
        const [publishedStatus, draftStatus] = await Promise.all([
            Status.findOne({ name: /published/i }),
            Status.findOne({ name: /draft/i }),
        ]);

        const [
            totalPosts,
            publishedPosts,
            draftPosts,
            recentPosts,
            totalContact,
            newContact,
        ] = await Promise.all([
            BlogPost.countDocuments({}),
            publishedStatus ? BlogPost.countDocuments({ status: publishedStatus._id }) : Promise.resolve(0),
            draftStatus ? BlogPost.countDocuments({ status: draftStatus._id }) : Promise.resolve(0),
            BlogPost.find({})
                .populate('authorId', 'name')
                .populate('status', 'name')
                .sort({ createdAt: -1 })
                .limit(4)
                .lean(),
            ContactFormSubmission.countDocuments({}),
            ContactFormSubmission.countDocuments({ status: 'new' }),
        ]);

        const formattedRecentPosts = recentPosts.map((post: any) => ({
            id: post._id,
            slug: post.slug,
            title: post.title,
            authorName: post.authorId?.name,
            statusId: post.status?._id,
            statusName: post.status?.name,
            createdAt: post.createdAt,
        }));

        return NextResponse.json({
            success: true,
            stats: {
                totalPosts,
                publishedPosts,
                draftPosts,
                totalContact,
                newContact,
            },
            recentPosts: formattedRecentPosts,
        });
    } catch (error) {
        console.error('GET /api/admin/stats error', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch admin stats' }, { status: 500 });
    }
}