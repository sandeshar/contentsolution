import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Status from '@/models/Status';
import { getFrontendPageCount } from '@/utils/frontendPages';

export async function GET() {
    try {
        await dbConnect();
        const publishedStatus = await Status.findOne({ name: /published/i });
        const posts = publishedStatus
            ? await BlogPost.find({ status: publishedStatus._id }).lean()
            : [];
        const pageCount = getFrontendPageCount();

        const stats = {
            totalUrls: pageCount + posts.length,
            pages: pageCount,
            blogPosts: posts.length,
        };
        return NextResponse.json({
            success: true,
            stats,
            lastGenerated: new Date().toISOString()
        });
    } catch (error) {
        console.error('GET /api/seo/sitemap/stats error', error);
        return NextResponse.json({ success: false, error: 'Failed to get stats' }, { status: 500 });
    }
}
