
import { notFound } from "next/navigation";
import { db } from "@/db";
import { servicePosts } from "@/db/servicePostsSchema";
import { servicesPageDetails } from "@/db/servicesPageSchema";
import { eq } from "drizzle-orm";

// Ensure Node runtime (needed for mysql2)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ServiceRecord = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    thumbnail?: string | null;
    icon?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
};

type ServicePostPageProps = {
    params: Promise<{ slug: string }>;
};

async function getServicePost(slug: string): Promise<ServiceRecord | null> {
    // 1) Primary: service_posts
    const post = await db
        .select()
        .from(servicePosts)
        .where(eq(servicePosts.slug, slug))
        .limit(1);

    if (post.length) {
        const p = post[0];
        return {
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            content: p.content,
            thumbnail: p.thumbnail,
            icon: p.icon,
            meta_title: p.meta_title,
            meta_description: p.meta_description,
        };
    }

    // 2) Fallback: services_page_details by slug
    const detailBySlug = await db
        .select()
        .from(servicesPageDetails)
        .where(eq(servicesPageDetails.slug, slug))
        .limit(1);

    if (detailBySlug.length) {
        return normalizeDetail(detailBySlug[0], slug);
    }

    // 3) Fallback: services_page_details by key
    const detailByKey = await db
        .select()
        .from(servicesPageDetails)
        .where(eq(servicesPageDetails.key, slug))
        .limit(1);

    if (detailByKey.length) {
        return normalizeDetail(detailByKey[0], slug);
    }

    return null;
}

function normalizeDetail(detail: any, fallbackSlug: string): ServiceRecord {
    return {
        slug: detail?.slug || detail?.key || fallbackSlug,
        title: detail?.title || "Service",
        excerpt: detail?.description || "",
        content: detail?.content || `<p>${detail?.description || ""}</p>`,
        thumbnail: detail?.image || null,
        icon: detail?.icon || null,
        meta_title: detail?.meta_title || detail?.title || null,
        meta_description: detail?.meta_description || detail?.description || null,
    };
}

export default async function ServicePostPage({ params }: ServicePostPageProps) {
    const { slug } = await params;
    const post = await getServicePost(slug);

    if (!post) notFound();

    return (
        <main className="bg-[#f9fbff]">
            {/* Attractive Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary via-indigo-500 to-primary/80 py-20 sm:py-28 shadow-lg">
                {/* Decorative blobs */}
                <div className="absolute inset-0 opacity-20" aria-hidden>
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/20 blur-2xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold mb-6 backdrop-blur">
                            <span className="material-symbols-outlined text-base">workspace_premium</span>
                            Featured Service
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            {post.icon && (
                                <span className="material-symbols-outlined text-7xl drop-shadow-lg animate-pulse">{post.icon}</span>
                            )}
                            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-[-0.04em] drop-shadow-lg">
                                {post.title}
                            </h1>
                            <p className="text-lg text-white/95 leading-relaxed max-w-3xl drop-shadow">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <article className="py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    {/* Main layout with compact side card */}
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.8fr_1fr]">
                        <div className="space-y-8">
                            {/* Image and Description in Same Card */}
                            {post.thumbnail && (
                                <div className="overflow-hidden rounded-2xl shadow-lg border border-slate-100 bg-white">
                                    <div className="relative aspect-[16/9] w-full">
                                        <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent" />
                                    </div>
                                    <div className="p-8">
                                        <h2 className="text-2xl font-bold text-[#0f172a] mb-3">About This Service</h2>
                                        <p className="text-[#4b5563] text-base leading-relaxed">{post.excerpt}</p>
                                    </div>
                                </div>
                            )}

                            {!post.thumbnail && (
                                <div className="rounded-2xl bg-white p-8 shadow-lg border border-slate-100">
                                    <h2 className="text-2xl font-bold text-[#0f172a] mb-4">About This Service</h2>
                                    <p className="text-[#4b5563] text-base leading-relaxed">{post.excerpt}</p>
                                </div>
                            )}

                            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
                                <div
                                    className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-[#0f172a] prose-p:text-[#475569] prose-a:text-primary prose-strong:text-[#0f172a]"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>
                        </div>

                        <aside className="space-y-6 lg:sticky lg:top-24">
                            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm font-semibold text-primary flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">insights</span>
                                        Key Points
                                    </p>
                                </div>
                                <div className="space-y-3 text-sm text-[#475569]">
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary">task_alt</span>
                                        <span>Outcome-focused messaging aligned to your objectives.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary">schedule</span>
                                        <span>Milestone-based delivery for transparency.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary">shield_person</span>
                                        <span>Quality review and edits loop baked in.</span>
                                    </div>
                                </div>
                                <hr className="my-4 border-slate-200" />
                                <a
                                    href="/contact"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
                                >
                                    <span className="material-symbols-outlined text-[20px]">call</span>
                                    Talk with us
                                </a>
                            </div>

                            <div className="rounded-2xl bg-gradient-to-r from-primary to-indigo-600 p-6 text-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2">Need this fast?</h3>
                                <p className="text-sm text-white/90 mb-4">We can prioritize your project and outline next steps in one call.</p>
                                <a
                                    href="/contact"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-primary px-4 py-3 text-sm font-semibold shadow-sm transition hover:shadow-md"
                                >
                                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                    Book a discovery call
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </main>
    );
}

export async function generateMetadata({ params }: ServicePostPageProps) {
    const { slug } = await params;
    const post = await getServicePost(slug);

    if (!post) {
        return { title: "Service Not Found" };
    }

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
    };
}
