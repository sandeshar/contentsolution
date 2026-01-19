import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Status from '@/models/Status';
import { getFrontendPageCount } from '@/utils/frontendPages';

export async function POST() {
    try {
        await dbConnect();
        
        // Find published status ID
        const publishedStatus = await Status.findOne({ name: /published/i });
        
        // Get published blog posts
        const posts = publishedStatus 
            ? await BlogPost.find({ status: publishedStatus._id }).lean()
            : [];
        
        const pageCount = getFrontendPageCount();

        const stats = {
            totalUrls: pageCount + posts.length,
            pages: pageCount,
            blogPosts: posts.length,
        };

        // Note: Sitemap is automatically served by Next.js from src/app/sitemap.ts
        // This endpoint just returns stats for the admin dashboard
        return NextResponse.json({
            success: true,
            message: 'Sitemap stats retrieved. Sitemap is automatically generated at /sitemap.xml',
            stats
        });
    } catch (error) {
        console.error('POST /api/seo/sitemap/generate error', error);
        return NextResponse.json({ success: false, error: 'Failed to get sitemap stats' }, { status: 500 });
    }
}
