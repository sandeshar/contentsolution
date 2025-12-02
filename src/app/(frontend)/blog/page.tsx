import BlogHero from "@/components/BlogPage/BlogHero";
import BlogSearch from "@/components/BlogPage/BlogSearch";
import BlogGrid from "@/components/BlogPage/BlogGrid";
import BlogPagination from "@/components/BlogPage/BlogPagination";
import BlogCTA from "@/components/BlogPage/BlogCTA";
import { db } from "@/db";
import { blogPosts, storeSettings } from "@/db/schema";
import { desc, eq, sql, like, and, or } from "drizzle-orm";
import type { Metadata } from "next";

const POSTS_PER_PAGE = 6;

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}) {
    const params = await searchParams;
    const currentPage = Math.max(1, parseInt(params.page || '1'));
    const searchQuery = params.search?.trim() || '';
    const categoryFilter = params.category?.trim() || '';
    const offset = (currentPage - 1) * POSTS_PER_PAGE;

    // Build where conditions
    const conditions = [eq(blogPosts.status, 2)];

    // Add search filter (search in title, content, and tags)
    if (searchQuery) {
        conditions.push(
            or(
                like(blogPosts.title, `%${searchQuery}%`),
                like(blogPosts.content, `%${searchQuery}%`),
                like(blogPosts.tags, `%${searchQuery}%`)
            )!
        );
    }

    // Add category filter (search in tags)
    if (categoryFilter && categoryFilter !== 'All') {
        conditions.push(like(blogPosts.tags, `%${categoryFilter}%`));
    }

    const whereClause = and(...conditions);

    // Fetch published blog posts with pagination and filters
    const posts = await db
        .select()
        .from(blogPosts)
        .where(whereClause)
        .orderBy(desc(blogPosts.createdAt))
        .limit(POSTS_PER_PAGE)
        .offset(offset);

    // Get total count for pagination
    const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(blogPosts)
        .where(whereClause);

    const totalPosts = Number(countResult[0]?.count || 0);
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    // Get all unique categories from tags
    const allPosts = await db
        .select({ tags: blogPosts.tags })
        .from(blogPosts)
        .where(eq(blogPosts.status, 2));

    const categoriesSet = new Set<string>();
    allPosts.forEach(post => {
        if (post.tags) {
            post.tags.split(',').forEach(tag => {
                const trimmed = tag.trim();
                if (trimmed) categoriesSet.add(trimmed);
            });
        }
    });
    const categories = ['All', ...Array.from(categoriesSet).sort()];

    return (
        <main className="grow px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center page-bg">
            <div className="w-full max-w-7xl">
                <BlogHero />
                <BlogSearch
                    categories={categories}
                    currentCategory={categoryFilter || 'All'}
                    currentSearch={searchQuery}
                />
                <BlogGrid posts={posts} />
                {totalPosts === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-slate-600">
                            {searchQuery || categoryFilter
                                ? 'No posts found matching your filters. Try adjusting your search.'
                                : 'No blog posts available yet.'}
                        </p>
                    </div>
                )}
                <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    searchQuery={searchQuery}
                    category={categoryFilter}
                />
                <BlogCTA />
            </div>
        </main>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const [store] = await db.select().from(storeSettings).limit(1);
    const siteName = store?.store_name || "Content Store";
    const title = `Blog | ${siteName}`;
    const description = store?.meta_description || store?.store_description || "Read the latest articles.";
    return {
        title,
        description,
        creator: siteName,
        publisher: siteName,
        openGraph: {
            type: "website",
            siteName,
            title,
            description,
        },
    };
}
