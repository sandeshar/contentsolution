import { MetadataRoute } from 'next';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { frontendPages } from '@/utils/frontendPages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Dynamic frontend pages
    const staticPages: MetadataRoute.Sitemap = frontendPages.map((page) => ({
        url: `${baseUrl}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.path === '/' ? 'daily' : 'monthly' as 'daily' | 'monthly',
        priority: page.path === '/' ? 1 : 0.7,
    }));

    try {
        // Get published blog posts (status = 2)
        const posts = await db.select().from(blogPosts).where(eq(blogPosts.status, 2));

        const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        return [...staticPages, ...blogPages];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return staticPages;
    }
}
